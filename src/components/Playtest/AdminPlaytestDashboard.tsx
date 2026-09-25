import React, { useState, useEffect } from 'react';
import type {
  PlaytestApplication,
  PlaytestMetrics,
} from '../../types/playtest';
import { playtestService } from '../../services/playtestService';
import {
  Search,
  CheckCircle,
  XCircle,
  Clock,
  Send,
  Lock,
  ArrowLeft,
  X,
  FileText,
  AlertTriangle,
  RefreshCw,
  LogOut,
  ExternalLink,
} from 'lucide-react';
import '../../styles/playtestAdmin.css';

interface AdminPlaytestDashboardProps {
  onBackToHome: () => void;
}

export const AdminPlaytestDashboard: React.FC<AdminPlaytestDashboardProps> = ({ onBackToHome }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() =>
    playtestService.isAdminAuthenticated()
  );
  const [passphrase, setPassphrase] = useState('');
  const [authError, setAuthError] = useState('');

  // Dashboard Data State
  const [metrics, setMetrics] = useState<PlaytestMetrics>({
    total: 0,
    pending: 0,
    approved: 0,
    waitlisted: 0,
    rejected: 0,
  });
  const [applications, setApplications] = useState<PlaytestApplication[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');

  // Modal / Selection State
  const [selectedApp, setSelectedApp] = useState<PlaytestApplication | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);
  const [notesInput, setNotesInput] = useState('');
  const [confirmAction, setConfirmAction] = useState<'approve' | 'reject' | null>(null);

  const refreshData = () => {
    setMetrics(playtestService.getMetrics());
    setApplications(playtestService.getApplications(statusFilter, searchQuery, sortOrder));
  };

  useEffect(() => {
    if (isAuthenticated) {
      refreshData();
    }
  }, [isAuthenticated, statusFilter, searchQuery, sortOrder]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    const success = playtestService.loginAdmin(passphrase);
    if (success) {
      setIsAuthenticated(true);
      setPassphrase('');
    } else {
      setAuthError('CLEARANCE ACCESS DENIED: Invalid authentication key.');
    }
  };

  const handleLogout = () => {
    playtestService.logoutAdmin();
    setIsAuthenticated(false);
  };

  const handleOpenDetail = (app: PlaytestApplication) => {
    setSelectedApp(app);
    setNotesInput(app.notes || '');
    setActionFeedback(null);
    setConfirmAction(null);
  };

  const handleApprove = async () => {
    if (!selectedApp) return;
    setIsProcessing(true);
    setActionFeedback(null);

    const res = await playtestService.approveApplication(
      selectedApp.id,
      'OFFICER_STATION',
      notesInput
    );
    setIsProcessing(false);
    setConfirmAction(null);

    if (res.success && res.application) {
      setSelectedApp(res.application);
      setActionFeedback(res.message);
      refreshData();
    }
  };

  const handleReject = async () => {
    if (!selectedApp) return;
    setIsProcessing(true);
    setActionFeedback(null);

    const res = await playtestService.rejectApplication(
      selectedApp.id,
      'OFFICER_STATION',
      notesInput
    );
    setIsProcessing(false);
    setConfirmAction(null);

    if (res.success && res.application) {
      setSelectedApp(res.application);
      setActionFeedback(res.message);
      refreshData();
    }
  };

  const handleWaitlist = async (sendEmail: boolean = false) => {
    if (!selectedApp) return;
    setIsProcessing(true);
    setActionFeedback(null);

    const res = await playtestService.waitlistApplication(
      selectedApp.id,
      'OFFICER_STATION',
      sendEmail,
      notesInput
    );
    setIsProcessing(false);

    if (res.success && res.application) {
      setSelectedApp(res.application);
      setActionFeedback(res.message);
      refreshData();
    }
  };

  const handleResend = async (type: 'confirmation' | 'access') => {
    if (!selectedApp) return;
    setIsProcessing(true);
    setActionFeedback(null);

    const res = await playtestService.resendEmail(selectedApp.id, type, 'OFFICER_STATION');
    setIsProcessing(false);

    if (res.success && res.application) {
      setSelectedApp(res.application);
      setActionFeedback(res.message);
      refreshData();
    }
  };

  const handleSaveNotes = () => {
    if (!selectedApp) return;
    playtestService.updateNotes(selectedApp.id, notesInput, 'OFFICER_STATION');
    setActionFeedback('Operative notes updated successfully.');
    refreshData();
  };

  // If not authenticated, display secure passkey gate
  if (!isAuthenticated) {
    return (
      <div className="playtest-admin-root">
        <div className="admin-auth-gate-stage">
          <div className="admin-auth-card">
            <span className="auth-lead-tag">CLEARANCE CONTROL</span>
            <h1 className="auth-headline">ADMIN TERMINAL</h1>
            <p className="auth-desc">
              Restricted officer access for managing Broken Horizon pre-alpha playtest applications, cryptographic tokens, and dispatch clearances.
            </p>

            <form onSubmit={handleLogin} className="auth-form">
              <div className="auth-input-group">
                <label className="auth-label" htmlFor="admin-passphrase">
                  Clearance Passkey
                </label>
                <input
                  id="admin-passphrase"
                  type="password"
                  value={passphrase}
                  onChange={(e) => setPassphrase(e.target.value)}
                  placeholder="ENTER ACCESS KEY"
                  className="auth-input"
                  autoFocus
                  required
                />
              </div>

              {authError && <div className="auth-error-banner">{authError}</div>}

              <button type="submit" className="btn-auth-submit">
                <Lock size={16} />
                <span>AUTHENTICATE</span>
              </button>
            </form>

            <div className="auth-card-footer">
              <button type="button" onClick={onBackToHome} className="auth-return-btn">
                <ArrowLeft size={14} />
                <span>RETURN TO PUBLIC PORTAL</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="playtest-admin-root">
      <div className="admin-container">
        {/* Terminal Header */}
        <header className="admin-terminal-header">
          <div className="admin-brand-block">
            <span className="admin-eyebrow">PRE-ALPHA TELEMETRY // CLEARANCE STATION</span>
            <h1 className="admin-title">PLAYTEST CLEARANCE</h1>
          </div>

          <div className="admin-controls-group">
            <button
              type="button"
              onClick={refreshData}
              className="btn-admin-nav"
              title="Refresh Telemetry Data"
            >
              <RefreshCw size={14} />
              <span>SYNC</span>
            </button>
            <button
              type="button"
              onClick={onBackToHome}
              className="btn-admin-nav"
            >
              <ArrowLeft size={14} />
              <span>PUBLIC PORTAL</span>
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="btn-admin-nav btn-admin-logout"
            >
              <LogOut size={14} />
              <span>LOGOUT</span>
            </button>
          </div>
        </header>

        {/* Live Metrics Telemetry Strip */}
        <section className="admin-metrics-grid" aria-label="Playtest Metrics">
          <div className="metric-stat-card is-total">
            <span className="metric-label">TOTAL APPLICATIONS</span>
            <span className="metric-value">{metrics.total}</span>
          </div>
          <div className="metric-stat-card is-pending">
            <span className="metric-label">PENDING REVIEW</span>
            <span className="metric-value">{metrics.pending}</span>
          </div>
          <div className="metric-stat-card is-approved">
            <span className="metric-label">CLEARED &amp; APPROVED</span>
            <span className="metric-value">{metrics.approved}</span>
          </div>
          <div className="metric-stat-card is-waitlisted">
            <span className="metric-label">QUEUED WAITLIST</span>
            <span className="metric-value">{metrics.waitlisted}</span>
          </div>
          <div className="metric-stat-card is-rejected">
            <span className="metric-label">REJECTED</span>
            <span className="metric-value">{metrics.rejected}</span>
          </div>
        </section>

        {/* Toolbar: Search, Filters & Sorting */}
        <div className="admin-toolbar-row">
          <div className="admin-search-wrapper">
            <Search size={16} className="search-icon-svg" />
            <input
              type="text"
              placeholder="SEARCH BY CALLSIGN, EMAIL, OR NOTES..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input-field"
            />
          </div>

          <div className="admin-filters-group">
            {(['all', 'pending', 'approved', 'waitlisted', 'rejected'] as const).map((filter) => (
              <button
                key={filter}
                type="button"
                className={`filter-tab-btn ${statusFilter === filter ? 'is-active' : ''}`}
                onClick={() => setStatusFilter(filter)}
              >
                {filter}
              </button>
            ))}

            <button
              type="button"
              className="filter-tab-btn"
              onClick={() => setSortOrder(sortOrder === 'newest' ? 'oldest' : 'newest')}
            >
              {sortOrder === 'newest' ? 'NEWEST FIRST' : 'OLDEST FIRST'}
            </button>
          </div>
        </div>

        {/* Application Data Table */}
        <div className="admin-table-frame">
          <table className="admin-data-table">
            <thead>
              <tr>
                <th>CALLSIGN</th>
                <th>EMAIL ADDRESS</th>
                <th>STATUS</th>
                <th>WAVE</th>
                <th>TIMESTAMP</th>
                <th>EMAIL STATUS</th>
                <th style={{ textAlign: 'right' }}>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {applications.length > 0 ? (
                applications.map((app) => (
                  <tr key={app.id}>
                    <td className="cell-callsign">{app.callsign}</td>
                    <td className="cell-email">{app.email}</td>
                    <td>
                      <span className={`status-tag is-${app.status}`}>
                        {app.status === 'approved' && <CheckCircle size={12} />}
                        {app.status === 'pending' && <Clock size={12} />}
                        {app.status === 'rejected' && <XCircle size={12} />}
                        {app.status === 'waitlisted' && <AlertTriangle size={12} />}
                        {app.status}
                      </span>
                    </td>
                    <td style={{ fontFamily: 'Courier New, monospace', fontSize: '0.82rem' }}>
                      Wave 0{app.playtest_wave}
                    </td>
                    <td style={{ fontFamily: 'Courier New, monospace', fontSize: '0.78rem', color: '#71717a' }}>
                      {new Date(app.created_at).toLocaleDateString()}
                    </td>
                    <td>
                      <span
                        style={{
                          fontFamily: 'Courier New, monospace',
                          fontSize: '0.72rem',
                          color: app.email_delivery_status === 'sent' ? '#22c55e' : '#f59e0b',
                        }}
                      >
                        {app.email_delivery_status.toUpperCase()}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <button
                        type="button"
                        className="table-action-btn"
                        onClick={() => handleOpenDetail(app)}
                      >
                        <FileText size={12} />
                        <span>REVIEW</span>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="empty-table-prompt">
                    NO PLAYTEST APPLICATIONS FOUND MATCHING CURRENT CRITERIA.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail & Action Modal */}
      {selectedApp && (
        <div className="admin-modal-backdrop" onClick={() => setSelectedApp(null)}>
          <div className="admin-detail-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-strip">
              <div>
                <span className="auth-lead-tag">OPERATIVE DOSSIER</span>
                <h2 className="modal-header-title">{selectedApp.callsign}</h2>
              </div>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setSelectedApp(null)}
              >
                <X size={20} />
              </button>
            </div>

            <div className="modal-body-content">
              {actionFeedback && (
                <div
                  style={{
                    backgroundColor: 'rgba(34, 197, 94, 0.12)',
                    border: '1px solid rgba(34, 197, 94, 0.4)',
                    color: '#86efac',
                    padding: '0.75rem 1rem',
                    fontFamily: 'Courier New, monospace',
                    fontSize: '0.8rem',
                  }}
                >
                  {actionFeedback}
                </div>
              )}

              {/* Telemetry Grid */}
              <div className="detail-telemetry-grid">
                <div className="telemetry-item">
                  <span className="telemetry-key">APPLICATION ID</span>
                  <span className="telemetry-val">{selectedApp.id}</span>
                </div>
                <div className="telemetry-item">
                  <span className="telemetry-key">EMAIL ADDRESS</span>
                  <span className="telemetry-val">{selectedApp.email}</span>
                </div>
                <div className="telemetry-item">
                  <span className="telemetry-key">CURRENT STATUS</span>
                  <span className="telemetry-val" style={{ textTransform: 'uppercase', color: '#ea580c' }}>
                    {selectedApp.status}
                  </span>
                </div>
                <div className="telemetry-item">
                  <span className="telemetry-key">PLAYTEST WAVE</span>
                  <span className="telemetry-val">Wave 0{selectedApp.playtest_wave}</span>
                </div>
                <div className="telemetry-item">
                  <span className="telemetry-key">APPLIED AT</span>
                  <span className="telemetry-val">
                    {new Date(selectedApp.created_at).toLocaleString()}
                  </span>
                </div>
                {selectedApp.access_token && (
                  <div className="telemetry-item" style={{ gridColumn: 'span 2' }}>
                    <span className="telemetry-key">ACCESS TOKEN / PORTAL LINK</span>
                    <span className="telemetry-val" style={{ color: '#22c55e', fontSize: '0.78rem' }}>
                      {selectedApp.access_token}
                    </span>
                    <a
                      href={`/playtest?token=${selectedApp.access_token}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: '#ea580c',
                        fontSize: '0.75rem',
                        fontFamily: 'Courier New, monospace',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.3rem',
                        marginTop: '0.25rem',
                      }}
                    >
                      <span>Preview Player Portal</span>
                      <ExternalLink size={12} />
                    </a>
                  </div>
                )}
              </div>

              {/* Internal Notes Editor */}
              <div className="notes-editor-block">
                <label className="auth-label" htmlFor="internal-notes">
                  Internal Officer Notes
                </label>
                <textarea
                  id="internal-notes"
                  value={notesInput}
                  onChange={(e) => setNotesInput(e.target.value)}
                  placeholder="Add confidential evaluation or telemetry notes..."
                  className="notes-textarea"
                />
                <button
                  type="button"
                  onClick={handleSaveNotes}
                  className="table-action-btn"
                  style={{ alignSelf: 'flex-start', marginTop: '0.25rem' }}
                >
                  SAVE NOTES
                </button>
              </div>

              {/* Confirmation Alert Box */}
              {confirmAction && (
                <div
                  style={{
                    backgroundColor: '#14171d',
                    border: '1px solid #ea580c',
                    padding: '1.25rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.75rem',
                  }}
                >
                  <span style={{ fontFamily: 'Georgia, serif', color: '#ffffff', fontWeight: 700 }}>
                    {confirmAction === 'approve'
                      ? `Approve Operative ${selectedApp.callsign}?`
                      : `Reject Operative ${selectedApp.callsign}?`}
                  </span>
                  <p style={{ fontSize: '0.82rem', color: '#a1a1aa', margin: 0 }}>
                    {confirmAction === 'approve'
                      ? `This will generate a cryptographic access token and immediately send the official clearance email to ${selectedApp.email}.`
                      : `This will mark the application as rejected.`}
                  </p>
                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                    {confirmAction === 'approve' ? (
                      <button
                        type="button"
                        onClick={handleApprove}
                        disabled={isProcessing}
                        className="btn-action-approve"
                      >
                        {isProcessing ? 'SENDING CLEARANCE...' : 'CONFIRM APPROVAL & SEND'}
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handleReject}
                        disabled={isProcessing}
                        className="btn-action-reject"
                      >
                        {isProcessing ? 'REJECTING...' : 'CONFIRM REJECTION'}
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => setConfirmAction(null)}
                      className="filter-tab-btn"
                    >
                      CANCEL
                    </button>
                  </div>
                </div>
              )}

              {/* Action Buttons Tray */}
              {!confirmAction && (
                <div className="modal-actions-tray">
                  {selectedApp.status !== 'approved' && (
                    <button
                      type="button"
                      className="btn-action-approve"
                      onClick={() => setConfirmAction('approve')}
                    >
                      <CheckCircle size={14} />
                      <span>APPROVE &amp; SEND CLEARANCE</span>
                    </button>
                  )}

                  {selectedApp.status !== 'rejected' && (
                    <button
                      type="button"
                      className="btn-action-reject"
                      onClick={() => setConfirmAction('reject')}
                    >
                      <XCircle size={14} />
                      <span>REJECT</span>
                    </button>
                  )}

                  {selectedApp.status !== 'waitlisted' && (
                    <button
                      type="button"
                      className="btn-action-waitlist"
                      onClick={() => handleWaitlist(false)}
                    >
                      <AlertTriangle size={14} />
                      <span>WAITLIST</span>
                    </button>
                  )}

                  {selectedApp.status === 'approved' ? (
                    <button
                      type="button"
                      className="btn-action-resend"
                      onClick={() => handleResend('access')}
                      disabled={isProcessing}
                    >
                      <Send size={14} />
                      <span>RESEND ACCESS EMAIL</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="btn-action-resend"
                      onClick={() => handleResend('confirmation')}
                      disabled={isProcessing}
                    >
                      <Send size={14} />
                      <span>RESEND CONFIRMATION</span>
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
