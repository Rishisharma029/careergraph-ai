import React, { useState, useCallback } from 'react';
import { useSecurityStore } from '../../store/useSecurityStore';
import { buildPipelineSteps, runThreatPipeline, type ThreatStep } from '../../security/threat/useThreatEngine';
import './Security.css';

interface SecurityCenterProps {
  onNavigate?: (route: string) => void;
}

type Tab = 'overview' | 'identity' | 'data' | 'ai' | 'documents' | 'audit' | 'privacy';


const STATUS_COLORS: Record<string, string> = {
  SUCCESS: '#22c55e',
  BLOCKED: '#f97316',
  QUARANTINED: '#ef4444',
  FAILED: '#ef4444',
  FLAGGED: '#eab308',
};

const SEVERITY_COLORS: Record<string, string> = {
  critical: '#ef4444',
  high: '#f97316',
  medium: '#eab308',
  low: '#22c55e',
  info: '#3b82f6',
};

const STEP_STATUS_ICON: Record<string, string> = {
  pending: '○',
  running: '◌',
  passed: '✓',
  failed: '✕',
  quarantined: '⚠',
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function SecurityCenter({ onNavigate }: SecurityCenterProps) {
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [auditFilter, setAuditFilter] = useState('');
  const [showWipeConfirm, setShowWipeConfirm] = useState(false);
  const [pipelineSteps, setPipelineSteps] = useState<ThreatStep[]>(buildPipelineSteps());
  const [pipelineRunning, setPipelineRunning] = useState(false);
  const [pipelineResult, setPipelineResult] = useState<null | { passed: boolean; quarantined: boolean }>(null);
  const [consentSettings, setConsentSettings] = useState({
    analytics: true,
    aiTraining: false,
    marketing: false,
    thirdParty: false,
  });

  const store = useSecurityStore();
  const score = store.getSecurityScore();
  const categories = store.getScoreCategories();
  const activeAlerts = store.riskAlerts.filter(a => !a.dismissed);
  const filteredAudit = store.auditLog.filter(e =>
    auditFilter === '' ||
    e.action.toLowerCase().includes(auditFilter.toLowerCase()) ||
    e.actor.toLowerCase().includes(auditFilter.toLowerCase()) ||
    e.details.toLowerCase().includes(auditFilter.toLowerCase())
  );

  const runDemo = useCallback(async (injectThreat: boolean) => {
    setPipelineRunning(true);
    setPipelineResult(null);
    const fakeFile = new File(['demo content'], 'demo_resume.pdf', { type: 'application/pdf' });
    const result = await runThreatPipeline(fakeFile, setPipelineSteps, injectThreat);
    setPipelineResult({ passed: result.passed, quarantined: result.quarantined });
    setPipelineRunning(false);
  }, []);

  const scoreColor = score >= 85 ? '#22c55e' : score >= 65 ? '#eab308' : '#ef4444';
  const scoreLabel = score >= 85 ? 'Strong' : score >= 65 ? 'Moderate' : 'Needs Attention';

  const tabs: { id: Tab; label: string; icon: string }[] = [
    { id: 'overview', label: 'Overview', icon: '🛡️' },
    { id: 'identity', label: 'Identity & Access', icon: '🔐' },
    { id: 'data', label: 'Data & Encryption', icon: '🔒' },
    { id: 'ai', label: 'AI Security', icon: '🤖' },
    { id: 'documents', label: 'Document Security', icon: '📄' },
    { id: 'audit', label: 'Audit Logs', icon: '📋' },
    { id: 'privacy', label: 'Privacy Center', icon: '🏛️' },
  ];

  return (
    <div className="security-center">
      {/* Header */}
      <div className="security-header">
        <div className="security-header-left">
          <h1 className="security-title">Security Center</h1>
          <p className="security-subtitle">
            Security controls aligned with SOC 2 Type II principles · OWASP Top 10 mitigations implemented · Zero Trust Architecture
          </p>
        </div>
        <div className="security-score-ring">
          <svg width="90" height="90" viewBox="0 0 90 90">
            <circle cx="45" cy="45" r="38" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="8" />
            <circle
              cx="45" cy="45" r="38"
              fill="none"
              stroke={scoreColor}
              strokeWidth="8"
              strokeDasharray={`${(score / 100) * 238.76} 238.76`}
              strokeLinecap="round"
              transform="rotate(-90 45 45)"
              style={{ transition: 'stroke-dasharray 1s ease' }}
            />
          </svg>
          <div className="score-ring-inner">
            <span className="score-number" style={{ color: scoreColor }}>{score}</span>
            <span className="score-label-small">{scoreLabel}</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="security-tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`security-tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="security-content">

        {/* ========================= OVERVIEW ========================= */}
        {activeTab === 'overview' && (
          <div className="tab-panel">
            {/* Score breakdown */}
            <section className="sec-section">
              <h2 className="sec-section-title">Security Score Breakdown</h2>
              <p className="sec-section-desc">Score is derived from actual feature state — not a static value.</p>
              <div className="score-categories">
                {categories.map(cat => {
                  const pct = Math.round((cat.score / cat.maxScore) * 100);
                  const color = pct >= 80 ? '#22c55e' : pct >= 50 ? '#eab308' : '#ef4444';
                  return (
                    <div key={cat.id} className="score-category-card">
                      <div className="cat-header">
                        <span className="cat-label">{cat.label}</span>
                        <span className="cat-score" style={{ color }}>{cat.score}/{cat.maxScore}</span>
                      </div>
                      <div className="cat-bar-track">
                        <div className="cat-bar-fill" style={{ width: `${pct}%`, background: color }} />
                      </div>
                      <ul className="cat-items">
                        {cat.items.map((item, i) => (
                          <li key={i} className={`cat-item ${item.pass ? 'pass' : 'fail'}`}>
                            <span className="cat-item-icon">{item.pass ? '✓' : '✕'}</span>
                            <div>
                              <span className="cat-item-label">{item.label}</span>
                              <span className="cat-item-detail">{item.detail}</span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Risk alerts */}
            <section className="sec-section">
              <h2 className="sec-section-title">Risk Alerts <span className="alert-badge">{activeAlerts.length}</span></h2>
              {activeAlerts.length === 0 && (
                <div className="empty-state">
                  <span>✅</span>
                  <p>No active risk alerts. All security controls are operating normally.</p>
                </div>
              )}
              {activeAlerts.map(alert => (
                <div key={alert.id} className="risk-alert" style={{ borderLeftColor: SEVERITY_COLORS[alert.severity] }}>
                  <div className="alert-header">
                    <span className="alert-severity-badge" style={{ background: SEVERITY_COLORS[alert.severity] + '22', color: SEVERITY_COLORS[alert.severity] }}>
                      {alert.severity.toUpperCase()}
                    </span>
                    <span className="alert-title">{alert.title}</span>
                    <button className="alert-dismiss" onClick={() => store.dismissAlert(alert.id)}>Dismiss</button>
                  </div>
                  <p className="alert-detail">{alert.detail}</p>
                  <span className="alert-time">{new Date(alert.timestampUTC).toLocaleString()}</span>
                </div>
              ))}
            </section>

            {/* Compliance notice */}
            <section className="sec-section compliance-notice">
              <div className="compliance-row">
                <div className="compliance-badge">OWASP</div>
                <div className="compliance-badge">Zero Trust</div>
                <div className="compliance-badge">SOC 2 Aligned</div>
                <div className="compliance-badge">GDPR Ready</div>
                <div className="compliance-badge">AES-256</div>
                <div className="compliance-badge">TLS 1.3</div>
              </div>
              <p className="compliance-disclaimer">
                "SOC 2 Aligned" means our controls, logging, and architecture follow SOC 2 Type II principles.
                It does not indicate we hold a SOC 2 audit certification. Security claims are based on implemented controls, not marketing.
              </p>
            </section>
          </div>
        )}

        {/* ========================= IDENTITY ========================= */}
        {activeTab === 'identity' && (
          <div className="tab-panel">
            <section className="sec-section">
              <h2 className="sec-section-title">Authentication Controls</h2>
              <div className="control-grid">
                <div className="control-card">
                  <div className="control-card-header">
                    <span className="control-icon">🔑</span>
                    <span className="control-name">JWT Access Tokens</span>
                    <span className="control-status active">Active</span>
                  </div>
                  <div className="control-details">
                    <div className="detail-row"><span>TTL</span><span>15 minutes</span></div>
                    <div className="detail-row"><span>Algorithm</span><span>RS256 (asymmetric)</span></div>
                    <div className="detail-row"><span>Refresh TTL</span><span>7 days</span></div>
                    <div className="detail-row"><span>Rotation</span><span>On every use</span></div>
                  </div>
                </div>

                <div className="control-card">
                  <div className="control-card-header">
                    <span className="control-icon">📱</span>
                    <span className="control-name">Multi-Factor Authentication</span>
                    <span className={`control-status ${store.mfaEnabled ? 'active' : 'inactive'}`}>
                      {store.mfaEnabled ? 'Enabled' : 'Disabled'}
                    </span>
                  </div>
                  <div className="control-details">
                    <div className="detail-row"><span>Method</span><span>TOTP (Authenticator App)</span></div>
                    <div className="detail-row"><span>Backup</span><span>8 recovery codes</span></div>
                    <div className="detail-row"><span>Fallback</span><span>Email OTP (6-digit)</span></div>
                  </div>
                  <button className="control-toggle-btn" onClick={store.toggleMFA}>
                    {store.mfaEnabled ? '🔴 Disable MFA' : '🟢 Enable MFA'}
                  </button>
                  {!store.mfaEnabled && (
                    <p className="control-warning">⚠ Disabling MFA reduces your security score by 10 points and increases account vulnerability.</p>
                  )}
                </div>

                <div className="control-card">
                  <div className="control-card-header">
                    <span className="control-icon">🏛️</span>
                    <span className="control-name">Role-Based Access Control</span>
                    <span className="control-status active">Enforced</span>
                  </div>
                  <div className="rbac-table">
                    <div className="rbac-header">
                      <span>Role</span><span>Graph</span><span>Documents</span><span>Audit</span><span>Manage Users</span>
                    </div>
                    {[
                      { role: 'Admin', graph: '✓ RWD', docs: '✓ RWD', audit: '✓', users: '✓' },
                      { role: 'Recruiter', graph: '✓ R', docs: '✓ R', audit: '✕', users: '✕' },
                      { role: 'Candidate', graph: '✓ RW', docs: '✓ RW', audit: '✕', users: '✕' },
                      { role: 'Guest', graph: 'Demo', docs: '✕', audit: '✕', users: '✕' },
                    ].map(r => (
                      <div key={r.role} className="rbac-row">
                        <span className="rbac-role">{r.role}</span>
                        <span>{r.graph}</span><span>{r.docs}</span><span>{r.audit}</span><span>{r.users}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <section className="sec-section">
              <h2 className="sec-section-title">Active Sessions</h2>
              <p className="sec-section-desc">All devices where your account is currently signed in.</p>
              <div className="sessions-list">
                {store.activeSessions.map(sess => (
                  <div key={sess.id} className={`session-card ${sess.isCurrent ? 'current' : ''}`}>
                    <div className="session-device-icon">
                      {sess.deviceName.includes('iPhone') || sess.deviceName.includes('Mobile') ? '📱'
                        : sess.deviceName.includes('Mac') ? '💻' : '🖥️'}
                    </div>
                    <div className="session-info">
                      <div className="session-device-name">
                        {sess.deviceName}
                        {sess.isCurrent && <span className="current-badge">This Device</span>}
                        {!sess.trusted && <span className="untrusted-badge">Untrusted</span>}
                      </div>
                      <div className="session-meta">{sess.browserOS}</div>
                      <div className="session-meta">{sess.location} · {sess.ipAddress}</div>
                      <div className="session-time">
                        Login: {new Date(sess.loginTime).toLocaleString()} · Last active: {sess.lastActive}
                      </div>
                    </div>
                    {!sess.isCurrent && (
                      <button className="revoke-btn" onClick={() => store.revokeSession(sess.id)}>
                        Revoke
                      </button>
                    )}
                  </div>
                ))}
              </div>
              {store.activeSessions.length > 1 && (
                <button className="revoke-all-btn" onClick={store.revokeAllOtherSessions}>
                  Revoke All Other Sessions
                </button>
              )}
              {store.activeSessions.length === 1 && (
                <div className="empty-state"><span>✅</span><p>Only your current device is signed in.</p></div>
              )}
            </section>
          </div>
        )}

        {/* ========================= DATA & ENCRYPTION ========================= */}
        {activeTab === 'data' && (
          <div className="tab-panel">
            <section className="sec-section">
              <h2 className="sec-section-title">Encryption Controls</h2>
              <div className="control-grid">
                <div className="control-card full-width">
                  <h3 className="control-card-title">Storage Architecture</h3>
                  <div className="arch-flow">
                    {['Frontend (HTTPS)', 'FastAPI (TLS 1.3)', 'Signed URL Generator', 'S3-Compatible Storage', 'AES-256 Encrypted Blob'].map((step, i, arr) => (
                      <React.Fragment key={step}>
                        <div className="arch-step">{step}</div>
                        {i < arr.length - 1 && <div className="arch-arrow">→</div>}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
                {[
                  { icon: '🔐', name: 'AES-256 at Rest', status: 'Active', details: [['Algorithm', 'AES-256-GCM'], ['Key Rotation', 'Every 90 days'], ['Key Storage', 'AWS KMS / Azure Key Vault'], ['IV/Nonce', 'Random per file']] },
                  { icon: '🌐', name: 'TLS 1.3 in Transit', status: 'Active', details: [['Protocol', 'TLS 1.3 only'], ['Cipher', 'ECDHE-RSA-AES256-GCM'], ['HSTS', '31,536,000 sec (1 year)'], ['Certificate', 'Let\'s Encrypt / DigiCert']] },
                  { icon: '🔗', name: 'Signed Upload URLs', status: 'Active', details: [['Expiry', '5 minutes'], ['Scope', 'Single file, single use'], ['Validation', 'HMAC-SHA256 signature'], ['Storage', 'Never exposed to client']] },
                ].map(ctrl => (
                  <div key={ctrl.name} className="control-card">
                    <div className="control-card-header">
                      <span className="control-icon">{ctrl.icon}</span>
                      <span className="control-name">{ctrl.name}</span>
                      <span className="control-status active">{ctrl.status}</span>
                    </div>
                    <div className="control-details">
                      {ctrl.details.map(([k, v]) => (
                        <div key={k} className="detail-row"><span>{k}</span><span>{v}</span></div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="sec-section">
              <h2 className="sec-section-title">PII Masking Engine</h2>
              <p className="sec-section-desc">
                All extracted document text passes through a PII scanner before AI ingestion.
                Sensitive fields are masked client-side and server-side (Microsoft Presidio).
              </p>
              <div className="pii-table">
                {[
                  { type: 'Aadhaar Number', pattern: 'XXXX XXXXXXXX', example: '4821 XXXX 3492', covered: true },
                  { type: 'PAN Number', pattern: 'ABXXXB123A', example: 'RIXXXa1234K', covered: true },
                  { type: 'Indian Passport', pattern: 'AXXXXXX', example: 'JXXXXXX', covered: true },
                  { type: 'Email Address', pattern: 'ri***@gmail.com', example: 'ri***@example.com', covered: true },
                  { type: 'Phone Number', pattern: '+91 98XXXXXXX91', example: '+91 98XXXXXXX21', covered: true },
                  { type: 'Bank Account', pattern: 'XXXX4892', example: 'XXXX8821', covered: true },
                ].map(row => (
                  <div key={row.type} className="pii-row">
                    <span className="pii-type">{row.type}</span>
                    <span className="pii-pattern">{row.pattern}</span>
                    <span className="pii-example">{row.example}</span>
                    <span className="pii-covered">✓ Covered</span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* ========================= AI SECURITY ========================= */}
        {activeTab === 'ai' && (
          <div className="tab-panel">
            <section className="sec-section">
              <h2 className="sec-section-title">AI Security Controls</h2>
              <div className="control-grid">
                {[
                  {
                    icon: '🎯', name: 'Strict RAG Grounding', status: 'Active',
                    desc: 'The AI only answers from verified document citations. Hallucinations rejected at inference time.',
                    details: [['Source verification', 'Every claim traced to citation'], ['Confidence gate', '≥ 85% required'], ['Hallucination rejection', 'Sub-threshold answers flagged'], ['Context window', 'User data only']]
                  },
                  {
                    icon: '🔥', name: 'Prompt Injection Firewall', status: 'Active',
                    desc: 'All document text wrapped in a strict data-only context boundary before LLM ingestion.',
                    details: [['Client-side scan', 'Pattern matching, 16 signatures'], ['Server-side scan', 'Fine-tuned classifier'], ['Context boundary', '<USER_DOCUMENT_DATA> wrapping'], ['Action on detection', 'Neutralise + log to audit trail']]
                  },
                  {
                    icon: '🧱', name: 'Tenant Isolation', status: 'Active',
                    desc: 'Each user\'s vector embeddings are stored in a namespaced Qdrant collection. Cross-user contamination is architecturally impossible.',
                    details: [['Vector store', 'Qdrant with namespace isolation'], ['Namespace format', 'tenant:{tenantId}:user:{userId}'], ['RAG retrieval', 'Namespace-scoped queries only'], ['Audit', 'Every retrieval logged']]
                  },
                  {
                    icon: '🛑', name: 'Jailbreak Detection', status: 'Active',
                    desc: 'Monitors for DAN, developer mode, persona-swap, and role-override patterns in all user inputs.',
                    details: [['Patterns monitored', '8 jailbreak categories'], ['Response', 'Block + log + alert'], ['False positive rate', '< 0.2%'], ['Updates', 'Weekly signature refresh']]
                  },
                ].map(ctrl => (
                  <div key={ctrl.name} className="control-card">
                    <div className="control-card-header">
                      <span className="control-icon">{ctrl.icon}</span>
                      <span className="control-name">{ctrl.name}</span>
                      <span className="control-status active">{ctrl.status}</span>
                    </div>
                    <p className="control-desc">{ctrl.desc}</p>
                    <div className="control-details">
                      {ctrl.details.map(([k, v]) => (
                        <div key={k} className="detail-row"><span>{k}</span><span>{v}</span></div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="sec-section">
              <h2 className="sec-section-title">Prompt Firewall Events</h2>
              {store.auditLog.filter(e => e.action === 'AI_PROMPT_INJECTION_BLOCKED' || e.action === 'AI_PII_REDACTED').length === 0 ? (
                <div className="empty-state"><span>✅</span><p>No prompt injection attempts detected in this session.</p></div>
              ) : (
                store.auditLog
                  .filter(e => e.action === 'AI_PROMPT_INJECTION_BLOCKED' || e.action === 'AI_PII_REDACTED')
                  .map(e => (
                    <div key={e.eventId} className="audit-row blocked">
                      <span className="audit-time">{new Date(e.timestampUTC).toLocaleTimeString()} UTC</span>
                      <span className="audit-action">{e.action.replace(/_/g, ' ')}</span>
                      <span className="audit-status" style={{ color: '#f97316' }}>BLOCKED</span>
                      <span className="audit-detail">{e.details}</span>
                    </div>
                  ))
              )}
            </section>
          </div>
        )}

        {/* ========================= DOCUMENT SECURITY ========================= */}
        {activeTab === 'documents' && (
          <div className="tab-panel">
            <section className="sec-section">
              <h2 className="sec-section-title">13-Step Document Threat Pipeline</h2>
              <p className="sec-section-desc">
                Every uploaded document must pass all validation stages before OCR ingestion begins.
                Run the demo to see the full pipeline in action.
              </p>
              <div className="pipeline-controls">
                <button
                  className="pipeline-btn green"
                  onClick={() => runDemo(false)}
                  disabled={pipelineRunning}
                >
                  {pipelineRunning ? '⏳ Scanning…' : '▶ Run Clean Document Demo'}
                </button>
                <button
                  className="pipeline-btn red"
                  onClick={() => runDemo(true)}
                  disabled={pipelineRunning}
                >
                  {pipelineRunning ? '⏳ Scanning…' : '⚠ Simulate Threat Detection'}
                </button>
              </div>

              {pipelineResult && !pipelineRunning && (
                <div className={`pipeline-result ${pipelineResult.passed ? 'passed' : 'quarantined'}`}>
                  {pipelineResult.passed
                    ? '✅ Document passed all 13 security checks. Cleared for OCR ingestion.'
                    : '🚨 Threat detected. Document quarantined. No data was processed.'}
                </div>
              )}

              <div className="pipeline-steps">
                {pipelineSteps.map((step, i) => (
                  <div key={step.id} className={`pipeline-step ${step.status}`}>
                    <div className="step-number">{i + 1}</div>
                    <div className="step-icon" style={{
                      color: step.status === 'passed' ? '#22c55e'
                        : step.status === 'failed' || step.status === 'quarantined' ? '#ef4444'
                        : step.status === 'running' ? '#3b82f6'
                        : 'rgba(255,255,255,0.3)'
                    }}>
                      {step.status === 'running'
                        ? <span className="spin">◌</span>
                        : STEP_STATUS_ICON[step.status]}
                    </div>
                    <div className="step-content">
                      <div className="step-label">{step.label}</div>
                      <div className="step-desc">{step.detail ?? step.description}</div>
                    </div>
                    <div className={`step-badge ${step.status}`}>
                      {step.status.toUpperCase()}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* ========================= AUDIT LOGS ========================= */}
        {activeTab === 'audit' && (
          <div className="tab-panel">
            <section className="sec-section">
              <div className="audit-header-row">
                <h2 className="sec-section-title">Enterprise Audit Log</h2>
                <input
                  className="audit-search"
                  placeholder="Filter by action, actor, or detail…"
                  value={auditFilter}
                  onChange={e => setAuditFilter(e.target.value)}
                />
              </div>
              <p className="sec-section-desc">
                All security-relevant events are captured with full enterprise context.
                In production, logs are shipped to a tamper-evident WORM storage (S3 Object Lock / Azure Immutable Blob).
              </p>
              <div className="audit-log-table">
                <div className="audit-log-header">
                  <span>UTC Timestamp</span>
                  <span>Actor</span>
                  <span>Action</span>
                  <span>Status</span>
                  <span>IP · Device</span>
                  <span>Session ID</span>
                  <span>Details</span>
                  <span>Correlation ID</span>
                </div>
                {filteredAudit.length === 0 && (
                  <div className="empty-state"><span>🔍</span><p>No events match your filter.</p></div>
                )}
                {filteredAudit.map(event => (
                  <div key={event.eventId} className="audit-log-row">
                    <span className="audit-time-full">{new Date(event.timestampUTC).toLocaleString()}</span>
                    <span className="audit-actor">{event.actor}</span>
                    <span className="audit-action-name">{event.action.replace(/_/g, ' ')}</span>
                    <span className="audit-status-pill" style={{ color: STATUS_COLORS[event.status] ?? '#fff' }}>
                      {event.status}
                    </span>
                    <span className="audit-ip">{event.ipAddress} · {event.browser} / {event.os}</span>
                    <span className="audit-session-id">{event.sessionId}</span>
                    <span className="audit-details">{event.details}</span>
                    <span className="audit-correlation">{event.correlationId}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* ========================= PRIVACY CENTER ========================= */}
        {activeTab === 'privacy' && (
          <div className="tab-panel">
            <section className="sec-section">
              <h2 className="sec-section-title">Consent Management</h2>
              <p className="sec-section-desc">Control what data we collect and how we use it. Aligned with GDPR and DPDP Act 2023 (India).</p>
              <div className="consent-list">
                {[
                  { key: 'analytics' as const, label: 'Usage Analytics', desc: 'Anonymous performance metrics to improve the platform.', required: false },
                  { key: 'aiTraining' as const, label: 'AI Model Training', desc: 'Allow anonymised data to improve AI accuracy (strictly opt-in).', required: false },
                  { key: 'marketing' as const, label: 'Marketing Communications', desc: 'Product updates, feature announcements, and newsletters.', required: false },
                  { key: 'thirdParty' as const, label: 'Third-Party Integrations', desc: 'Share data with connected services (LinkedIn, GitHub, etc.).', required: false },
                ].map(item => (
                  <div key={item.key} className="consent-row">
                    <div className="consent-text">
                      <span className="consent-label">{item.label}</span>
                      <span className="consent-desc">{item.desc}</span>
                    </div>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={consentSettings[item.key]}
                        onChange={() => setConsentSettings(s => ({ ...s, [item.key]: !s[item.key] }))}
                      />
                      <span className="toggle-slider" />
                    </label>
                  </div>
                ))}
              </div>
            </section>

            <section className="sec-section">
              <h2 className="sec-section-title">Your Data Rights</h2>
              <div className="rights-grid">
                <div className="rights-card">
                  <span className="rights-icon">📥</span>
                  <div>
                    <div className="rights-title">Download Your Data</div>
                    <div className="rights-desc">Export everything: graph, documents, AI history, audit log. Delivered as a signed download link within 24 hours.</div>
                  </div>
                  <button className="rights-btn" onClick={() => store.pushAuditEvent({
                    eventId: `ev-dl-${Date.now()}`, timestampUTC: new Date().toISOString(),
                    actor: 'rishi.sharma', userId: 'usr-001', tenantId: 'tenant-careergraph',
                    ipAddress: '103.21.124.52', country: 'India', browser: 'Chrome 124', os: 'Windows 11', device: 'Desktop',
                    sessionId: 'sess-8f2a', action: 'PRIVACY_DATA_DOWNLOAD', status: 'SUCCESS',
                    resource: 'account:all_data', details: 'GDPR data export requested. Signed download link will be emailed within 24 hours.',
                    correlationId: `corr-dl-${Date.now()}`,
                  })}>
                    Request Export
                  </button>
                </div>

                <div className="rights-card danger">
                  <span className="rights-icon">🗑️</span>
                  <div>
                    <div className="rights-title">Delete All Data</div>
                    <div className="rights-desc">
                      Permanently delete your account, documents, graph nodes, vector embeddings, and AI history.
                      This action is irreversible.
                    </div>
                  </div>
                  <button className="rights-btn danger" onClick={() => setShowWipeConfirm(true)}>
                    Request Deletion
                  </button>
                </div>
              </div>
            </section>

            <section className="sec-section">
              <h2 className="sec-section-title">Data Processing Transparency</h2>
              <div className="transparency-table">
                {[
                  { data: 'Resume / Documents', purpose: 'OCR extraction + knowledge graph construction', retention: '5 years or until deletion', location: 'India (Mumbai region)', encrypted: true },
                  { data: 'Vector Embeddings', purpose: 'Semantic AI search', retention: '5 years or until deletion', location: 'India (Mumbai region)', encrypted: true },
                  { data: 'Audit Logs', purpose: 'Security monitoring and compliance', retention: '7 years (regulatory minimum)', location: 'India (Mumbai region)', encrypted: true },
                  { data: 'Session Tokens', purpose: 'Authentication state', retention: 'Session lifetime (7 days max)', location: 'Client browser + Redis', encrypted: true },
                  { data: 'Analytics Events', purpose: 'Platform improvement (if consented)', retention: '90 days', location: 'Anonymous, aggregated', encrypted: false },
                ].map(row => (
                  <div key={row.data} className="transparency-row">
                    <span className="t-data">{row.data}</span>
                    <span className="t-purpose">{row.purpose}</span>
                    <span className="t-retention">{row.retention}</span>
                    <span className="t-location">{row.location}</span>
                    <span className="t-encrypted">{row.encrypted ? '🔒 Encrypted' : '📊 Aggregated'}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}
      </div>

      {/* Wipe Confirm Modal */}
      {showWipeConfirm && (
        <div className="modal-overlay" onClick={() => setShowWipeConfirm(false)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <h3 className="modal-title">⚠️ Permanently Delete All Data</h3>
            <p className="modal-desc">
              This will permanently delete your account, all uploaded documents, the knowledge graph,
              vector embeddings, AI conversation history, and audit logs.
              <br /><br />
              <strong>This action cannot be undone.</strong>
            </p>
            <div className="modal-actions">
              <button className="modal-cancel" onClick={() => setShowWipeConfirm(false)}>Cancel</button>
              <button className="modal-confirm-danger" onClick={() => { store.wipeUserData(); setShowWipeConfirm(false); }}>
                Yes, Delete Everything
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
