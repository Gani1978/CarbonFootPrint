/**
 * EcoPulse AI — App Context
 * Global application state management for user profile, carbon score, and theme.
 */

import React, { createContext, useContext, useReducer, useEffect, type ReactNode } from 'react';
import type { AppState, AppAction, UserProfile, CarbonScore } from '../types';
import { getStorageItem, setStorageItem, checkDataVersion } from '../utils/storage';
import { STORAGE_KEYS } from '../utils/constants';

const initialState: AppState = {
  user: null,
  carbonScore: null,
  isLoading: true,
  error: null,
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload, isLoading: false };
    case 'SET_CARBON_SCORE':
      return { ...state, carbonScore: action.payload };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'RESET':
      return { ...initialState, isLoading: false };
    default:
      return state;
  }
}

interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  /** Update user profile and persist */
  updateUser: (user: UserProfile) => void;
  /** Update carbon score and persist */
  updateCarbonScore: (score: CarbonScore) => void;
  /** Reset all app data */
  resetApp: () => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load persisted data on mount
  useEffect(() => {
    checkDataVersion();
    const savedUser = getStorageItem<UserProfile | null>(STORAGE_KEYS.USER_PROFILE, null);
    const savedScore = getStorageItem<CarbonScore | null>(STORAGE_KEYS.CARBON_SCORE, null);

    if (savedUser) {
      dispatch({ type: 'SET_USER', payload: savedUser });
    } else {
      dispatch({ type: 'SET_LOADING', payload: false });
    }

    if (savedScore) {
      dispatch({ type: 'SET_CARBON_SCORE', payload: savedScore });
    }
  }, []);

  const updateUser = (user: UserProfile) => {
    dispatch({ type: 'SET_USER', payload: user });
    setStorageItem(STORAGE_KEYS.USER_PROFILE, user);
  };

  const updateCarbonScore = (score: CarbonScore) => {
    dispatch({ type: 'SET_CARBON_SCORE', payload: score });
    setStorageItem(STORAGE_KEYS.CARBON_SCORE, score);
  };

  const resetApp = () => {
    dispatch({ type: 'RESET' });
    Object.values(STORAGE_KEYS).forEach((key) => localStorage.removeItem(key));
  };

  return (
    <AppContext.Provider value={{ state, dispatch, updateUser, updateCarbonScore, resetApp }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp(): AppContextType {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
