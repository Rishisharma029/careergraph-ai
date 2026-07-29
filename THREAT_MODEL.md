# CareerGraph AI — Threat Model (STRIDE)
# Modelled after Microsoft SDL, Google SDLC, and OWASP Threat Modelling methodology.

## System Overview

```
[User Browser]
    ↓ HTTPS (TLS 1.3)
[Nginx — TLS Termination]
    ↓ HTTP (internal only)
[FastAPI — Auth + Rate Limiting + Input Validation]
    ↓
[Document Upload Pipeline]
    → ClamAV (virus scan)
    → Apache Tika (metadata)
    → Presidio (PII masking)
    → TrOCR (text extraction)
    ↓
[Neo4j — Knowledge Graph]    [Qdrant — Vector Store]
[PostgreSQL — Users, Audit]  [Redis — Rate Limit Cache]
    ↓
[OpenAI API — RAG Grounding]
    ↓ Response (evidence-grounded only)
[User]
```

---

## STRIDE Threat Analysis

### S — Spoofing (Identity)

| Threat | Attack Scenario | Mitigation | Residual Risk |
|---|---|---|---|
| JWT forgery | Attacker crafts a valid-looking JWT | RS256 asymmetric signing — private key never leaves server | Low |
| Session hijacking | Cookie theft via XSS | HttpOnly, Secure, SameSite=Strict cookies | Low |
| Account takeover | Credential stuffing from leaked DB | MFA + TOTP + brute force lockout (5 attempts) | Low |
| Phishing for tokens | Attacker fakes login page | HSTS preloading, CSP prevents framing | Medium |

### T — Tampering (Integrity)

| Threat | Attack Scenario | Mitigation | Residual Risk |
|---|---|---|---|
| Document tampering | Attacker modifies a resume after upload | SHA-256 checksum stored at upload; verified before processing | Low |
| API payload manipulation | Attacker injects malicious JSON field | Pydantic strict schema validation on every endpoint | Low |
| Graph node injection | Malicious Cypher injection via API | Parameterised Neo4j queries; never string-interpolated | Low |
| Vector poisoning | Attacker uploads documents to corrupt others' embeddings | Tenant-isolated Qdrant namespaces; uploads only write to caller's namespace | Low |

### R — Repudiation (Non-repudiation)

| Threat | Attack Scenario | Mitigation | Residual Risk |
|---|---|---|---|
| Audit log tampering | Admin deletes their own audit trail | Logs shipped to WORM storage (S3 Object Lock) within 60s of creation | Low |
| Denying recruiter access | Recruiter claims they didn't access a profile | Every API call logged with Actor, Session ID, IP, Timestamp | Low |
| False data deletion claim | User claims data wasn't deleted after GDPR request | Deletion event logged with Correlation ID; download confirmation sent | Low |

### I — Information Disclosure (Confidentiality)

| Threat | Attack Scenario | Mitigation | Residual Risk |
|---|---|---|---|
| Cross-user data leakage | Attacker queries another user's documents | Qdrant namespace isolation; Neo4j row-level ownership checks | Low |
| PII in AI responses | AI exposes Aadhaar/PAN from document | PII masked before AI ingestion; RAG grounding only surfaces cited text | Low |
| API error leakage | Stack traces expose internal structure | Production error handler returns opaque `request_id` only | Low |
| Indirect prompt injection | Malicious document exposes system prompt | Context boundary wrapping; system prompt never in context window | Low |
| Secrets in logs | API key appears in access logs | Structured logging with allowlist fields only | Low |

### D — Denial of Service (Availability)

| Threat | Attack Scenario | Mitigation | Residual Risk |
|---|---|---|---|
| File upload DoS | Attacker uploads 1000 x 100 MB files | 25 MB limit per file; 100 req/min rate limit per IP | Low |
| AI API exhaustion | Attacker repeatedly queries AI search | Per-user token budget; Redis rate limit on `/api/v1/ai/*` | Medium |
| GraphQL introspection DoS | Deeply nested queries | Query depth limit of 10; complexity analysis | Low |
| ClamAV zip bomb | Attacker uploads a zip bomb disguised as PDF | Magic byte validation rejects non-PDF before AV scan | Low |

### E — Elevation of Privilege (Authorisation)

| Threat | Attack Scenario | Mitigation | Residual Risk |
|---|---|---|---|
| Horizontal privilege escalation | Candidate accesses another candidate's graph | JWT sub field tied to tenant + user namespace; checked on every request | Low |
| Vertical privilege escalation | Candidate attempts to call admin API | RBAC middleware checks role on every endpoint | Low |
| JWT claim manipulation | Attacker modifies `role` claim in token | RS256 signature invalidates any tampered token | Low |
| IDOR via document ID | Attacker guesses document UUID | UUIDs + ownership check on every document fetch | Low |

---

## AI-Specific Threat Analysis

| Threat | Description | Mitigation |
|---|---|---|
| Indirect Prompt Injection | Malicious instructions embedded in uploaded PDFs | Pattern matching + context boundary wrapping + server-side classifier |
| Hallucination Exploitation | AI fabricates skills or achievements | Strict RAG grounding; all claims must have a document citation |
| Model Extraction | Repeated queries to reverse-engineer the model | Rate limiting + response variation; we use OpenAI API (not self-hosted) |
| Training Data Poisoning | Malicious documents corrupt AI training | Opt-in AI training consent; poisoned data detected via anomaly scoring |
| Jailbreaking | DAN / developer mode / persona swap attempts | Input classifier blocks known patterns; monitored in audit log |
| Confidence Exploitation | Low-confidence AI answers presented as fact | Confidence gate ≥ 85%; flagged answers include "Low Confidence" badge |

---

## Data Flow Diagram — Document Upload Security

```
User uploads resume.pdf
    ↓
[1] Extension validation      → reject if not in {.pdf, .docx, .png, .jpg}
    ↓
[2] MIME type validation       → reject if type not in allowlist
    ↓
[3] Magic byte check           → read file header, confirm real format
    ↓
[4] Size check                 → reject if > 25 MB
    ↓
[5] SHA-256 hash               → compute & store for integrity + dedup
    ↓
[6] Duplicate check            → skip if same SHA-256 already processed
    ↓
[7] ClamAV virus scan          → QUARANTINE if signature match
    ↓
[8] Macro / script detection   → QUARANTINE if VBA or executable found
    ↓
[9] PDF JavaScript strip       → remove all embedded JS, auto-actions
    ↓
[10] Metadata sanitization     → strip author, GPS, EXIF
    ↓
[11] PII detection (client)    → mask Aadhaar, PAN, email, phone
    ↓
[12] Prompt injection scan     → neutralise if injection pattern found
    ↓
[13] OCR sandbox               → TrOCR in isolated context, no network
    ↓
AES-256 encrypted blob → S3 storage
    ↓
Text → Presidio PII masking (server) → OpenAI Embeddings → Qdrant (namespaced)
    ↓
Cypher parsing → Neo4j knowledge graph
```

---

## Compliance Alignment

> **Important**: The following describes architectural alignment with established frameworks.
> CareerGraph AI does not hold any SOC 2, ISO 27001, or PCI-DSS certifications.

| Framework | Alignment Area |
|---|---|
| SOC 2 Type II Principles | CC6 (Logical Access), CC7 (System Operations), CC8 (Change Management), CC9 (Risk Mitigation) |
| OWASP Top 10 (2021) | A01 Broken Access Control, A02 Cryptographic Failures, A03 Injection, A07 Auth Failures, A09 Logging |
| GDPR / DPDP Act 2023 | Data minimisation, right to erasure, right to access, purpose limitation, consent management |
| NIST Cybersecurity Framework | Identify → Protect → Detect → Respond → Recover |
| OWASP ASVS Level 2 | Authentication, Session Management, Access Control, Input Validation, Cryptography |

---

*Last reviewed: 2026-07-29 | Next review: 2026-10-29*
