/**
 * Structured audit log event — mirrors a real SOC 2 / ISO 27001 audit record.
 *
 * Backend integration: POST /api/v1/audit/events
 * Every field here has a corresponding column in the PostgreSQL audit_events table.
 *
 * NEVER log secrets, tokens, or PII in the `details` field.
 */
export interface AuditEvent {
  eventId: string;          // UUID v4 correlation ID
  timestampUTC: string;     // ISO 8601
  actor: string;            // username / service account
  userId: string;           // internal user ID
  tenantId: string;         // workspace / org ID
  ipAddress: string;        // anonymized last octet in GDPR zones
  country: string;
  browser: string;
  os: string;
  device: string;
  sessionId: string;
  action: AuditAction;
  status: 'SUCCESS' | 'BLOCKED' | 'QUARANTINED' | 'FAILED' | 'FLAGGED';
  resource: string;         // e.g. "document:resume_2026.pdf"
  details: string;          // human-readable, non-sensitive
  correlationId: string;    // tie related events together (e.g. upload → scan → graph build)
}

export type AuditAction =
  | 'AUTH_LOGIN'
  | 'AUTH_LOGOUT'
  | 'AUTH_MFA_VERIFY'
  | 'AUTH_TOKEN_REFRESH'
  | 'AUTH_SESSION_REVOKE'
  | 'AUTH_BRUTE_FORCE_BLOCKED'
  | 'DOCUMENT_UPLOAD'
  | 'DOCUMENT_VIRUS_SCAN'
  | 'DOCUMENT_QUARANTINE'
  | 'DOCUMENT_OCR'
  | 'DOCUMENT_DELETE'
  | 'GRAPH_BUILD'
  | 'GRAPH_QUERY'
  | 'AI_SEARCH_QUERY'
  | 'AI_RAG_GROUNDED'
  | 'AI_PROMPT_INJECTION_BLOCKED'
  | 'AI_PII_REDACTED'
  | 'RECRUITER_PROFILE_ACCESS'
  | 'RESUME_EXPORT'
  | 'PRIVACY_DATA_DOWNLOAD'
  | 'PRIVACY_DATA_DELETE'
  | 'SECURITY_MFA_ENABLED'
  | 'SECURITY_MFA_DISABLED'
  | 'RBAC_ACCESS_DENIED';

/**
 * In-memory audit log buffer (dev mode).
 * Production: replace with POST to /api/v1/audit/events → PostgreSQL / Loki.
 */
let auditBuffer: AuditEvent[] = [];

/**
 * Log a security-relevant event.
 * Automatically populates eventId, timestampUTC, and correlationId.
 */
export function logAuditEvent(
  partial: Omit<AuditEvent, 'eventId' | 'timestampUTC'>
): AuditEvent {
  const event: AuditEvent = {
    eventId: crypto.randomUUID(),
    timestampUTC: new Date().toISOString(),
    ...partial,
  };

  // Prepend so newest is first
  auditBuffer = [event, ...auditBuffer].slice(0, 200);

  // Production hook: ship to backend
  // fetch('/api/v1/audit/events', { method: 'POST', body: JSON.stringify(event) });

  if (import.meta.env.DEV) {
    console.groupCollapsed(`[AUDIT] ${event.action} — ${event.status}`);
    console.table(event);
    console.groupEnd();
  }

  return event;
}

export function getAuditLog(): AuditEvent[] {
  return auditBuffer;
}

export function clearAuditBuffer(): void {
  auditBuffer = [];
}
