/**
 * EcoPulse AI — Formatting Utilities
 * Human-readable number, date, and unit formatting functions.
 */

/**
 * Format CO₂e value with appropriate unit (kg or tonnes).
 * @param kg - Amount in kilograms CO₂e
 * @param decimals - Number of decimal places
 */
export function formatCO2(kg: number, decimals: number = 1): string {
  if (kg >= 1000) {
    return `${(kg / 1000).toFixed(decimals)} t CO₂e`;
  }
  return `${kg.toFixed(decimals)} kg CO₂e`;
}

/**
 * Format a number with thousand separators.
 */
export function formatNumber(value: number, decimals: number = 0): string {
  return new Intl.NumberFormat('en-IN', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

/**
 * Format a number as a percentage.
 */
export function formatPercentage(value: number, decimals: number = 0): string {
  return `${value.toFixed(decimals)}%`;
}

/**
 * Format an ISO date string to a human-readable format.
 */
export function formatDate(isoString: string, format: 'short' | 'long' | 'relative' = 'short'): string {
  const date = new Date(isoString);

  if (format === 'relative') {
    return formatRelativeDate(date);
  }

  const options: Intl.DateTimeFormatOptions =
    format === 'long'
      ? { year: 'numeric', month: 'long', day: 'numeric' }
      : { year: 'numeric', month: 'short', day: 'numeric' };

  return new Intl.DateTimeFormat('en-IN', options).format(date);
}

/**
 * Format a date as a relative time string (e.g., "2 hours ago").
 */
function formatRelativeDate(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSecs < 60) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
  return `${Math.floor(diffDays / 30)}mo ago`;
}

/**
 * Format time of day from ISO string (e.g., "2:30 PM").
 */
export function formatTime(isoString: string): string {
  const date = new Date(isoString);
  return new Intl.DateTimeFormat('en-IN', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(date);
}

/**
 * Get a greeting based on the time of day.
 */
export function getTimeGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

/**
 * Format a duration in days to a human-readable string.
 */
export function formatDuration(days: number): string {
  if (days < 7) return `${days} day${days !== 1 ? 's' : ''}`;
  if (days < 30) {
    const weeks = Math.floor(days / 7);
    return `${weeks} week${weeks !== 1 ? 's' : ''}`;
  }
  const months = Math.floor(days / 30);
  return `${months} month${months !== 1 ? 's' : ''}`;
}

/**
 * Get ordinal suffix for a number (1st, 2nd, 3rd, etc.).
 */
export function ordinal(n: number): string {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}
