/**
 * EcoPulse AI — Assessment Questions Dataset
 * Comprehensive questionnaire across 6 lifestyle categories.
 * Each question has weighted scoring for carbon footprint calculation.
 */

import type { AssessmentQuestion } from '../types';
import { AssessmentCategory } from '../types';

export const assessmentQuestions: AssessmentQuestion[] = [
  /* ═══════════════ TRANSPORTATION ═══════════════ */
  {
    id: 'transport-1',
    category: AssessmentCategory.Transportation,
    question: 'How do you primarily commute to work or school?',
    description: 'Select the mode of transport you use most frequently.',
    type: 'single',
    weight: 1.0,
    options: [
      { id: 't1-car', label: 'Personal car (petrol/diesel)', value: 1, emissionFactor: 2400 },
      { id: 't1-ev', label: 'Electric vehicle', value: 2, emissionFactor: 800 },
      { id: 't1-motorbike', label: 'Motorbike / scooter', value: 3, emissionFactor: 1200 },
      { id: 't1-public', label: 'Public transport (bus/metro)', value: 4, emissionFactor: 480 },
      { id: 't1-cycle', label: 'Bicycle', value: 5, emissionFactor: 0 },
      { id: 't1-walk', label: 'Walk / Work from home', value: 6, emissionFactor: 0 },
    ],
  },
  {
    id: 'transport-2',
    category: AssessmentCategory.Transportation,
    question: 'How many kilometers do you commute daily (one way)?',
    description: 'Approximate one-way distance.',
    type: 'slider',
    min: 0,
    max: 100,
    step: 5,
    unit: 'km',
    defaultValue: 15,
    weight: 0.15,
  },
  {
    id: 'transport-3',
    category: AssessmentCategory.Transportation,
    question: 'How often do you take domestic flights per year?',
    type: 'single',
    weight: 1.0,
    options: [
      { id: 't3-none', label: 'Never', value: 0, emissionFactor: 0 },
      { id: 't3-rare', label: '1–2 flights', value: 1, emissionFactor: 500 },
      { id: 't3-moderate', label: '3–5 flights', value: 2, emissionFactor: 1500 },
      { id: 't3-frequent', label: '6+ flights', value: 3, emissionFactor: 3000 },
    ],
  },
  {
    id: 'transport-4',
    category: AssessmentCategory.Transportation,
    question: 'Do you carpool or share rides?',
    type: 'single',
    weight: 1.0,
    options: [
      { id: 't4-always', label: 'Always', value: 1, emissionFactor: -200 },
      { id: 't4-often', label: 'Often', value: 2, emissionFactor: -100 },
      { id: 't4-sometimes', label: 'Sometimes', value: 3, emissionFactor: 0 },
      { id: 't4-never', label: 'Never', value: 4, emissionFactor: 100 },
    ],
  },

  /* ═══════════════ ELECTRICITY ═══════════════ */
  {
    id: 'elec-1',
    category: AssessmentCategory.Electricity,
    question: 'What is your average monthly electricity bill?',
    description: 'This helps estimate your household energy usage.',
    type: 'single',
    weight: 1.0,
    options: [
      { id: 'e1-low', label: 'Under ₹1,000 (~50 kWh)', value: 1, emissionFactor: 450 },
      { id: 'e1-mid', label: '₹1,000 – ₹3,000 (~150 kWh)', value: 2, emissionFactor: 1350 },
      { id: 'e1-high', label: '₹3,000 – ₹6,000 (~300 kWh)', value: 3, emissionFactor: 2700 },
      { id: 'e1-vhigh', label: 'Over ₹6,000 (~500+ kWh)', value: 4, emissionFactor: 4500 },
    ],
  },
  {
    id: 'elec-2',
    category: AssessmentCategory.Electricity,
    question: 'Do you use renewable energy sources?',
    type: 'single',
    weight: 1.0,
    options: [
      { id: 'e2-solar', label: 'Yes, solar panels at home', value: 1, emissionFactor: -500 },
      { id: 'e2-partial', label: 'Partially (green energy plan)', value: 2, emissionFactor: -200 },
      { id: 'e2-no', label: 'No', value: 3, emissionFactor: 0 },
      { id: 'e2-unsure', label: 'Not sure', value: 4, emissionFactor: 0 },
    ],
  },
  {
    id: 'elec-3',
    category: AssessmentCategory.Electricity,
    question: 'How many hours do you use air conditioning daily (in summer)?',
    type: 'slider',
    min: 0,
    max: 24,
    step: 1,
    unit: 'hours',
    defaultValue: 4,
    weight: 50,
  },
  {
    id: 'elec-4',
    category: AssessmentCategory.Electricity,
    question: 'Do you use energy-efficient appliances (5-star rated)?',
    type: 'single',
    weight: 1.0,
    options: [
      { id: 'e4-all', label: 'Yes, all appliances', value: 1, emissionFactor: -300 },
      { id: 'e4-most', label: 'Most of them', value: 2, emissionFactor: -150 },
      { id: 'e4-few', label: 'A few', value: 3, emissionFactor: 0 },
      { id: 'e4-none', label: 'No / Not sure', value: 4, emissionFactor: 100 },
    ],
  },

  /* ═══════════════ FOOD ═══════════════ */
  {
    id: 'food-1',
    category: AssessmentCategory.Food,
    question: 'What best describes your diet?',
    description: 'Diet has a significant impact on carbon footprint.',
    type: 'single',
    weight: 1.0,
    options: [
      { id: 'f1-vegan', label: 'Vegan', value: 1, emissionFactor: 600 },
      { id: 'f1-vegetarian', label: 'Vegetarian', value: 2, emissionFactor: 900 },
      { id: 'f1-flexitarian', label: 'Flexitarian (occasional meat)', value: 3, emissionFactor: 1500 },
      { id: 'f1-omnivore', label: 'Omnivore (regular meat)', value: 4, emissionFactor: 2500 },
      { id: 'f1-heavy-meat', label: 'Heavy meat eater', value: 5, emissionFactor: 3500 },
    ],
  },
  {
    id: 'food-2',
    category: AssessmentCategory.Food,
    question: 'How often do you eat out or order food delivery?',
    type: 'single',
    weight: 1.0,
    options: [
      { id: 'f2-rarely', label: 'Rarely (1-2 times/month)', value: 1, emissionFactor: 100 },
      { id: 'f2-sometimes', label: 'Sometimes (1-2 times/week)', value: 2, emissionFactor: 300 },
      { id: 'f2-often', label: 'Often (3-5 times/week)', value: 3, emissionFactor: 600 },
      { id: 'f2-daily', label: 'Almost daily', value: 4, emissionFactor: 1000 },
    ],
  },
  {
    id: 'food-3',
    category: AssessmentCategory.Food,
    question: 'Do you buy locally-sourced / seasonal food?',
    type: 'single',
    weight: 1.0,
    options: [
      { id: 'f3-always', label: 'Always', value: 1, emissionFactor: -200 },
      { id: 'f3-often', label: 'Often', value: 2, emissionFactor: -100 },
      { id: 'f3-sometimes', label: 'Sometimes', value: 3, emissionFactor: 0 },
      { id: 'f3-never', label: 'Rarely / Never', value: 4, emissionFactor: 200 },
    ],
  },
  {
    id: 'food-4',
    category: AssessmentCategory.Food,
    question: 'How much food do you waste per week?',
    type: 'single',
    weight: 1.0,
    options: [
      { id: 'f4-none', label: 'Almost none', value: 1, emissionFactor: 0 },
      { id: 'f4-little', label: 'A little', value: 2, emissionFactor: 100 },
      { id: 'f4-moderate', label: 'A moderate amount', value: 3, emissionFactor: 250 },
      { id: 'f4-lot', label: 'Quite a lot', value: 4, emissionFactor: 500 },
    ],
  },

  /* ═══════════════ SHOPPING ═══════════════ */
  {
    id: 'shop-1',
    category: AssessmentCategory.Shopping,
    question: 'How often do you buy new clothing?',
    type: 'single',
    weight: 1.0,
    options: [
      { id: 's1-rarely', label: 'Rarely (few times a year)', value: 1, emissionFactor: 200 },
      { id: 's1-monthly', label: 'Monthly', value: 2, emissionFactor: 600 },
      { id: 's1-biweekly', label: 'Bi-weekly', value: 3, emissionFactor: 1200 },
      { id: 's1-weekly', label: 'Weekly', value: 4, emissionFactor: 2000 },
    ],
  },
  {
    id: 'shop-2',
    category: AssessmentCategory.Shopping,
    question: 'Do you prefer sustainable / eco-friendly brands?',
    type: 'single',
    weight: 1.0,
    options: [
      { id: 's2-always', label: 'Always', value: 1, emissionFactor: -200 },
      { id: 's2-often', label: 'Often', value: 2, emissionFactor: -100 },
      { id: 's2-sometimes', label: 'Sometimes', value: 3, emissionFactor: 0 },
      { id: 's2-never', label: 'Never / Don\'t check', value: 4, emissionFactor: 200 },
    ],
  },
  {
    id: 'shop-3',
    category: AssessmentCategory.Shopping,
    question: 'How many new electronic gadgets do you buy per year?',
    type: 'single',
    weight: 1.0,
    options: [
      { id: 's3-none', label: 'None or 1', value: 1, emissionFactor: 200 },
      { id: 's3-few', label: '2–3 devices', value: 2, emissionFactor: 600 },
      { id: 's3-several', label: '4–6 devices', value: 3, emissionFactor: 1200 },
      { id: 's3-many', label: '7+ devices', value: 4, emissionFactor: 2000 },
    ],
  },
  {
    id: 'shop-4',
    category: AssessmentCategory.Shopping,
    question: 'Do you buy second-hand or refurbished items?',
    type: 'single',
    weight: 1.0,
    options: [
      { id: 's4-often', label: 'Yes, frequently', value: 1, emissionFactor: -300 },
      { id: 's4-sometimes', label: 'Sometimes', value: 2, emissionFactor: -100 },
      { id: 's4-rarely', label: 'Rarely', value: 3, emissionFactor: 0 },
      { id: 's4-never', label: 'Never', value: 4, emissionFactor: 100 },
    ],
  },

  /* ═══════════════ WASTE ═══════════════ */
  {
    id: 'waste-1',
    category: AssessmentCategory.Waste,
    question: 'Do you segregate your waste (wet/dry/recyclable)?',
    type: 'single',
    weight: 1.0,
    options: [
      { id: 'w1-always', label: 'Always', value: 1, emissionFactor: -200 },
      { id: 'w1-mostly', label: 'Mostly', value: 2, emissionFactor: -100 },
      { id: 'w1-sometimes', label: 'Sometimes', value: 3, emissionFactor: 100 },
      { id: 'w1-never', label: 'Never', value: 4, emissionFactor: 300 },
    ],
  },
  {
    id: 'waste-2',
    category: AssessmentCategory.Waste,
    question: 'Do you compost organic waste?',
    type: 'single',
    weight: 1.0,
    options: [
      { id: 'w2-yes', label: 'Yes, regularly', value: 1, emissionFactor: -200 },
      { id: 'w2-sometimes', label: 'Sometimes', value: 2, emissionFactor: -50 },
      { id: 'w2-no', label: 'No', value: 3, emissionFactor: 200 },
    ],
  },
  {
    id: 'waste-3',
    category: AssessmentCategory.Waste,
    question: 'How often do you use single-use plastics (bags, bottles, straws)?',
    type: 'single',
    weight: 1.0,
    options: [
      { id: 'w3-never', label: 'Never — I carry reusables', value: 1, emissionFactor: -100 },
      { id: 'w3-rarely', label: 'Rarely', value: 2, emissionFactor: 50 },
      { id: 'w3-sometimes', label: 'Sometimes', value: 3, emissionFactor: 200 },
      { id: 'w3-often', label: 'Often / Daily', value: 4, emissionFactor: 400 },
    ],
  },
  {
    id: 'waste-4',
    category: AssessmentCategory.Waste,
    question: 'How many bags of trash does your household produce per week?',
    type: 'slider',
    min: 0,
    max: 15,
    step: 1,
    unit: 'bags',
    defaultValue: 3,
    weight: 80,
  },

  /* ═══════════════ WATER ═══════════════ */
  {
    id: 'water-1',
    category: AssessmentCategory.Water,
    question: 'What is your average daily shower duration?',
    type: 'single',
    weight: 1.0,
    options: [
      { id: 'wa1-short', label: 'Under 5 minutes', value: 1, emissionFactor: 100 },
      { id: 'wa1-medium', label: '5–10 minutes', value: 2, emissionFactor: 250 },
      { id: 'wa1-long', label: '10–20 minutes', value: 3, emissionFactor: 500 },
      { id: 'wa1-vlong', label: 'Over 20 minutes', value: 4, emissionFactor: 800 },
    ],
  },
  {
    id: 'water-2',
    category: AssessmentCategory.Water,
    question: 'Do you use water-saving fixtures (low-flow taps, dual-flush toilets)?',
    type: 'single',
    weight: 1.0,
    options: [
      { id: 'wa2-yes', label: 'Yes, throughout the house', value: 1, emissionFactor: -200 },
      { id: 'wa2-some', label: 'Some fixtures', value: 2, emissionFactor: -50 },
      { id: 'wa2-no', label: 'No', value: 3, emissionFactor: 100 },
      { id: 'wa2-unsure', label: 'Not sure', value: 4, emissionFactor: 50 },
    ],
  },
  {
    id: 'water-3',
    category: AssessmentCategory.Water,
    question: 'How do you water your garden/plants?',
    type: 'single',
    weight: 1.0,
    options: [
      { id: 'wa3-none', label: 'No garden / No watering needed', value: 1, emissionFactor: 0 },
      { id: 'wa3-drip', label: 'Drip irrigation / Collected rainwater', value: 2, emissionFactor: -50 },
      { id: 'wa3-hose', label: 'Garden hose (moderate)', value: 3, emissionFactor: 200 },
      { id: 'wa3-sprinkler', label: 'Sprinkler system (heavy)', value: 4, emissionFactor: 500 },
    ],
  },
  {
    id: 'water-4',
    category: AssessmentCategory.Water,
    question: 'Do you have a water heater? How is it powered?',
    type: 'single',
    weight: 1.0,
    options: [
      { id: 'wa4-solar', label: 'Solar water heater', value: 1, emissionFactor: 50 },
      { id: 'wa4-gas', label: 'Gas geyser', value: 2, emissionFactor: 300 },
      { id: 'wa4-electric', label: 'Electric geyser', value: 3, emissionFactor: 500 },
      { id: 'wa4-none', label: 'No water heater', value: 4, emissionFactor: 0 },
    ],
  },
];

/**
 * Get questions filtered by category.
 */
export function getQuestionsByCategory(category: AssessmentCategory): AssessmentQuestion[] {
  return assessmentQuestions.filter((q) => q.category === category);
}

/**
 * Get the total number of questions.
 */
export function getTotalQuestionCount(): number {
  return assessmentQuestions.length;
}

/**
 * Get the ordered list of categories for the assessment flow.
 */
export function getAssessmentCategories(): AssessmentCategory[] {
  return [
    AssessmentCategory.Transportation,
    AssessmentCategory.Electricity,
    AssessmentCategory.Food,
    AssessmentCategory.Shopping,
    AssessmentCategory.Waste,
    AssessmentCategory.Water,
  ];
}
