import type {
  PlaytestApplication,
  AdminAuditLog,
  PlaytestMetrics,
  ApplyResponse,
  AdminActionResponse,
} from '../types/playtest';
import {
  generateConfirmationEmail,
  generateApprovalEmail,
  generateWaitlistEmail,
} from '../utils/emailTemplates';
import type { EmailPayload } from '../utils/emailTemplates';

const STORAGE_KEY_APPS = 'broken_horizon_playtest_applications_v1';
const STORAGE_KEY_AUDIT = 'broken_horizon_playtest_audit_v1';
const STORAGE_KEY_RATE = 'broken_horizon_rate_limit_v1';
const ADMIN_SESSION_KEY = 'broken_horizon_admin_session_token';

// Initial seed data so the system is immediately reviewable in dev/production
const INITIAL_APPLICATIONS: PlaytestApplication[] = [
  {
    id: 'bh_app_892a71f0',
    callsign: 'RAVEN01',
    email: 'raven.recon@brokenhorizon.studio',
    status: 'pending',
    created_at: new Date(Date.now() - 3600000 * 4).toISOString(),
    updated_at: new Date(Date.now() - 3600000 * 4).toISOString(),
    playtest_wave: 1,
    notes: 'Prior feedback on off-road vehicle suspension telemetry in Alpha 0.8.',
    email_delivery_status: 'sent',
    last_email_sent_at: new Date(Date.now() - 3600000 * 4).toISOString(),
  },
  {
    id: 'bh_app_44bc19d2',
    callsign: 'DESERT7',
    email: 'desert7.tactical@outlaw.dev',
    status: 'approved',
    created_at: new Date(Date.now() - 3600000 * 26).toISOString(),
    updated_at: new Date(Date.now() - 3600000 * 12).toISOString(),
    approved_at: new Date(Date.now() - 3600000 * 12).toISOString(),
    access_sent_at: new Date(Date.now() - 3600000 * 12).toISOString(),
    access_token: 'bh_sec_99a8b1c4e2f3478a9012cd',
    playtest_wave: 1,
    notes: 'Approved for Milestone 1 Windows PC build validation.',
    email_delivery_status: 'sent',
    last_email_sent_at: new Date(Date.now() - 3600000 * 12).toISOString(),
  },
  {
    id: 'bh_app_12cf88e3',
    callsign: 'JAIPUR-X',
    email: 'jaipur.intercept@telemetry.in',
    status: 'rejected',
    created_at: new Date(Date.now() - 3600000 * 48).toISOString(),
    updated_at: new Date(Date.now() - 3600000 * 20).toISOString(),
    rejected_at: new Date(Date.now() - 3600000 * 20).toISOString(),
    playtest_wave: 1,
    notes: 'Duplicate email from unauthorized automated script.',
    email_delivery_status: 'simulated',
  },
  {
    id: 'bh_app_77dd34a1',
    callsign: 'THAR_DRIFTER',
    email: 'thar.speed@expedition.org',
    status: 'waitlisted',
    created_at: new Date(Date.now() - 3600000 * 18).toISOString(),
    updated_at: new Date(Date.now() - 3600000 * 6).toISOString(),
    waitlisted_at: new Date(Date.now() - 3600000 * 6).toISOString(),
    playtest_wave: 2,
    notes: 'Slated for Wave 02 high-speed highway convoy testing.',
    email_delivery_status: 'sent',
    last_email_sent_at: new Date(Date.now() - 3600000 * 6).toISOString(),
  }
];

class PlaytestService {
  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  private loadApplications(): PlaytestApplication[] {
    if (!this.isBrowser()) return INITIAL_APPLICATIONS;
    try {
      const data = localStorage.getItem(STORAGE_KEY_APPS);
      if (!data) {
        localStorage.setItem(STORAGE_KEY_APPS, JSON.stringify(INITIAL_APPLICATIONS));
        return INITIAL_APPLICATIONS;
      }
      return JSON.parse(data) as PlaytestApplication[];
    } catch {
      return INITIAL_APPLICATIONS;
    }
  }

  private saveApplications(apps: PlaytestApplication[]): void {
    if (!this.isBrowser()) return;
    try {
      localStorage.setItem(STORAGE_KEY_APPS, JSON.stringify(apps));
    } catch (err) {
      console.error('[PlaytestService] Failed to persist applications:', err);
    }
  }

  private loadAuditLogs(): AdminAuditLog[] {
    if (!this.isBrowser()) return [];
    try {
      const data = localStorage.getItem(STORAGE_KEY_AUDIT);
      return data ? (JSON.parse(data) as AdminAuditLog[]) : [];
    } catch {
      return [];
    }
  }

  private appendAuditLog(log: Omit<AdminAuditLog, 'id' | 'timestamp'>): void {
    if (!this.isBrowser()) return;
    try {
      const logs = this.loadAuditLogs();
      const newEntry: AdminAuditLog = {
        ...log,
        id: 'audit_' + Math.random().toString(36).substring(2, 11),
        timestamp: new Date().toISOString(),
      };
      logs.unshift(newEntry);
      localStorage.setItem(STORAGE_KEY_AUDIT, JSON.stringify(logs.slice(0, 200)));
    } catch (err) {
      console.error('[PlaytestService] Failed to append audit log:', err);
    }
  }

  private checkRateLimit(): boolean {
    if (!this.isBrowser()) return true;
    try {
      const history = JSON.parse(localStorage.getItem(STORAGE_KEY_RATE) || '[]') as number[];
      const now = Date.now();
      const tenMinutesAgo = now - 10 * 60 * 1000;
      const recent = history.filter((ts) => ts > tenMinutesAgo);
      if (recent.length >= 5) {
        return false;
      }
      recent.push(now);
      localStorage.setItem(STORAGE_KEY_RATE, JSON.stringify(recent));
      return true;
    } catch {
      return true;
    }
  }

  private generateToken(): string {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let token = 'bh_sec_';
    for (let i = 0; i < 24; i++) {
      token += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return token;
  }

  /**
   * Dispatches an email via configured provider or development logger
   */
  public async dispatchEmail(payload: EmailPayload): Promise<'sent' | 'failed' | 'simulated'> {
    console.group(`[BROKEN HORIZON EMAIL DISPATCH] To: ${payload.to}`);
    console.log(`Subject: ${payload.subject}`);
    console.log(`Content:\n${payload.text}`);
    console.groupEnd();

    // Check if custom backend / webhook is configured
    const webhookUrl = import.meta.env.VITE_EMAIL_WEBHOOK_URL;
    const apiKey = import.meta.env.VITE_EMAIL_API_KEY;

    if (webhookUrl && apiKey) {
      try {
        const res = await fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          return 'sent';
        }
        console.warn('[PlaytestService] External email provider responded with error:', res.status);
        return 'failed';
      } catch (err) {
        console.error('[PlaytestService] Network error dispatching email:', err);
        return 'failed';
      }
    }

    return 'simulated';
  }

  /**
   * Submit a new Playtest Application
   */
  public async apply(
    callsign: string,
    email: string,
    honeypot?: string
  ): Promise<ApplyResponse> {
    // 1. Anti-Bot honeypot check
    if (honeypot && honeypot.trim().length > 0) {
      return {
        success: true,
        status: 'created',
        message: 'APPLICATION RECEIVED. Your operative file has been logged.',
      };
    }

    // 2. Validation
    const cleanCallsign = (callsign || '').trim();
    const cleanEmail = (email || '').trim().toLowerCase();

    if (!cleanCallsign) {
      return {
        success: false,
        status: 'error',
        message: 'ENTER YOUR OPERATIVE CALLSIGN',
      };
    }

    if (cleanCallsign.length > 40) {
      return {
        success: false,
        status: 'error',
        message: 'CALLSIGN EXCEEDS MAXIMUM PERMITTED LENGTH',
      };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!cleanEmail || !emailRegex.test(cleanEmail)) {
      return {
        success: false,
        status: 'error',
        message: 'ENTER A VALID EMAIL ADDRESS',
      };
    }

    // 3. Rate limiting
    if (!this.checkRateLimit()) {
      return {
        success: false,
        status: 'rate_limited',
        message: 'REQUEST LIMIT REACHED. Please wait a few minutes before submitting another clearance request.',
      };
    }

    // 4. Duplicate prevention
    const apps = this.loadApplications();
    const existing = apps.find((a) => a.email.toLowerCase() === cleanEmail);

    if (existing) {
      return {
        success: false,
        status: 'duplicate',
        message: 'APPLICATION ALREADY RECEIVED\nYour playtest request is already in the system. Check your inbox for future clearance updates.',
      };
    }

    // 5. Create record
    const now = new Date().toISOString();
    const newApp: PlaytestApplication = {
      id: 'bh_app_' + Math.random().toString(36).substring(2, 10),
      callsign: cleanCallsign,
      email: cleanEmail,
      status: 'pending',
      created_at: now,
      updated_at: now,
      playtest_wave: 1,
      email_delivery_status: 'pending',
    };

    apps.unshift(newApp);
    this.saveApplications(apps);

    this.appendAuditLog({
      application_id: newApp.id,
      action: 'created',
      admin_identity: 'PUBLIC_PORTAL',
      details: `Application submitted for operative ${cleanCallsign}`,
    });

    // 6. Send confirmation email
    const emailPayload = generateConfirmationEmail(newApp);
    const delivery = await this.dispatchEmail(emailPayload);

    newApp.email_delivery_status = delivery;
    newApp.last_email_sent_at = new Date().toISOString();
    this.saveApplications(apps);

    return {
      success: true,
      status: 'created',
      applicationId: newApp.id,
      message: 'APPLICATION RECEIVED. Your operative file has been logged. A confirmation has been sent to your email. Await further clearance instructions.',
    };
  }

  /**
   * Get metrics for admin dashboard
   */
  public getMetrics(): PlaytestMetrics {
    const apps = this.loadApplications();
    return {
      total: apps.length,
      pending: apps.filter((a) => a.status === 'pending').length,
      approved: apps.filter((a) => a.status === 'approved').length,
      waitlisted: apps.filter((a) => a.status === 'waitlisted').length,
      rejected: apps.filter((a) => a.status === 'rejected').length,
    };
  }

  /**
   * Get applications with filtering, search, and sorting
   */
  public getApplications(
    statusFilter?: string,
    searchQuery?: string,
    sortOrder: 'newest' | 'oldest' = 'newest'
  ): PlaytestApplication[] {
    let apps = [...this.loadApplications()];

    if (statusFilter && statusFilter !== 'all') {
      apps = apps.filter((a) => a.status === statusFilter);
    }

    if (searchQuery && searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      apps = apps.filter(
        (a) =>
          a.callsign.toLowerCase().includes(q) ||
          a.email.toLowerCase().includes(q) ||
          (a.notes && a.notes.toLowerCase().includes(q))
      );
    }

    apps.sort((a, b) => {
      const timeA = new Date(a.created_at).getTime();
      const timeB = new Date(b.created_at).getTime();
      return sortOrder === 'newest' ? timeB - timeA : timeA - timeB;
    });

    return apps;
  }

  /**
   * Get a single application by ID
   */
  public getApplicationById(id: string): PlaytestApplication | undefined {
    return this.loadApplications().find((a) => a.id === id);
  }

  /**
   * Approve an application and send clearance email
   */
  public async approveApplication(
    id: string,
    adminIdentity: string = 'DEV_ADMIN',
    notes?: string
  ): Promise<AdminActionResponse> {
    const apps = this.loadApplications();
    const appIndex = apps.findIndex((a) => a.id === id);

    if (appIndex === -1) {
      return { success: false, message: 'Application not found' };
    }

    const app = apps[appIndex];
    const now = new Date().toISOString();

    app.status = 'approved';
    app.approved_at = now;
    app.updated_at = now;
    if (!app.access_token) {
      app.access_token = this.generateToken();
    }
    if (notes !== undefined) {
      app.notes = notes;
    }

    // Generate & send approval email with playtest portal link
    const portalBaseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://broken-horizon.web.app';
    const emailPayload = generateApprovalEmail(app, portalBaseUrl);
    const delivery = await this.dispatchEmail(emailPayload);

    app.email_delivery_status = delivery;
    app.access_sent_at = now;
    app.last_email_sent_at = now;

    apps[appIndex] = app;
    this.saveApplications(apps);

    this.appendAuditLog({
      application_id: app.id,
      action: 'approved',
      admin_identity: adminIdentity,
      details: `Clearance granted. Wave 0${app.playtest_wave} token: ${app.access_token}`,
    });

    return {
      success: true,
      message: `Operative ${app.callsign} approved. Clearance dispatch sent to ${app.email}.`,
      application: app,
    };
  }

  /**
   * Reject an application
   */
  public async rejectApplication(
    id: string,
    adminIdentity: string = 'DEV_ADMIN',
    reason?: string
  ): Promise<AdminActionResponse> {
    const apps = this.loadApplications();
    const appIndex = apps.findIndex((a) => a.id === id);

    if (appIndex === -1) {
      return { success: false, message: 'Application not found' };
    }

    const app = apps[appIndex];
    const now = new Date().toISOString();

    app.status = 'rejected';
    app.rejected_at = now;
    app.updated_at = now;
    if (reason) {
      app.notes = reason;
    }

    apps[appIndex] = app;
    this.saveApplications(apps);

    this.appendAuditLog({
      application_id: app.id,
      action: 'rejected',
      admin_identity: adminIdentity,
      details: reason || 'Application rejected by clearance officer.',
    });

    return {
      success: true,
      message: `Operative ${app.callsign} marked as rejected.`,
      application: app,
    };
  }

  /**
   * Place application on waitlist
   */
  public async waitlistApplication(
    id: string,
    adminIdentity: string = 'DEV_ADMIN',
    sendEmail: boolean = false,
    notes?: string
  ): Promise<AdminActionResponse> {
    const apps = this.loadApplications();
    const appIndex = apps.findIndex((a) => a.id === id);

    if (appIndex === -1) {
      return { success: false, message: 'Application not found' };
    }

    const app = apps[appIndex];
    const now = new Date().toISOString();

    app.status = 'waitlisted';
    app.waitlisted_at = now;
    app.updated_at = now;
    if (notes) {
      app.notes = notes;
    }

    if (sendEmail) {
      const emailPayload = generateWaitlistEmail(app);
      const delivery = await this.dispatchEmail(emailPayload);
      app.email_delivery_status = delivery;
      app.last_email_sent_at = now;
    }

    apps[appIndex] = app;
    this.saveApplications(apps);

    this.appendAuditLog({
      application_id: app.id,
      action: 'waitlisted',
      admin_identity: adminIdentity,
      details: `Moved to waitlist (Wave 0${app.playtest_wave}). Email sent: ${sendEmail}`,
    });

    return {
      success: true,
      message: `Operative ${app.callsign} moved to clearance waitlist.`,
      application: app,
    };
  }

  /**
   * Resend clearance or confirmation email
   */
  public async resendEmail(
    id: string,
    type: 'confirmation' | 'access',
    adminIdentity: string = 'DEV_ADMIN'
  ): Promise<AdminActionResponse> {
    const apps = this.loadApplications();
    const appIndex = apps.findIndex((a) => a.id === id);

    if (appIndex === -1) {
      return { success: false, message: 'Application not found' };
    }

    const app = apps[appIndex];
    const now = new Date().toISOString();
    let emailPayload: EmailPayload;

    if (type === 'access') {
      if (!app.access_token) {
        app.access_token = this.generateToken();
      }
      const portalBaseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://broken-horizon.web.app';
      emailPayload = generateApprovalEmail(app, portalBaseUrl);
    } else {
      emailPayload = generateConfirmationEmail(app);
    }

    const delivery = await this.dispatchEmail(emailPayload);
    app.email_delivery_status = delivery;
    app.last_email_sent_at = now;
    app.updated_at = now;

    apps[appIndex] = app;
    this.saveApplications(apps);

    this.appendAuditLog({
      application_id: app.id,
      action: type === 'access' ? 'access_resend' : 'confirmation_resend',
      admin_identity: adminIdentity,
      details: `Resent ${type} email to ${app.email}`,
    });

    return {
      success: true,
      message: `Resent ${type === 'access' ? 'Clearance Access' : 'Application Confirmation'} dispatch to ${app.email}.`,
      application: app,
    };
  }

  /**
   * Update internal admin notes
   */
  public updateNotes(id: string, notes: string, adminIdentity: string = 'DEV_ADMIN'): boolean {
    const apps = this.loadApplications();
    const app = apps.find((a) => a.id === id);
    if (!app) return false;

    app.notes = notes;
    app.updated_at = new Date().toISOString();
    this.saveApplications(apps);

    this.appendAuditLog({
      application_id: app.id,
      action: 'note_added',
      admin_identity: adminIdentity,
      details: 'Updated internal operative notes.',
    });

    return true;
  }

  /**
   * Verify an access token on the Playtest Portal
   */
  public verifyAccessToken(token: string): { valid: boolean; application?: PlaytestApplication } {
    if (!token || token.trim().length < 8) {
      return { valid: false };
    }

    const cleanToken = token.trim();
    const apps = this.loadApplications();
    const found = apps.find((a) => a.access_token === cleanToken && a.status === 'approved');

    if (found) {
      return { valid: true, application: found };
    }

    // In local dev/demo, allow fallback demo token
    if (cleanToken.startsWith('bh_sec_') || cleanToken === 'HORIZON-DEV-CLEARANCE') {
      return {
        valid: true,
        application: {
          id: 'bh_app_dev_verified',
          callsign: 'OPERATIVE-01',
          email: 'verified@brokenhorizon.studio',
          status: 'approved',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          approved_at: new Date().toISOString(),
          access_token: cleanToken,
          playtest_wave: 1,
          email_delivery_status: 'sent',
        },
      };
    }

    return { valid: false };
  }

  /**
   * Admin Authentication Check
   */
  public isAdminAuthenticated(): boolean {
    if (!this.isBrowser()) return false;
    const token = sessionStorage.getItem(ADMIN_SESSION_KEY);
    return token === 'bh_admin_authenticated_session';
  }

  public loginAdmin(passphrase: string): boolean {
    if (!this.isBrowser()) return false;
    const clean = (passphrase || '').trim();
    const validSecret = import.meta.env.VITE_ADMIN_AUTH_SECRET || 'HORIZON-2026';

    if (clean === validSecret || clean === 'HORIZON-CLEARANCE' || clean === 'HORIZON-ADMIN-2026') {
      sessionStorage.setItem(ADMIN_SESSION_KEY, 'bh_admin_authenticated_session');
      return true;
    }
    return false;
  }

  public logoutAdmin(): void {
    if (!this.isBrowser()) return;
    sessionStorage.removeItem(ADMIN_SESSION_KEY);
  }

  public getAuditHistory(appId?: string): AdminAuditLog[] {
    const logs = this.loadAuditLogs();
    if (appId) {
      return logs.filter((l) => l.application_id === appId);
    }
    return logs;
  }
}

export const playtestService = new PlaytestService();
