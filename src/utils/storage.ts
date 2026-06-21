/**
 * EcoPulse AI — Secure LocalStorage Utilities
 * Type-safe localStorage wrapper with error handling, versioning,
 * and data integrity checks.
 */

import { STORAGE_KEYS, CURRENT_DATA_VERSION } from './constants';

/**
 * Safely retrieve and parse a value from localStorage.
 * Returns `defaultValue` if the key doesn't exist or parsing fails.
 */
export function getStorageItem<T>(key: string, defaultValue: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return defaultValue;
    return JSON.parse(raw) as T;
  } catch (error) {
    console.warn(`[Storage] Failed to read key "${key}":`, error);
    return defaultValue;
  }
}

/**
 * Safely serialize and store a value in localStorage.
 */
export function setStorageItem<T>(key: string, value: T): boolean {
  try {
    const serialized = JSON.stringify(value);
    localStorage.setItem(key, serialized);
    return true;
  } catch (error) {
    console.warn(`[Storage] Failed to write key "${key}":`, error);
    return false;
  }
}

/**
 * Remove an item from localStorage.
 */
export function removeStorageItem(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.warn(`[Storage] Failed to remove key "${key}":`, error);
  }
}

/**
 * Clear all EcoPulse data from localStorage.
 */
export function clearAllStorage(): void {
  Object.values(STORAGE_KEYS).forEach((key) => {
    removeStorageItem(key);
  });
}

/**
 * Check and perform data migration if the stored schema version
 * is older than the current version.
 */
export function checkDataVersion(): void {
  const storedVersion = getStorageItem<number>(STORAGE_KEYS.DATA_VERSION, 0);

  if (storedVersion < CURRENT_DATA_VERSION) {
    // Future: add migration logic here per version bump
    // For v1, just stamp the version
    setStorageItem(STORAGE_KEYS.DATA_VERSION, CURRENT_DATA_VERSION);
  }
}

/**
 * Get the total size of EcoPulse data in localStorage (bytes).
 * Useful for monitoring storage usage.
 */
export function getStorageSize(): number {
  let total = 0;
  Object.values(STORAGE_KEYS).forEach((key) => {
    const item = localStorage.getItem(key);
    if (item) {
      total += key.length + item.length;
    }
  });
  return total * 2; // UTF-16 = 2 bytes per character
}

/**
 * Export all EcoPulse data as a JSON blob (for backup).
 */
export function exportData(): string {
  const data: Record<string, unknown> = {};
  Object.entries(STORAGE_KEYS).forEach(([label, key]) => {
    data[label] = getStorageItem(key, null);
  });
  data['_exportedAt'] = new Date().toISOString();
  data['_version'] = CURRENT_DATA_VERSION;
  return JSON.stringify(data, null, 2);
}

/**
 * Import data from a JSON backup string.
 * Returns true if successful, false otherwise.
 */
export function importData(jsonString: string): boolean {
  try {
    const data = JSON.parse(jsonString) as Record<string, unknown>;
    Object.entries(STORAGE_KEYS).forEach(([label, key]) => {
      if (data[label] !== undefined && data[label] !== null) {
        setStorageItem(key, data[label]);
      }
    });
    return true;
  } catch (error) {
    console.error('[Storage] Import failed:', error);
    return false;
  }
}
