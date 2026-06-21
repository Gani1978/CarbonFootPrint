/**
 * EcoPulse AI — Input Validation & Sanitization Utilities
 * Provides secure input handling to prevent XSS and ensure data integrity.
 */

/**
 * Sanitize a string by escaping HTML special characters.
 * Prevents XSS when displaying user-generated content.
 */
export function sanitizeHTML(input: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
  };
  return input.replace(/[&<>"'/]/g, (char) => map[char] || char);
}

/**
 * Validate that a number falls within a given range (inclusive).
 */
export function validateNumberRange(
  value: number,
  min: number,
  max: number
): { isValid: boolean; error?: string } {
  if (typeof value !== 'number' || isNaN(value)) {
    return { isValid: false, error: 'Value must be a valid number.' };
  }
  if (value < min || value > max) {
    return { isValid: false, error: `Value must be between ${min} and ${max}.` };
  }
  return { isValid: true };
}

/**
 * Validate a name field (1-50 characters, letters/spaces/hyphens only).
 */
export function validateName(name: string): { isValid: boolean; error?: string } {
  const trimmed = name.trim();
  if (trimmed.length === 0) {
    return { isValid: false, error: 'Name is required.' };
  }
  if (trimmed.length > 50) {
    return { isValid: false, error: 'Name must be 50 characters or fewer.' };
  }
  if (!/^[a-zA-Z\s\-']+$/.test(trimmed)) {
    return { isValid: false, error: 'Name may only contain letters, spaces, hyphens, and apostrophes.' };
  }
  return { isValid: true };
}

/**
 * Validate an email address format.
 */
export function validateEmail(email: string): { isValid: boolean; error?: string } {
  const trimmed = email.trim();
  if (trimmed.length === 0) {
    return { isValid: true }; // email is optional
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmed)) {
    return { isValid: false, error: 'Please enter a valid email address.' };
  }
  if (trimmed.length > 100) {
    return { isValid: false, error: 'Email must be 100 characters or fewer.' };
  }
  return { isValid: true };
}

/**
 * Sanitize and validate chat message input.
 * Limits length and strips potentially harmful content.
 */
export function validateChatMessage(message: string): {
  isValid: boolean;
  sanitized: string;
  error?: string;
} {
  const trimmed = message.trim();
  if (trimmed.length === 0) {
    return { isValid: false, sanitized: '', error: 'Message cannot be empty.' };
  }
  if (trimmed.length > 500) {
    return { isValid: false, sanitized: '', error: 'Message must be 500 characters or fewer.' };
  }
  return { isValid: true, sanitized: sanitizeHTML(trimmed) };
}

/**
 * Validate a positive integer (for numeric inputs like kWh, km, etc.).
 */
export function validatePositiveNumber(value: unknown): {
  isValid: boolean;
  parsed: number;
  error?: string;
} {
  const num = Number(value);
  if (isNaN(num)) {
    return { isValid: false, parsed: 0, error: 'Please enter a valid number.' };
  }
  if (num < 0) {
    return { isValid: false, parsed: 0, error: 'Value must be positive.' };
  }
  return { isValid: true, parsed: num };
}

/**
 * Create a debounced version of a function.
 * Useful for search inputs and auto-save.
 */
export function debounce<T extends (...args: unknown[]) => void>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}
