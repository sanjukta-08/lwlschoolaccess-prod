// Strong email validation: syntax + common typo detection (gmial.com, yahooo.com, etc.)

const EMAIL_RE = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Common domain typos -> suggested correct domain
const DOMAIN_TYPOS: Record<string, string> = {
  // gmail
  'gmial.com': 'gmail.com', 'gmai.com': 'gmail.com', 'gnail.com': 'gmail.com',
  'gmail.co': 'gmail.com', 'gmail.cm': 'gmail.com', 'gmaill.com': 'gmail.com',
  'gmial.co': 'gmail.com', 'gmali.com': 'gmail.com', 'gamil.com': 'gmail.com',
  'gmsil.com': 'gmail.com', 'gmail.con': 'gmail.com', 'gmail.om': 'gmail.com',
  'gmail.cim': 'gmail.com', 'gmail.comm': 'gmail.com', 'gmail.in': 'gmail.com',
  // yahoo
  'yahooo.com': 'yahoo.com', 'yaho.com': 'yahoo.com', 'yahoo.cm': 'yahoo.com',
  'yahoo.co': 'yahoo.com', 'yahoo.con': 'yahoo.com', 'yhaoo.com': 'yahoo.com',
  'yahoo.comm': 'yahoo.com', 'ymail.co': 'ymail.com',
  // hotmail
  'hotmial.com': 'hotmail.com', 'hotmai.com': 'hotmail.com', 'hotamil.com': 'hotmail.com',
  'hotmail.co': 'hotmail.com', 'hotmail.cm': 'hotmail.com', 'hotmail.con': 'hotmail.com',
  'hitmail.com': 'hotmail.com', 'hotmaill.com': 'hotmail.com',
  // outlook
  'outlok.com': 'outlook.com', 'outloook.com': 'outlook.com', 'outlook.co': 'outlook.com',
  'outlook.cm': 'outlook.com', 'outlook.con': 'outlook.com',
  // icloud
  'iclod.com': 'icloud.com', 'icloud.co': 'icloud.com', 'icloud.cm': 'icloud.com',
  // others
  'rediffmial.com': 'rediffmail.com', 'redifmail.com': 'rediffmail.com',
  'live.co': 'live.com', 'live.con': 'live.com',
  'protnmail.com': 'protonmail.com', 'protonmail.co': 'protonmail.com',
};

export interface EmailValidationResult {
  ok: boolean;
  error?: string;
  suggestion?: string; // suggested corrected email if a typo was detected
}

export function validateEmail(input: string): EmailValidationResult {
  const email = (input || '').trim();
  if (!email) return { ok: false, error: 'Email is required' };
  if (!EMAIL_RE.test(email)) return { ok: false, error: 'Please enter a valid email address' };

  const at = email.lastIndexOf('@');
  const local = email.slice(0, at);
  const domain = email.slice(at + 1).toLowerCase();

  if (local.length > 64) return { ok: false, error: 'Email is too long' };
  if (domain.length > 255) return { ok: false, error: 'Email is too long' };
  if (email.includes('..')) return { ok: false, error: 'Email cannot contain consecutive dots' };
  if (local.startsWith('.') || local.endsWith('.')) return { ok: false, error: 'Invalid email format' };

  const suggested = DOMAIN_TYPOS[domain];
  if (suggested) {
    return {
      ok: false,
      error: `Did you mean ${local}@${suggested}?`,
      suggestion: `${local}@${suggested}`,
    };
  }

  // TLD sanity (no .con, .cm, .om for unknown domains)
  const tld = domain.split('.').pop() || '';
  const badTlds = ['con', 'cim', 'cm', 'om', 'comm'];
  if (badTlds.includes(tld)) {
    const fixed = domain.replace(/\.(con|cim|cm|om|comm)$/, '.com');
    return {
      ok: false,
      error: `Did you mean ${local}@${fixed}?`,
      suggestion: `${local}@${fixed}`,
    };
  }

  return { ok: true };
}

// Backward-compatible boolean check used by existing call sites.
export function isValidEmail(email: string): boolean {
  return validateEmail(email).ok;
}
