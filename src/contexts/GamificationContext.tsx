/**
 * EcoPulse AI — Gamification Context
 * Manages eco-points, badges, challenges, levels, and carbon saved.
 */

import React, { createContext, useContext, useReducer, useEffect, type ReactNode } from 'react';
import type { GamificationState, GamificationAction, Badge, Challenge, SustainabilityLevel } from '../types';
import { getStorageItem, setStorageItem } from '../utils/storage';
import { STORAGE_KEYS, SUSTAINABILITY_LEVELS } from '../utils/constants';
import { badgeDefinitions } from '../data/badges';
import { getRandomChallenges, activateChallenge } from '../data/challenges';

function getLevel(points: number): SustainabilityLevel {
  const levels = [...SUSTAINABILITY_LEVELS];
  for (let i = levels.length - 1; i >= 0; i--) {
    if (points >= levels[i].minPoints) {
      return levels[i] as unknown as SustainabilityLevel;
    }
  }
  return levels[0] as unknown as SustainabilityLevel;
}



function gamificationReducer(
  state: GamificationState,
  action: GamificationAction
): GamificationState {
  switch (action.type) {
    case 'ADD_POINTS': {
      const newPoints = state.ecoPoints + action.payload;
      return {
        ...state,
        ecoPoints: newPoints,
        currentLevel: getLevel(newPoints),
      };
    }

    case 'UNLOCK_BADGE':
      return {
        ...state,
        badges: state.badges.map((b) =>
          b.id === action.payload
            ? { ...b, isUnlocked: true, unlockedAt: new Date().toISOString() }
            : b
        ),
      };

    case 'START_CHALLENGE':
      return {
        ...state,
        activeChallenges: [...state.activeChallenges, action.payload],
      };

    case 'UPDATE_CHALLENGE_PROGRESS':
      return {
        ...state,
        activeChallenges: state.activeChallenges.map((c) =>
          c.id === action.payload.id
            ? { ...c, progress: action.payload.progress }
            : c
        ),
      };

    case 'COMPLETE_CHALLENGE':
      return {
        ...state,
        activeChallenges: state.activeChallenges.filter((c) => c.id !== action.payload),
        completedChallenges: [...state.completedChallenges, action.payload],
      };

    case 'SET_LEVEL':
      return { ...state, currentLevel: action.payload };

    case 'ADD_CARBON_SAVED':
      return {
        ...state,
        totalCarbonSaved: state.totalCarbonSaved + action.payload,
      };

    case 'LOAD_STATE':
      return { ...state, ...action.payload };

    default:
      return state;
  }
}

interface GamificationContextType {
  state: GamificationState;
  dispatch: React.Dispatch<GamificationAction>;
  addPoints: (points: number) => void;
  unlockBadge: (badgeId: string) => void;
  startNewChallenges: () => void;
  updateChallengeProgress: (challengeId: string, progress: number) => void;
  completeChallenge: (challengeId: string) => void;
  addCarbonSaved: (kg: number) => void;
  getUnlockedBadges: () => Badge[];
  getLockedBadges: () => Badge[];
  getProgressToNextLevel: () => number;
}

const getInitialState = (): GamificationState => {
  const saved = getStorageItem<Partial<GamificationState> | null>(STORAGE_KEYS.GAMIFICATION, null);
  if (saved) {
    const mergedBadges = badgeDefinitions.map((def) => {
      const savedBadge = saved.badges?.find((b) => b.id === def.id);
      return savedBadge ? { ...def, ...savedBadge } : def;
    });
    const points = saved.ecoPoints ?? 0;
    return {
      ecoPoints: points,
      currentLevel: getLevel(points),
      badges: mergedBadges,
      activeChallenges: saved.activeChallenges ?? [],
      completedChallenges: saved.completedChallenges ?? [],
      totalCarbonSaved: saved.totalCarbonSaved ?? 0,
    };
  }
  return {
    ecoPoints: 0,
    currentLevel: getLevel(0),
    badges: [...badgeDefinitions],
    activeChallenges: [],
    completedChallenges: [],
    totalCarbonSaved: 0,
  };
};

const GamificationContext = createContext<GamificationContextType | null>(null);

export function GamificationProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(gamificationReducer, null, getInitialState);

  // Persist state
  useEffect(() => {
    setStorageItem(STORAGE_KEYS.GAMIFICATION, state);
  }, [state]);

  const addPoints = (points: number) => {
    dispatch({ type: 'ADD_POINTS', payload: points });
  };

  const unlockBadge = (badgeId: string) => {
    const badge = state.badges.find((b) => b.id === badgeId);
    if (badge && !badge.isUnlocked) {
      dispatch({ type: 'UNLOCK_BADGE', payload: badgeId });
      dispatch({ type: 'ADD_POINTS', payload: badge.pointsReward });
    }
  };

  const startNewChallenges = () => {
    const templates = getRandomChallenges(3);
    templates.forEach((template) => {
      const challenge = activateChallenge(template) as Challenge;
      dispatch({ type: 'START_CHALLENGE', payload: challenge });
    });
  };

  const updateChallengeProgress = (challengeId: string, progress: number) => {
    const challenge = state.activeChallenges.find((c) => c.id === challengeId);
    if (challenge) {
      dispatch({ type: 'UPDATE_CHALLENGE_PROGRESS', payload: { id: challengeId, progress } });
      if (progress >= challenge.target) {
        completeChallenge(challengeId);
      }
    }
  };

  const completeChallenge = (challengeId: string) => {
    const challenge = state.activeChallenges.find((c) => c.id === challengeId);
    if (challenge) {
      dispatch({ type: 'COMPLETE_CHALLENGE', payload: challengeId });
      dispatch({ type: 'ADD_POINTS', payload: challenge.pointsReward });
    }
  };

  const addCarbonSaved = (kg: number) => {
    dispatch({ type: 'ADD_CARBON_SAVED', payload: kg });
  };

  const getUnlockedBadges = () => state.badges.filter((b) => b.isUnlocked);
  const getLockedBadges = () => state.badges.filter((b) => !b.isUnlocked);

  const getProgressToNextLevel = () => {
    const current = state.currentLevel;
    const range = current.maxPoints - current.minPoints;
    if (range === Infinity || range <= 0) return 100;
    const progress = ((state.ecoPoints - current.minPoints) / range) * 100;
    return Math.min(100, Math.max(0, progress));
  };

  return (
    <GamificationContext.Provider
      value={{
        state,
        dispatch,
        addPoints,
        unlockBadge,
        startNewChallenges,
        updateChallengeProgress,
        completeChallenge,
        addCarbonSaved,
        getUnlockedBadges,
        getLockedBadges,
        getProgressToNextLevel,
      }}
    >
      {children}
    </GamificationContext.Provider>
  );
}

export function useGamification(): GamificationContextType {
  const context = useContext(GamificationContext);
  if (!context) {
    throw new Error('useGamification must be used within a GamificationProvider');
  }
  return context;
}
