/**
 * EcoPulse AI — Achievement Badges Dataset
 * Defines all unlockable badges with criteria and point rewards.
 */

import type { Badge } from '../types';
import { BadgeType } from '../types';

export const badgeDefinitions: Badge[] = [
  /* ─── Assessment Badges ─── */
  {
    id: 'badge-first-assessment',
    name: 'First Steps',
    description: 'Complete your first carbon footprint assessment.',
    icon: '🌱',
    type: BadgeType.Assessment,
    criteria: 'Complete the carbon assessment questionnaire',
    isUnlocked: false,
    pointsReward: 50,
  },
  {
    id: 'badge-reassessment',
    name: 'Self-Aware',
    description: 'Complete a second assessment to track improvement.',
    icon: '🔄',
    type: BadgeType.Assessment,
    criteria: 'Complete 2 assessments',
    isUnlocked: false,
    pointsReward: 30,
  },
  {
    id: 'badge-low-impact',
    name: 'Low Impact Hero',
    description: 'Achieve a Low Impact carbon score.',
    icon: '💚',
    type: BadgeType.Assessment,
    criteria: 'Score Low Impact on assessment',
    isUnlocked: false,
    pointsReward: 100,
  },

  /* ─── Streak Badges ─── */
  {
    id: 'badge-streak-3',
    name: 'Getting Started',
    description: 'Maintain a 3-day habit streak.',
    icon: '🔥',
    type: BadgeType.Streak,
    criteria: '3-day streak on any habit',
    isUnlocked: false,
    pointsReward: 15,
  },
  {
    id: 'badge-streak-7',
    name: 'Week Warrior',
    description: 'Maintain a 7-day habit streak.',
    icon: '⚡',
    type: BadgeType.Streak,
    criteria: '7-day streak on any habit',
    isUnlocked: false,
    pointsReward: 25,
  },
  {
    id: 'badge-streak-30',
    name: 'Monthly Master',
    description: 'Maintain an incredible 30-day habit streak.',
    icon: '🏆',
    type: BadgeType.Streak,
    criteria: '30-day streak on any habit',
    isUnlocked: false,
    pointsReward: 100,
  },
  {
    id: 'badge-streak-100',
    name: 'Century Club',
    description: 'Reach a legendary 100-day streak.',
    icon: '💎',
    type: BadgeType.Streak,
    criteria: '100-day streak on any habit',
    isUnlocked: false,
    pointsReward: 500,
  },

  /* ─── Habit Badges ─── */
  {
    id: 'badge-first-habit',
    name: 'Habit Former',
    description: 'Complete your first eco-friendly habit.',
    icon: '✅',
    type: BadgeType.Habit,
    criteria: 'Complete 1 habit',
    isUnlocked: false,
    pointsReward: 10,
  },
  {
    id: 'badge-5-habits',
    name: 'Eco Enthusiast',
    description: 'Complete 5 different habits in a day.',
    icon: '🌿',
    type: BadgeType.Habit,
    criteria: 'Complete 5 habits in one day',
    isUnlocked: false,
    pointsReward: 30,
  },
  {
    id: 'badge-50-completions',
    name: 'Half Century',
    description: 'Reach 50 total habit completions.',
    icon: '🎯',
    type: BadgeType.Habit,
    criteria: '50 total habit completions',
    isUnlocked: false,
    pointsReward: 75,
  },

  /* ─── Challenge Badges ─── */
  {
    id: 'badge-first-challenge',
    name: 'Challenger',
    description: 'Complete your first weekly challenge.',
    icon: '🏅',
    type: BadgeType.Challenge,
    criteria: 'Complete 1 weekly challenge',
    isUnlocked: false,
    pointsReward: 50,
  },
  {
    id: 'badge-5-challenges',
    name: 'Challenge Seeker',
    description: 'Complete 5 weekly challenges.',
    icon: '🎖️',
    type: BadgeType.Challenge,
    criteria: 'Complete 5 weekly challenges',
    isUnlocked: false,
    pointsReward: 100,
  },

  /* ─── Milestone Badges ─── */
  {
    id: 'badge-100kg-saved',
    name: 'Carbon Cutter',
    description: 'Save 100 kg of CO₂e through your actions.',
    icon: '♻️',
    type: BadgeType.Milestone,
    criteria: 'Save 100 kg CO₂e total',
    isUnlocked: false,
    pointsReward: 75,
  },
  {
    id: 'badge-500kg-saved',
    name: 'Climate Champion',
    description: 'Save 500 kg of CO₂e — that\'s like planting 25 trees!',
    icon: '🌳',
    type: BadgeType.Milestone,
    criteria: 'Save 500 kg CO₂e total',
    isUnlocked: false,
    pointsReward: 200,
  },
  {
    id: 'badge-1ton-saved',
    name: 'Ton Saver',
    description: 'Save 1 tonne (1,000 kg) of CO₂e. Incredible!',
    icon: '🌍',
    type: BadgeType.Milestone,
    criteria: 'Save 1,000 kg CO₂e total',
    isUnlocked: false,
    pointsReward: 500,
  },

  /* ─── Special Badges ─── */
  {
    id: 'badge-early-adopter',
    name: 'Early Adopter',
    description: 'Join EcoPulse AI as one of the first users.',
    icon: '⭐',
    type: BadgeType.Special,
    criteria: 'Sign up and complete onboarding',
    isUnlocked: false,
    pointsReward: 25,
  },
  {
    id: 'badge-all-categories',
    name: 'Well-Rounded',
    description: 'Complete habits in all 6 lifestyle categories.',
    icon: '🦋',
    type: BadgeType.Special,
    criteria: 'Complete habits across all categories',
    isUnlocked: false,
    pointsReward: 100,
  },
];
