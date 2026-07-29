/**
 * PII Detection & Masking Engine
 *
 * Scans extracted document text and masks sensitive identifiers
 * before any content reaches the AI ingestion pipeline.
 *
 * Patterns cover Indian PII (Aadhaar, PAN, Passport) and universal
 * identifiers (email, phone, bank account numbers).
 *
 * This runs CLIENT-SIDE as a first-pass filter.
 * The backend FastAPI /api/v1/ocr/extract also applies server-side masking
 * using Microsoft Presidio before storing to PostgreSQL or passing to Qdrant.
 */

export interface PIIMatch {
  type: string;
  raw: string;
  masked: string;
  startIndex: number;
  endIndex: number;
}

export interface PIIScanResult {
  containsPII: boolean;
  matches: PIIMatch[];
  sanitizedText: string;
  riskLevel: 'none' | 'low' | 'medium' | 'high';
}

const PII_PATTERNS: Array<{ type: string; pattern: RegExp; maskFn: (match: string) => string }> = [
  {
    type: 'Aadhaar Number',
    pattern: /\b[2-9]\d{3}\s?\d{4}\s?\d{4}\b/g,
    maskFn: (m) => m.slice(0, 4) + ' XXXX ' + m.slice(-4),
  },
  {
    type: 'PAN Number',
    pattern: /\b[A-Z]{5}[0-9]{4}[A-Z]\b/g,
    maskFn: (m) => m.slice(0, 2) + 'XXX' + m.slice(-3),
  },
  {
    type: 'Indian Passport',
    pattern: /\b[A-PR-WYa-pr-wy][1-9]\d\s?\d{4}[1-9]\b/g,
    maskFn: (m) => m.slice(0, 1) + 'XXXXXX',
  },
  {
    type: 'Email Address',
    pattern: /\b[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Z|a-z]{2,}\b/g,
    maskFn: (m) => {
      const [local, domain] = m.split('@');
      return local.slice(0, 2) + '***@' + domain;
    },
  },
  {
    type: 'Indian Phone Number',
    pattern: /\b(?:\+91[\s\-]?)?[6-9]\d{9}\b/g,
    maskFn: (m) => m.slice(0, 3) + 'XXXXXXX' + m.slice(-2),
  },
  {
    type: 'Bank Account Number',
    pattern: /\b\d{9,18}\b/g,
    maskFn: (m) => 'XXXX' + m.slice(-4),
  },
];

/**
 * Scan text for PII and return masked version + match metadata.
 * Safe to call on extracted OCR text before AI processing.
 */
export function scanAndMaskPII(text: string): PIIScanResult {
  const matches: PIIMatch[] = [];
  let sanitized = text;
  let offset = 0;

  for (const { type, pattern, maskFn } of PII_PATTERNS) {
    pattern.lastIndex = 0;
    let match: RegExpExecArray | null;
    while ((match = pattern.exec(text)) !== null) {
      const raw = match[0];
      const masked = maskFn(raw);
      matches.push({
        type,
        raw,
        masked,
        startIndex: match.index,
        endIndex: match.index + raw.length,
      });
    }
  }

  // Apply masking to sanitized copy
  for (const { type, pattern, maskFn } of PII_PATTERNS) {
    pattern.lastIndex = 0;
    sanitized = sanitized.replace(pattern, maskFn);
  }

  const riskLevel =
    matches.length === 0 ? 'none' :
    matches.length <= 2 ? 'low' :
    matches.length <= 5 ? 'medium' : 'high';

  return {
    containsPII: matches.length > 0,
    matches,
    sanitizedText: sanitized,
    riskLevel,
  };
}
