# 🔐 Security Policy

## Supported Versions

| Version | Status | Security Updates |
|---|---|---|
| `v2.0.x` (Enterprise Security Suite) | ✅ **Actively Supported** | ✅ Yes |
| `v1.0.x` (Masterclass Release) | ⚠️ Legacy | Security-only patches |
| `< v1.0` | ❌ Unsupported | No |

---

## Reporting a Vulnerability

**Please do NOT open a public GitHub issue for security vulnerabilities.**

Instead, report vulnerabilities through one of these private channels:

### Option 1 — GitHub Private Vulnerability Reporting (Preferred)
1. Go to [Security Advisories](https://github.com/Rishisharma029/careergraph-ai/security/advisories)
2. Click **"New draft security advisory"**
3. Fill in the details using the template below

### Option 2 — Email
Send to: **security@careergraph.ai** (or via GitHub profile contact)

---

## What to Include in Your Report

Please provide as much of the following as possible:

```
- Vulnerability type (e.g., XSS, CSRF, Injection, Auth Bypass)
- OWASP category (e.g., A01 Broken Access Control)
- CVE ID (if known)
- Affected component (e.g., src/security/threat/useThreatEngine.ts)
- Affected version(s)
- Step-by-step reproduction steps
- Proof of concept (code, screenshots, or video)
- Potential impact assessment
- Suggested mitigation (optional)
```

---

## Response Timeline

| Phase | Target Time |
|---|---|
| Acknowledgement of report | Within **48 hours** |
| Severity assessment | Within **5 business days** |
| Patch development | Within **30 days** for Critical/High |
| Public disclosure | After patch is released and deployed |

---

## Severity Classification

We use the **CVSS v3.1** scoring system:

| Severity | CVSS Score | Expected Response |
|---|---|---|
| **Critical** | 9.0 – 10.0 | Emergency patch within 7 days |
| **High** | 7.0 – 8.9 | Patch within 30 days |
| **Medium** | 4.0 – 6.9 | Patch in next scheduled release |
| **Low** | 0.1 – 3.9 | Patch at maintainer's discretion |

---

## Disclosure Policy

CareerGraph AI follows a **coordinated disclosure** model:

1. Reporter privately submits the vulnerability
2. We acknowledge and assess severity within 48 hours
3. We develop and test a fix
4. We release the patch and credit the reporter (unless anonymity is requested)
5. A public security advisory is published with CVE if applicable

We request a **90-day embargo** before public disclosure to allow time for patching. If we cannot patch within 90 days, we will communicate this and negotiate a disclosure timeline.

---

## Out of Scope

The following are **not** eligible for vulnerability reports:

- Issues in third-party dependencies (report directly to the dependency maintainer)
- Social engineering or phishing attacks targeting project maintainers
- Denial of service via resource exhaustion without code-level exploit
- Vulnerabilities requiring physical access to a device
- Issues in demo/simulated data (the app uses simulated AI responses in frontend mode)
- Self-XSS (requires the user to execute their own malicious code)

---

## Security Controls Summary

CareerGraph AI implements the following security controls:

| Layer | Control | Implementation |
|---|---|---|
| Identity | JWT RS256, 15 min TTL | `src/security/auth/` |
| Identity | MFA (TOTP) | `src/store/useSecurityStore.ts` |
| Identity | RBAC (4 roles) | `src/security/rbac/permissions.ts` |
| Data | AES-256-GCM at rest | Backend S3 + KMS |
| Data | TLS 1.3 in transit | Nginx configuration |
| Data | PII masking (6 types) | `src/security/threat/usePIIDetector.ts` |
| Documents | 13-step threat pipeline | `src/security/threat/useThreatEngine.ts` |
| Documents | ClamAV virus scan | Docker: `clamav` service |
| AI | Prompt injection firewall | `src/security/threat/usePromptFirewall.ts` |
| AI | RAG evidence grounding | Qdrant namespaced retrieval |
| Observability | Structured audit logging (16 fields) | `src/security/audit/useAuditLogger.ts` |
| Infrastructure | Rate limiting (100 req/min) | Redis + slowapi |
| DevSecOps | CI/CD security gates | `.github/workflows/security.yml` |

---

## Acknowledgements

We thank the following researchers for responsibly disclosing vulnerabilities:

*No public acknowledgements yet — be the first!*

---

## References

- [OWASP Top 10 (2021)](https://owasp.org/Top10/)
- [NIST Cybersecurity Framework](https://www.nist.gov/cyberframework)
- [CWE/SANS Top 25 Most Dangerous Software Errors](https://cwe.mitre.org/top25/)
- [CVSS v3.1 Specification](https://www.first.org/cvss/v3.1/specification-document)
- [CareerGraph AI Threat Model](./THREAT_MODEL.md)
