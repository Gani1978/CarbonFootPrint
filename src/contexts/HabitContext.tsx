/**
 * EcoPulse AI — Habit Context
 * State management for daily eco-friendly habit tracking.
 */

import React, { createContext, useContext, useReducer, useEffect, type ReactNode } from 'react';
import type { Habit, HabitAction } from '../types';
import { AssessmentCategory } from '../types';
import { getStorageItem, setStorageItem } from '../utils/storage';
import { STORAGE_KEYS } from '../utils/constants';

/** Default habits offered to new users */
const defaultHabits: Habit[] = [
  {
    id: 'habit-reusable-bottle',
    title: 'Use reusable water bottle',
    description: 'Carry and use your reusable bottle instead of buying plastic.',
    category: AssessmentCategory.Waste,
    icon: '🍶',
    carbonSavingsPerAction: 0.08,
    isCompletedToday: false,
    streak: 0,
    bestStreak: 0,
    totalCompletions: 0,
    completionHistory: [],
    createdAt: new Date().toISOString(),
  },
  {
    id: 'habit-public-transport',
    title: 'Use public transport',
    description: 'Take the bus, metro, or train instead of driving.',
    category: AssessmentCategory.Transportation,
    icon: '🚌',
    carbonSavingsPerAction: 3.5,
    isCompletedToday: false,
    streak: 0,
    bestStreak: 0,
    totalCompletions: 0,
    completionHistory: [],
    createdAt: new Date().toISOString(),
  },
  {
    id: 'habit-vegetarian-meal',
    title: 'Eat a vegetarian meal',
    description: 'Replace one meal with a fully plant-based option.',
    category: AssessmentCategory.Food,
    icon: '🥗',
    carbonSavingsPerAction: 2.5,
    isCompletedToday: false,
    streak: 0,
    bestStreak: 0,
    totalCompletions: 0,
    completionHistory: [],
    createdAt: new Date().toISOString(),
  },
  {
    id: 'habit-lights-off',
    title: 'Turn off unused lights',
    description: 'Switch off all lights and electronics when leaving a room.',
    category: AssessmentCategory.Electricity,
    icon: '💡',
    carbonSavingsPerAction: 0.5,
    isCompletedToday: false,
    streak: 0,
    bestStreak: 0,
    totalCompletions: 0,
    completionHistory: [],
    createdAt: new Date().toISOString(),
  },
  {
    id: 'habit-short-shower',
    title: 'Take a 5-minute shower',
    description: 'Keep your shower under 5 minutes to save water and energy.',
    category: AssessmentCategory.Water,
    icon: '🚿',
    carbonSavingsPerAction: 1.0,
    isCompletedToday: false,
    streak: 0,
    bestStreak: 0,
    totalCompletions: 0,
    completionHistory: [],
    createdAt: new Date().toISOString(),
  },
  {
    id: 'habit-no-plastic-bag',
    title: 'Refuse plastic bags',
    description: 'Use your own bag when shopping — refuse single-use plastic bags.',
    category: AssessmentCategory.Shopping,
    icon: '🛍️',
    carbonSavingsPerAction: 0.03,
    isCompletedToday: false,
    streak: 0,
    bestStreak: 0,
    totalCompletions: 0,
    completionHistory: [],
    createdAt: new Date().toISOString(),
  },
];

interface HabitState {
  habits: Habit[];
}

function habitReducer(state: HabitState, action: HabitAction): HabitState {
  switch (action.type) {
    case 'ADD_HABIT':
      return { habits: [...state.habits, action.payload] };

    case 'COMPLETE_HABIT': {
      const today = new Date().toISOString().split('T')[0];
      return {
        habits: state.habits.map((h) => {
          if (h.id !== action.payload) return h;
          const alreadyToday = h.completionHistory.some((d) => d.startsWith(today));
          if (alreadyToday) return h;
          const newHistory = [...h.completionHistory, new Date().toISOString()];
          const newStreak = h.streak + 1;
          return {
            ...h,
            isCompletedToday: true,
            streak: newStreak,
            bestStreak: Math.max(h.bestStreak, newStreak),
            totalCompletions: h.totalCompletions + 1,
            completionHistory: newHistory,
          };
        }),
      };
    }

    case 'SKIP_HABIT':
      return {
        habits: state.habits.map((h) =>
          h.id === action.payload ? { ...h, streak: 0 } : h
        ),
      };

    case 'RESET_DAILY':
      return {
        habits: state.habits.map((h) => ({ ...h, isCompletedToday: false })),
      };

    case 'REMOVE_HABIT':
      return {
        habits: state.habits.filter((h) => h.id !== action.payload),
      };

    case 'LOAD_HABITS':
      return { habits: action.payload };

    default:
      return state;
  }
}

interface HabitContextType {
  habits: Habit[];
  dispatch: React.Dispatch<HabitAction>;
  completeHabit: (habitId: string) => void;
  skipHabit: (habitId: string) => void;
  addHabit: (habit: Habit) => void;
  removeHabit: (habitId: string) => void;
  getTodayCompletedCount: () => number;
  getTotalSavingsToday: () => number;
}

const HabitContext = createContext<HabitContextType | null>(null);

export function HabitProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(habitReducer, { habits: [] });

  // Load saved habits or use defaults
  useEffect(() => {
    const saved = getStorageItem<Habit[] | null>(STORAGE_KEYS.HABITS, null);
    if (saved && saved.length > 0) {
      // Reset "completed today" if it's a new day
      const today = new Date().toISOString().split('T')[0];
      const resetHabits = saved.map((h) => {
        const lastCompletion = h.completionHistory[h.completionHistory.length - 1];
        const completedToday = lastCompletion?.startsWith(today) ?? false;
        return { ...h, isCompletedToday: completedToday };
      });
      dispatch({ type: 'LOAD_HABITS', payload: resetHabits });
    } else {
      dispatch({ type: 'LOAD_HABITS', payload: defaultHabits });
    }
  }, []);

  // Persist on changes
  useEffect(() => {
    if (state.habits.length > 0) {
      setStorageItem(STORAGE_KEYS.HABITS, state.habits);
    }
  }, [state.habits]);

  const completeHabit = (habitId: string) => {
    dispatch({ type: 'COMPLETE_HABIT', payload: habitId });
  };

  const skipHabit = (habitId: string) => {
    dispatch({ type: 'SKIP_HABIT', payload: habitId });
  };

  const addHabit = (habit: Habit) => {
    dispatch({ type: 'ADD_HABIT', payload: habit });
  };

  const removeHabit = (habitId: string) => {
    dispatch({ type: 'REMOVE_HABIT', payload: habitId });
  };

  const getTodayCompletedCount = () => {
    return state.habits.filter((h) => h.isCompletedToday).length;
  };

  const getTotalSavingsToday = () => {
    return state.habits
      .filter((h) => h.isCompletedToday)
      .reduce((sum, h) => sum + h.carbonSavingsPerAction, 0);
  };

  return (
    <HabitContext.Provider
      value={{
        habits: state.habits,
        dispatch,
        completeHabit,
        skipHabit,
        addHabit,
        removeHabit,
        getTodayCompletedCount,
        getTotalSavingsToday,
      }}
    >
      {children}
    </HabitContext.Provider>
  );
}

export function useHabits(): HabitContextType {
  const context = useContext(HabitContext);
  if (!context) {
    throw new Error('useHabits must be used within a HabitProvider');
  }
  return context;
}
