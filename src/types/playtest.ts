export type PlaytestStatus = 'pending' | 'approved' | 'rejected' | 'waitlisted';

export type EmailDeliveryStatus = 'sent' | 'failed' | 'simulated' | 'pending';

export interface PlaytestApplication {
  id: string;
  callsign: string;
  email: string;
  status: PlaytestStatus;
  created_at: string;
  updated_at: string;
  approved_at?: string | null;
  rejected_at?: string | null;
  waitlisted_at?: string | null;
  access_sent_at?: string | null;
  access_token?: string;
  playtest_wave: number;
  notes?: string;
  email_delivery_status: EmailDeliveryStatus;
  last_email_sent_at?: string;
}

export interface AdminAuditLog {
  id: string;
  application_id: string;
  action: 'approved' | 'rejected' | 'waitlisted' | 'access_resend' | 'confirmation_resend' | 'note_added' | 'created';
  timestamp: string;
  admin_identity: string;
  details?: string;
}

export interface PlaytestMetrics {
  total: number;
  pending: number;
  approved: number;
  waitlisted: number;
  rejected: number;
}

export interface ApplyResponse {
  success: boolean;
  status: 'created' | 'duplicate' | 'rate_limited' | 'error';
  message: string;
  applicationId?: string;
}

export interface AdminActionResponse {
  success: boolean;
  message: string;
  application?: PlaytestApplication;
}
