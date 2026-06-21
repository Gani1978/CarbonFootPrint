/**
 * EcoPulse AI — Core Type Definitions
 * All TypeScript interfaces, const enums, and type aliases used across the application.
 */

/* ──────────────────────────── Const Enums ──────────────────────────── */

/** Categories assessed in the carbon footprint questionnaire */
export const AssessmentCategory = {
  Transportation: 'transportation',
  Electricity: 'electricity',
  Food: 'food',
  Shopping: 'shopping',
  Waste: 'waste',
  Water: 'water',
} as const;
export type AssessmentCategory = (typeof AssessmentCategory)[keyof typeof AssessmentCategory];

/** Impact level derived from the total carbon score */
export const ImpactLevel = {
  Low: 'low',
  Moderate: 'moderate',
  High: 'high',
} as const;
export type ImpactLevel = (typeof ImpactLevel)[keyof typeof ImpactLevel];

/** Difficulty level for action plan items */
export const DifficultyLevel = {
  Easy: 'easy',
  Medium: 'medium',
  Hard: 'hard',
} as const;
export type DifficultyLevel = (typeof DifficultyLevel)[keyof typeof DifficultyLevel];

/** Types of achievement badges */
export const BadgeType = {
  Assessment: 'assessment',
  Streak: 'streak',
  Habit: 'habit',
  Challenge: 'challenge',
  Milestone: 'milestone',
  Special: 'special',
} as const;
export type BadgeType = (typeof BadgeType)[keyof typeof BadgeType];

/** Chat message sender */
export const MessageSender = {
  User: 'user',
  AI: 'ai',
  System: 'system',
} as const;
export type MessageSender = (typeof MessageSender)[keyof typeof MessageSender];

/** Theme preference */
export const ThemeMode = {
  Dark: 'dark',
  Light: 'light',
  System: 'system',
} as const;
export type ThemeMode = (typeof ThemeMode)[keyof typeof ThemeMode];

/** Time range for chart display */
export const TimeRange = {
  Week: 'week',
  Month: 'month',
  Quarter: 'quarter',
  Year: 'year',
} as const;
export type TimeRange = (typeof TimeRange)[keyof typeof TimeRange];

/* ──────────────────────────── Assessment ──────────────────────────── */

/** A single option within a question */
export interface QuestionOption {
  id: string;
  label: string;
  value: number;
  /** Emission factor multiplier (kg CO₂e per unit) */
  emissionFactor: number;
}

/** A single assessment question */
export interface AssessmentQuestion {
  id: string;
  category: AssessmentCategory;
  question: string;
  description?: string;
  type: 'single' | 'multiple' | 'slider' | 'number';
  options?: QuestionOption[];
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  /** Default slider/number value */
  defaultValue?: number;
  /** Weight of this question in the total score */
  weight: number;
}

/** A user's answer to a single question */
export interface AssessmentAnswer {
  questionId: string;
  category: AssessmentCategory;
  /** Selected option IDs or numeric value */
  value: string | number | string[];
  /** Calculated CO₂e contribution in kg/year */
  carbonContribution: number;
}

/** State of the entire assessment flow */
export interface AssessmentState {
  currentStep: number;
  currentCategory: AssessmentCategory;
  answers: AssessmentAnswer[];
  isComplete: boolean;
  startedAt: string | null;
  completedAt: string | null;
}

/* ──────────────────────────── Carbon Score ──────────────────────────── */

/** Breakdown of emissions per category */
export interface EmissionBreakdown {
  category: AssessmentCategory;
  amount: number; // kg CO₂e per year
  percentage: number;
  label: string;
  color: string;
  icon: string;
}

/** The user's calculated carbon score */
export interface CarbonScore {
  /** Total annual CO₂e in kg */
  totalAnnual: number;
  /** Total annual CO₂e in tonnes */
  totalTonnes: number;
  /** Impact level classification */
  impactLevel: ImpactLevel;
  /** Score 0-100 (lower = better) */
  score: number;
  /** Per-category breakdown */
  breakdown: EmissionBreakdown[];
  /** National average comparison (%) */
  comparedToAverage: number;
  /** Top contributing factors */
  topFactors: string[];
  /** Date score was calculated */
  calculatedAt: string;
}

/* ──────────────────────────── Dashboard & Trends ──────────────────────────── */

/** A single data point for trend charts */
export interface TrendDataPoint {
  date: string;
  value: number;
  label?: string;
}

/** Weekly/monthly trend data */
export interface TrendData {
  period: TimeRange;
  data: TrendDataPoint[];
  average: number;
  change: number; // percentage change from previous period
  changeDirection: 'up' | 'down' | 'flat';
}

/** Goal tracking status */
export interface GoalProgress {
  id: string;
  title: string;
  target: number;
  current: number;
  unit: string;
  deadline: string;
  isCompleted: boolean;
}

/* ──────────────────────────── AI Chatbot ──────────────────────────── */

/** A single chat message */
export interface ChatMessage {
  id: string;
  sender: MessageSender;
  content: string;
  timestamp: string;
  /** Suggested quick-reply actions */
  suggestions?: string[];
  /** Related action plan reference */
  actionRef?: string;
}

/** Chat session state */
export interface ChatSession {
  messages: ChatMessage[];
  isTyping: boolean;
  context: {
    lastTopic: string;
    userPreferences: string[];
    recentActions: string[];
  };
}

/* ──────────────────────────── Action Plans ──────────────────────────── */

/** A single actionable item in the plan */
export interface ActionItem {
  id: string;
  title: string;
  description: string;
  category: AssessmentCategory;
  difficulty: DifficultyLevel;
  /** Estimated CO₂e savings in kg/year */
  estimatedSavings: number;
  /** Time horizon in weeks */
  timeframe: number;
  isShortTerm: boolean;
  tips: string[];
  isCompleted: boolean;
  completedAt?: string;
}

/** The full personalized action plan */
export interface ActionPlan {
  shortTermGoals: ActionItem[];
  longTermGoals: ActionItem[];
  totalEstimatedSavings: number;
  generatedAt: string;
}

/* ──────────────────────────── Habit Tracker ──────────────────────────── */

/** A tracked eco-friendly habit */
export interface Habit {
  id: string;
  title: string;
  description: string;
  category: AssessmentCategory;
  icon: string;
  /** CO₂e saved per completion (kg) */
  carbonSavingsPerAction: number;
  /** Whether it was completed today */
  isCompletedToday: boolean;
  /** Current streak count */
  streak: number;
  /** Longest streak ever */
  bestStreak: number;
  /** Total completions */
  totalCompletions: number;
  /** Completion history (ISO date strings) */
  completionHistory: string[];
  createdAt: string;
}

/** Daily habit log entry */
export interface HabitLogEntry {
  date: string;
  habitsCompleted: string[]; // habit IDs
  totalSavings: number;
}

/* ──────────────────────────── Gamification ──────────────────────────── */

/** An achievement badge */
export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  type: BadgeType;
  /** Criteria to unlock */
  criteria: string;
  /** Whether the user has earned it */
  isUnlocked: boolean;
  unlockedAt?: string;
  /** Eco-points reward for unlocking */
  pointsReward: number;
}

/** A weekly challenge */
export interface Challenge {
  id: string;
  title: string;
  description: string;
  category: AssessmentCategory;
  /** Required completions to finish */
  target: number;
  /** Current progress */
  progress: number;
  /** Eco-points reward */
  pointsReward: number;
  /** Start and end dates (ISO) */
  startDate: string;
  endDate: string;
  isActive: boolean;
  isCompleted: boolean;
}

/** Sustainability level definition */
export interface SustainabilityLevel {
  level: number;
  name: string;
  minPoints: number;
  maxPoints: number;
  icon: string;
  color: string;
}

/** Full gamification state */
export interface GamificationState {
  ecoPoints: number;
  currentLevel: SustainabilityLevel;
  badges: Badge[];
  activeChallenges: Challenge[];
  completedChallenges: string[]; // challenge IDs
  totalCarbonSaved: number; // lifetime kg CO₂e saved
}

/* ──────────────────────────── User Profile ──────────────────────────── */

/** User profile stored locally */
export interface UserProfile {
  id: string;
  name: string;
  email?: string;
  avatarInitial: string;
  joinedAt: string;
  hasCompletedAssessment: boolean;
  hasCompletedOnboarding: boolean;
  theme: ThemeMode;
}

/* ──────────────────────────── Recommendations ──────────────────────────── */

/** A generated recommendation */
export interface Recommendation {
  id: string;
  category: AssessmentCategory;
  title: string;
  description: string;
  impact: 'low' | 'medium' | 'high';
  /** Estimated annual CO₂e savings (kg) */
  estimatedSavings: number;
  /** Conditions that trigger this recommendation */
  triggerConditions: string[];
  alternatives: string[];
}

/* ──────────────────────────── App State ──────────────────────────── */

/** Root application state */
export interface AppState {
  user: UserProfile | null;
  carbonScore: CarbonScore | null;
  isLoading: boolean;
  error: string | null;
}

/** Action types for app reducer */
export type AppAction =
  | { type: 'SET_USER'; payload: UserProfile }
  | { type: 'SET_CARBON_SCORE'; payload: CarbonScore }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'RESET' };

/** Assessment reducer actions */
export type AssessmentAction =
  | { type: 'SET_STEP'; payload: number }
  | { type: 'SET_CATEGORY'; payload: AssessmentCategory }
  | { type: 'ADD_ANSWER'; payload: AssessmentAnswer }
  | { type: 'UPDATE_ANSWER'; payload: AssessmentAnswer }
  | { type: 'COMPLETE_ASSESSMENT' }
  | { type: 'RESET_ASSESSMENT' };

/** Habit reducer actions */
export type HabitAction =
  | { type: 'ADD_HABIT'; payload: Habit }
  | { type: 'COMPLETE_HABIT'; payload: string }
  | { type: 'SKIP_HABIT'; payload: string }
  | { type: 'RESET_DAILY' }
  | { type: 'REMOVE_HABIT'; payload: string }
  | { type: 'LOAD_HABITS'; payload: Habit[] };

/** Gamification reducer actions */
export type GamificationAction =
  | { type: 'ADD_POINTS'; payload: number }
  | { type: 'UNLOCK_BADGE'; payload: string }
  | { type: 'START_CHALLENGE'; payload: Challenge }
  | { type: 'UPDATE_CHALLENGE_PROGRESS'; payload: { id: string; progress: number } }
  | { type: 'COMPLETE_CHALLENGE'; payload: string }
  | { type: 'SET_LEVEL'; payload: SustainabilityLevel }
  | { type: 'ADD_CARBON_SAVED'; payload: number }
  | { type: 'LOAD_STATE'; payload: Partial<GamificationState> };
