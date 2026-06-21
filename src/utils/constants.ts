/**
 * EcoPulse AI — Application Constants
 * Centralized configuration values used across the application.
 */

/** Application metadata */
export const APP_NAME = 'EcoPulse AI';
export const APP_VERSION = '1.0.0';
export const APP_DESCRIPTION = 'Your AI-powered sustainability coach';

/** Route paths */
export const ROUTES = {
  HOME: '/',
  ASSESSMENT: '/assessment',
  DASHBOARD: '/dashboard',
  CHATBOT: '/coach',
  HABITS: '/habits',
  ACTION_PLAN: '/action-plan',
  ACHIEVEMENTS: '/achievements',
  SETTINGS: '/settings',
} as const;

/** Navigation items for sidebar/navbar */
export const NAV_ITEMS = [
  { path: ROUTES.DASHBOARD, label: 'Dashboard', icon: 'LayoutDashboard' },
  { path: ROUTES.ASSESSMENT, label: 'Assessment', icon: 'ClipboardCheck' },
  { path: ROUTES.CHATBOT, label: 'AI Coach', icon: 'MessageCircle' },
  { path: ROUTES.HABITS, label: 'Habits', icon: 'CheckSquare' },
  { path: ROUTES.ACTION_PLAN, label: 'Action Plan', icon: 'Target' },
  { path: ROUTES.ACHIEVEMENTS, label: 'Achievements', icon: 'Trophy' },
  { path: ROUTES.SETTINGS, label: 'Settings', icon: 'Settings' },
] as const;

/** LocalStorage keys */
export const STORAGE_KEYS = {
  USER_PROFILE: 'ecopulse_user_profile',
  ASSESSMENT_STATE: 'ecopulse_assessment_state',
  CARBON_SCORE: 'ecopulse_carbon_score',
  HABITS: 'ecopulse_habits',
  GAMIFICATION: 'ecopulse_gamification',
  CHAT_HISTORY: 'ecopulse_chat_history',
  THEME: 'ecopulse_theme',
  DATA_VERSION: 'ecopulse_data_version',
} as const;

/** Current data schema version for migration support */
export const CURRENT_DATA_VERSION = 1;

/** Global average annual CO₂e per person (kg) — world average ~4,700 kg */
export const GLOBAL_AVERAGE_CO2E = 4700;

/** National average for India (kg CO₂e/person/year) */
export const NATIONAL_AVERAGE_CO2E = 1900;

/** Carbon score thresholds (kg CO₂e/year) */
export const IMPACT_THRESHOLDS = {
  LOW: 3000,
  MODERATE: 6000,
  // Anything above MODERATE is HIGH
} as const;

/** Sustainability level definitions */
export const SUSTAINABILITY_LEVELS = [
  { level: 1, name: 'Seedling', minPoints: 0, maxPoints: 99, icon: '🌱', color: '#6ee7b7' },
  { level: 2, name: 'Sprout', minPoints: 100, maxPoints: 299, icon: '🌿', color: '#34d399' },
  { level: 3, name: 'Sapling', minPoints: 300, maxPoints: 599, icon: '🌳', color: '#10b981' },
  { level: 4, name: 'Tree', minPoints: 600, maxPoints: 999, icon: '🏔️', color: '#059669' },
  { level: 5, name: 'Forest', minPoints: 1000, maxPoints: 1999, icon: '🌍', color: '#047857' },
  { level: 6, name: 'Ecosystem', minPoints: 2000, maxPoints: 3999, icon: '🦋', color: '#065f46' },
  { level: 7, name: 'Guardian', minPoints: 4000, maxPoints: 7999, icon: '🛡️', color: '#064e3b' },
  { level: 8, name: 'Champion', minPoints: 8000, maxPoints: 14999, icon: '🏆', color: '#022c22' },
  { level: 9, name: 'Legend', minPoints: 15000, maxPoints: 29999, icon: '⭐', color: '#fbbf24' },
  { level: 10, name: 'Earth Hero', minPoints: 30000, maxPoints: Infinity, icon: '🌟', color: '#f59e0b' },
] as const;

/** Chart color palette for emission categories */
export const CATEGORY_COLORS: Record<string, string> = {
  transportation: '#f472b6',
  electricity: '#fbbf24',
  food: '#34d399',
  shopping: '#60a5fa',
  waste: '#a78bfa',
  water: '#22d3ee',
};

/** Category display labels */
export const CATEGORY_LABELS: Record<string, string> = {
  transportation: 'Transportation',
  electricity: 'Electricity',
  food: 'Food & Diet',
  shopping: 'Shopping',
  waste: 'Waste',
  water: 'Water',
};

/** Category icons (Lucide icon names) */
export const CATEGORY_ICONS: Record<string, string> = {
  transportation: 'Car',
  electricity: 'Zap',
  food: 'UtensilsCrossed',
  shopping: 'ShoppingBag',
  waste: 'Trash2',
  water: 'Droplets',
};

/** Points awarded for various actions */
export const POINT_VALUES = {
  COMPLETE_ASSESSMENT: 50,
  COMPLETE_HABIT: 10,
  STREAK_BONUS_7: 25,
  STREAK_BONUS_30: 100,
  COMPLETE_CHALLENGE: 50,
  COMPLETE_ACTION: 30,
  DAILY_LOGIN: 5,
} as const;
