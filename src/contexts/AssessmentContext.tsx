/**
 * EcoPulse AI — Assessment Context
 * Manages the multi-step carbon assessment questionnaire state.
 */

import React, { createContext, useContext, useReducer, useEffect, type ReactNode } from 'react';
import type { AssessmentState, AssessmentAction, AssessmentAnswer } from '../types';
import { AssessmentCategory } from '../types';
import { getStorageItem, setStorageItem } from '../utils/storage';
import { STORAGE_KEYS } from '../utils/constants';

const initialState: AssessmentState = {
  currentStep: 0,
  currentCategory: AssessmentCategory.Transportation,
  answers: [],
  isComplete: false,
  startedAt: null,
  completedAt: null,
};

function assessmentReducer(state: AssessmentState, action: AssessmentAction): AssessmentState {
  switch (action.type) {
    case 'SET_STEP':
      return { ...state, currentStep: action.payload };
    case 'SET_CATEGORY':
      return { ...state, currentCategory: action.payload };
    case 'ADD_ANSWER': {
      const existingIdx = state.answers.findIndex(
        (a) => a.questionId === action.payload.questionId
      );
      const newAnswers = existingIdx >= 0
        ? state.answers.map((a, i) => (i === existingIdx ? action.payload : a))
        : [...state.answers, action.payload];
      return {
        ...state,
        answers: newAnswers,
        startedAt: state.startedAt || new Date().toISOString(),
      };
    }
    case 'UPDATE_ANSWER': {
      return {
        ...state,
        answers: state.answers.map((a) =>
          a.questionId === action.payload.questionId ? action.payload : a
        ),
      };
    }
    case 'COMPLETE_ASSESSMENT':
      return {
        ...state,
        isComplete: true,
        completedAt: new Date().toISOString(),
      };
    case 'RESET_ASSESSMENT':
      return { ...initialState };
    default:
      return state;
  }
}

interface AssessmentContextType {
  state: AssessmentState;
  dispatch: React.Dispatch<AssessmentAction>;
  /** Add or update an answer */
  submitAnswer: (answer: AssessmentAnswer) => void;
  /** Move to the next step */
  nextStep: () => void;
  /** Move to the previous step */
  prevStep: () => void;
  /** Set current category */
  setCategory: (category: AssessmentCategory) => void;
  /** Mark assessment as complete */
  completeAssessment: () => void;
  /** Reset and start fresh */
  resetAssessment: () => void;
  /** Get answer for a specific question */
  getAnswer: (questionId: string) => AssessmentAnswer | undefined;
}

const AssessmentContext = createContext<AssessmentContextType | null>(null);

export function AssessmentProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(assessmentReducer, initialState);

  // Load saved assessment state on mount
  useEffect(() => {
    const saved = getStorageItem<AssessmentState | null>(STORAGE_KEYS.ASSESSMENT_STATE, null);
    if (saved && !saved.isComplete) {
      // Restore in-progress assessment
      saved.answers.forEach((answer) => {
        dispatch({ type: 'ADD_ANSWER', payload: answer });
      });
      dispatch({ type: 'SET_STEP', payload: saved.currentStep });
      dispatch({ type: 'SET_CATEGORY', payload: saved.currentCategory });
    }
  }, []);

  // Persist state on changes
  useEffect(() => {
    if (state.startedAt) {
      setStorageItem(STORAGE_KEYS.ASSESSMENT_STATE, state);
    }
  }, [state]);

  const submitAnswer = (answer: AssessmentAnswer) => {
    dispatch({ type: 'ADD_ANSWER', payload: answer });
  };

  const nextStep = () => {
    dispatch({ type: 'SET_STEP', payload: state.currentStep + 1 });
  };

  const prevStep = () => {
    if (state.currentStep > 0) {
      dispatch({ type: 'SET_STEP', payload: state.currentStep - 1 });
    }
  };

  const setCategory = (category: AssessmentCategory) => {
    dispatch({ type: 'SET_CATEGORY', payload: category });
  };

  const completeAssessment = () => {
    dispatch({ type: 'COMPLETE_ASSESSMENT' });
  };

  const resetAssessment = () => {
    dispatch({ type: 'RESET_ASSESSMENT' });
    setStorageItem(STORAGE_KEYS.ASSESSMENT_STATE, initialState);
  };

  const getAnswer = (questionId: string) => {
    return state.answers.find((a) => a.questionId === questionId);
  };

  return (
    <AssessmentContext.Provider
      value={{
        state,
        dispatch,
        submitAnswer,
        nextStep,
        prevStep,
        setCategory,
        completeAssessment,
        resetAssessment,
        getAnswer,
      }}
    >
      {children}
    </AssessmentContext.Provider>
  );
}

export function useAssessment(): AssessmentContextType {
  const context = useContext(AssessmentContext);
  if (!context) {
    throw new Error('useAssessment must be used within an AssessmentProvider');
  }
  return context;
}
