/**
 * EcoPulse AI — Action Plan Templates
 * Pre-built action plan items with estimated carbon savings,
 * difficulty levels, and timeframes.
 */

import type { ActionItem } from '../types';
import { AssessmentCategory, DifficultyLevel } from '../types';

/** Short-term action items (achievable in 1-4 weeks) */
export const shortTermActions: ActionItem[] = [
  {
    id: 'action-led-switch',
    title: 'Replace all bulbs with LEDs',
    description: 'Switch all incandescent and CFL bulbs to energy-efficient LEDs. Start with the most-used rooms.',
    category: AssessmentCategory.Electricity,
    difficulty: DifficultyLevel.Easy,
    estimatedSavings: 150,
    timeframe: 1,
    isShortTerm: true,
    tips: ['Start with living room and bedroom', 'Look for warm white (2700K) for comfortable lighting', 'Consider smart bulbs for auto-scheduling'],
    isCompleted: false,
  },
  {
    id: 'action-reusable-kit',
    title: 'Build a reusable essentials kit',
    description: 'Get a reusable water bottle, shopping bags, coffee cup, and metal straw. Carry them daily.',
    category: AssessmentCategory.Waste,
    difficulty: DifficultyLevel.Easy,
    estimatedSavings: 50,
    timeframe: 1,
    isShortTerm: true,
    tips: ['Keep a bag in your backpack/purse', 'Place bags near the door so you don\'t forget', 'Gift yourself a nice bottle you\'ll want to use'],
    isCompleted: false,
  },
  {
    id: 'action-meatless-monday',
    title: 'Start Meatless Mondays',
    description: 'Replace meat with plant-based protein every Monday. Explore new recipes to make it exciting!',
    category: AssessmentCategory.Food,
    difficulty: DifficultyLevel.Easy,
    estimatedSavings: 200,
    timeframe: 1,
    isShortTerm: true,
    tips: ['Try Indian dal, paneer, or chole', 'Batch cook legumes on weekends', 'Join online communities for recipe inspiration'],
    isCompleted: false,
  },
  {
    id: 'action-ac-optimize',
    title: 'Optimize AC settings',
    description: 'Set AC to 24°C, use timer mode, and clean filters monthly. Each degree higher saves 6% energy.',
    category: AssessmentCategory.Electricity,
    difficulty: DifficultyLevel.Easy,
    estimatedSavings: 200,
    timeframe: 1,
    isShortTerm: true,
    tips: ['Use fans alongside AC to feel cooler at higher settings', 'Close curtains during peak sun hours', 'Service AC before summer'],
    isCompleted: false,
  },
  {
    id: 'action-waste-segregation',
    title: 'Set up waste segregation at home',
    description: 'Get 3 separate bins for wet, dry, and recyclable waste. Label them clearly for the whole family.',
    category: AssessmentCategory.Waste,
    difficulty: DifficultyLevel.Easy,
    estimatedSavings: 100,
    timeframe: 2,
    isShortTerm: true,
    tips: ['Use color-coded bins: green (wet), blue (dry), yellow (recyclable)', 'Put up a guide chart near bins', 'Rinse recyclables before disposal'],
    isCompleted: false,
  },
  {
    id: 'action-shorter-showers',
    title: 'Reduce shower time to 5 minutes',
    description: 'Use a shower timer or play a 5-minute playlist. Saves water and the energy to heat it.',
    category: AssessmentCategory.Water,
    difficulty: DifficultyLevel.Easy,
    estimatedSavings: 80,
    timeframe: 1,
    isShortTerm: true,
    tips: ['Use a waterproof timer', 'Wet, lather with water off, then rinse', 'Consider a low-flow showerhead too'],
    isCompleted: false,
  },
  {
    id: 'action-public-transport',
    title: 'Use public transport 2 days a week',
    description: 'Replace car commutes with bus or metro twice a week. Start with days when traffic is worst.',
    category: AssessmentCategory.Transportation,
    difficulty: DifficultyLevel.Medium,
    estimatedSavings: 500,
    timeframe: 2,
    isShortTerm: true,
    tips: ['Get a monthly transit pass for savings', 'Use commute time for reading or podcasts', 'Try different routes to find the fastest'],
    isCompleted: false,
  },
  {
    id: 'action-meal-planning',
    title: 'Start weekly meal planning',
    description: 'Plan meals for the week, buy only what you need. Reduces food waste by up to 50%.',
    category: AssessmentCategory.Food,
    difficulty: DifficultyLevel.Medium,
    estimatedSavings: 150,
    timeframe: 2,
    isShortTerm: true,
    tips: ['Use a meal planning app', 'Shop with a list', 'Cook in batches and freeze portions'],
    isCompleted: false,
  },
];

/** Long-term action items (achievable in 1-6 months) */
export const longTermActions: ActionItem[] = [
  {
    id: 'action-solar-panels',
    title: 'Install rooftop solar panels',
    description: 'A 3kW system can cover most household needs. Government subsidies can cover 20-40% of costs.',
    category: AssessmentCategory.Electricity,
    difficulty: DifficultyLevel.Hard,
    estimatedSavings: 1500,
    timeframe: 12,
    isShortTerm: false,
    tips: ['Check PM Surya Ghar Yojana for subsidies', 'Get quotes from 3+ installers', 'Start with net metering to sell excess power'],
    isCompleted: false,
  },
  {
    id: 'action-ev-switch',
    title: 'Switch to an electric vehicle',
    description: 'When it\'s time for a new vehicle, go electric. Running costs are 75% lower than petrol.',
    category: AssessmentCategory.Transportation,
    difficulty: DifficultyLevel.Hard,
    estimatedSavings: 1800,
    timeframe: 24,
    isShortTerm: false,
    tips: ['Try EV test drives at local showrooms', 'Check FAME II subsidies', 'Consider charging infrastructure in your area'],
    isCompleted: false,
  },
  {
    id: 'action-plant-based-diet',
    title: 'Transition to a plant-based diet',
    description: 'Gradually shift to a primarily plant-based diet over 3 months. Start with 1 meal/day, then expand.',
    category: AssessmentCategory.Food,
    difficulty: DifficultyLevel.Medium,
    estimatedSavings: 800,
    timeframe: 12,
    isShortTerm: false,
    tips: ['Don\'t go cold turkey — gradual change sticks', 'Find plant-based versions of your favorite dishes', 'Ensure adequate protein from legumes, nuts, seeds'],
    isCompleted: false,
  },
  {
    id: 'action-composting-system',
    title: 'Set up a home composting system',
    description: 'Install a composting bin for kitchen and garden waste. Creates free fertilizer for your plants.',
    category: AssessmentCategory.Waste,
    difficulty: DifficultyLevel.Medium,
    estimatedSavings: 150,
    timeframe: 8,
    isShortTerm: false,
    tips: ['Balcony composters work great for apartments', 'Use the compost for indoor plants', 'Avoid meat and dairy in compost'],
    isCompleted: false,
  },
  {
    id: 'action-capsule-wardrobe',
    title: 'Build a capsule wardrobe',
    description: 'Curate 30-40 versatile, high-quality pieces. Reduces clothing purchases by 60% annually.',
    category: AssessmentCategory.Shopping,
    difficulty: DifficultyLevel.Medium,
    estimatedSavings: 400,
    timeframe: 12,
    isShortTerm: false,
    tips: ['Start by auditing your current wardrobe', 'Invest in versatile, neutral-colored basics', 'One-in, one-out rule for new purchases'],
    isCompleted: false,
  },
  {
    id: 'action-rainwater-harvest',
    title: 'Set up rainwater harvesting',
    description: 'Collect rooftop rainwater for garden use. Can save 30-40% of your water consumption.',
    category: AssessmentCategory.Water,
    difficulty: DifficultyLevel.Hard,
    estimatedSavings: 200,
    timeframe: 16,
    isShortTerm: false,
    tips: ['Check local building regulations', 'Start with a simple barrel system', 'Use for garden watering and cleaning'],
    isCompleted: false,
  },
  {
    id: 'action-cycle-commute',
    title: 'Make cycling your primary commute',
    description: 'For commutes under 10 km, cycling is faster than driving during rush hour and completely zero-emission.',
    category: AssessmentCategory.Transportation,
    difficulty: DifficultyLevel.Medium,
    estimatedSavings: 1200,
    timeframe: 8,
    isShortTerm: false,
    tips: ['Start with 2 days/week and increase gradually', 'Invest in a good helmet and lights', 'Scout safe cycling routes using Google Maps'],
    isCompleted: false,
  },
  {
    id: 'action-energy-audit',
    title: 'Conduct a home energy audit',
    description: 'Identify and fix energy leaks in your home. Insulation, sealing, and appliance upgrades can save 20-30% energy.',
    category: AssessmentCategory.Electricity,
    difficulty: DifficultyLevel.Medium,
    estimatedSavings: 500,
    timeframe: 8,
    isShortTerm: false,
    tips: ['Check for air leaks around windows and doors', 'Insulate hot water pipes', 'Replace old appliances with 5-star rated ones'],
    isCompleted: false,
  },
];

/**
 * Generate a personalized action plan based on the user's top emission categories.
 */
export function generateActionPlan(topCategories: AssessmentCategory[]): {
  shortTerm: ActionItem[];
  longTerm: ActionItem[];
} {
  // Prioritize actions from the user's top emission categories
  const relevantShortTerm = shortTermActions.filter((a) =>
    topCategories.includes(a.category)
  );
  const otherShortTerm = shortTermActions.filter(
    (a) => !topCategories.includes(a.category)
  );

  const relevantLongTerm = longTermActions.filter((a) =>
    topCategories.includes(a.category)
  );
  const otherLongTerm = longTermActions.filter(
    (a) => !topCategories.includes(a.category)
  );

  return {
    shortTerm: [...relevantShortTerm, ...otherShortTerm].slice(0, 6),
    longTerm: [...relevantLongTerm, ...otherLongTerm].slice(0, 5),
  };
}

/**
 * Calculate total estimated savings from a list of action items.
 */
export function calculateTotalSavings(actions: ActionItem[]): number {
  return actions.reduce((sum, action) => sum + action.estimatedSavings, 0);
}
