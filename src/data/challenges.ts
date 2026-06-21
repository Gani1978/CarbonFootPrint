/**
 * EcoPulse AI — Weekly Challenges Dataset
 * Predefined challenge templates with point rewards and targets.
 */

import type { Challenge } from '../types';
import { AssessmentCategory } from '../types';

/** Generate an ISO date string N days from today */
function daysFromNow(days: number): string {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString();
}

/**
 * Template challenges that can be activated weekly.
 * Start/end dates are set dynamically when a challenge is activated.
 */
export const challengeTemplates: Omit<Challenge, 'startDate' | 'endDate'>[] = [
  {
    id: 'challenge-meatless-week',
    title: 'Meatless Week',
    description: 'Go 7 days without eating meat. Try delicious plant-based alternatives!',
    category: AssessmentCategory.Food,
    target: 7,
    progress: 0,
    pointsReward: 75,
    isActive: false,
    isCompleted: false,
  },
  {
    id: 'challenge-walk-commute',
    title: 'Walk or Cycle Week',
    description: 'Commute by walking or cycling for 5 working days this week.',
    category: AssessmentCategory.Transportation,
    target: 5,
    progress: 0,
    pointsReward: 60,
    isActive: false,
    isCompleted: false,
  },
  {
    id: 'challenge-zero-waste',
    title: 'Zero Single-Use Plastic',
    description: 'Avoid all single-use plastics for an entire week. Bring your own bags and bottles!',
    category: AssessmentCategory.Waste,
    target: 7,
    progress: 0,
    pointsReward: 50,
    isActive: false,
    isCompleted: false,
  },
  {
    id: 'challenge-cold-shower',
    title: 'Cold Shower Challenge',
    description: 'Take cold showers for 5 days to save water heating energy.',
    category: AssessmentCategory.Water,
    target: 5,
    progress: 0,
    pointsReward: 40,
    isActive: false,
    isCompleted: false,
  },
  {
    id: 'challenge-unplug',
    title: 'Unplug & Save',
    description: 'Unplug all non-essential electronics when not in use for 7 days.',
    category: AssessmentCategory.Electricity,
    target: 7,
    progress: 0,
    pointsReward: 45,
    isActive: false,
    isCompleted: false,
  },
  {
    id: 'challenge-local-food',
    title: 'Eat Local',
    description: 'Buy only locally-sourced food for 5 days.',
    category: AssessmentCategory.Food,
    target: 5,
    progress: 0,
    pointsReward: 55,
    isActive: false,
    isCompleted: false,
  },
  {
    id: 'challenge-no-car',
    title: 'Car-Free Days',
    description: 'Don\'t use a personal car for 5 days. Use public transport, bike, or walk.',
    category: AssessmentCategory.Transportation,
    target: 5,
    progress: 0,
    pointsReward: 70,
    isActive: false,
    isCompleted: false,
  },
  {
    id: 'challenge-composting',
    title: 'Composting Kickstart',
    description: 'Compost your food scraps for 7 consecutive days.',
    category: AssessmentCategory.Waste,
    target: 7,
    progress: 0,
    pointsReward: 50,
    isActive: false,
    isCompleted: false,
  },
  {
    id: 'challenge-5min-shower',
    title: '5-Minute Showers',
    description: 'Keep all showers under 5 minutes for a full week.',
    category: AssessmentCategory.Water,
    target: 7,
    progress: 0,
    pointsReward: 35,
    isActive: false,
    isCompleted: false,
  },
  {
    id: 'challenge-no-shopping',
    title: 'No New Purchases',
    description: 'Go 7 days without buying any non-essential new items.',
    category: AssessmentCategory.Shopping,
    target: 7,
    progress: 0,
    pointsReward: 60,
    isActive: false,
    isCompleted: false,
  },
];

/**
 * Activate a challenge template by adding dates.
 */
export function activateChallenge(
  template: typeof challengeTemplates[number]
): Challenge {
  return {
    ...template,
    startDate: new Date().toISOString(),
    endDate: daysFromNow(7),
    isActive: true,
  };
}

/**
 * Get a random selection of N challenges from the template pool.
 */
export function getRandomChallenges(count: number = 3): typeof challengeTemplates[number][] {
  const shuffled = [...challengeTemplates].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}
