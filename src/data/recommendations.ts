/**
 * EcoPulse AI — AI Recommendations Engine
 * Rules-based recommendation system that generates personalized suggestions
 * based on user assessment answers and behavior patterns.
 */

import type { Recommendation, AssessmentAnswer, CarbonScore } from '../types';
import { AssessmentCategory } from '../types';

/** Full recommendation database */
const allRecommendations: Recommendation[] = [
  /* ─── Transportation ─── */
  {
    id: 'rec-carpool',
    category: AssessmentCategory.Transportation,
    title: 'Start Carpooling',
    description: 'Share your daily commute with colleagues or neighbors. Apps like QuickRide and BlaBlaCar make it easy to find carpool partners.',
    impact: 'medium',
    estimatedSavings: 800,
    triggerConditions: ['car_commute', 'long_commute'],
    alternatives: ['Public transport', 'Cycling on shorter days'],
  },
  {
    id: 'rec-public-transport',
    category: AssessmentCategory.Transportation,
    title: 'Switch to Public Transport',
    description: 'Using buses or metro instead of a personal car can reduce your transport emissions by up to 80%.',
    impact: 'high',
    estimatedSavings: 1500,
    triggerConditions: ['car_commute'],
    alternatives: ['Get a metro pass', 'Combine with cycling for last-mile'],
  },
  {
    id: 'rec-cycling',
    category: AssessmentCategory.Transportation,
    title: 'Try Cycling to Work',
    description: 'If your commute is under 10 km, cycling is a zero-emission option that also keeps you fit!',
    impact: 'high',
    estimatedSavings: 1200,
    triggerConditions: ['short_commute', 'car_commute'],
    alternatives: ['E-bike for longer distances', 'Walk for very short commutes'],
  },
  {
    id: 'rec-reduce-flights',
    category: AssessmentCategory.Transportation,
    title: 'Reduce Air Travel',
    description: 'Consider train alternatives for shorter routes. When flying is necessary, choose direct flights and economy class.',
    impact: 'high',
    estimatedSavings: 1000,
    triggerConditions: ['frequent_flights'],
    alternatives: ['Video conferencing for business', 'Train travel'],
  },
  {
    id: 'rec-ev',
    category: AssessmentCategory.Transportation,
    title: 'Consider an Electric Vehicle',
    description: 'When it\'s time for a new car, an EV can cut your transport emissions by 60-70%.',
    impact: 'high',
    estimatedSavings: 1800,
    triggerConditions: ['car_commute', 'long_commute'],
    alternatives: ['E-scooter for short commutes', 'Hybrid as stepping stone'],
  },

  /* ─── Food ─── */
  {
    id: 'rec-meatless-days',
    category: AssessmentCategory.Food,
    title: 'Start Meatless Mondays',
    description: 'Going meat-free just one day a week can save ~200 kg CO₂e per year. Gradually increase over time.',
    impact: 'medium',
    estimatedSavings: 200,
    triggerConditions: ['heavy_meat', 'omnivore'],
    alternatives: ['Try plant-based burgers', 'Explore Indian vegetarian cuisine'],
  },
  {
    id: 'rec-plant-based',
    category: AssessmentCategory.Food,
    title: 'Explore Plant-Based Meals',
    description: 'Plant-based diets have 50-75% lower emissions. Try substituting one meal a day with plant-based options.',
    impact: 'high',
    estimatedSavings: 800,
    triggerConditions: ['heavy_meat'],
    alternatives: ['Lentil-based dishes', 'Tofu and tempeh', 'Seasonal vegetables'],
  },
  {
    id: 'rec-local-food',
    category: AssessmentCategory.Food,
    title: 'Buy Local and Seasonal',
    description: 'Locally sourced food travels less distance, reducing transport emissions. Visit your local farmers\' market!',
    impact: 'medium',
    estimatedSavings: 300,
    triggerConditions: ['non_local_food'],
    alternatives: ['Join a CSA (Community Supported Agriculture)', 'Grow your own herbs'],
  },
  {
    id: 'rec-reduce-food-waste',
    category: AssessmentCategory.Food,
    title: 'Reduce Food Waste',
    description: 'Plan meals ahead, store food properly, and compost scraps. The average household wastes 30% of food purchased.',
    impact: 'medium',
    estimatedSavings: 250,
    triggerConditions: ['high_food_waste'],
    alternatives: ['Meal planning apps', 'Freezing leftovers', 'Composting'],
  },

  /* ─── Electricity ─── */
  {
    id: 'rec-led-bulbs',
    category: AssessmentCategory.Electricity,
    title: 'Switch to LED Lighting',
    description: 'LED bulbs use 75% less energy than incandescent bulbs and last 25x longer.',
    impact: 'medium',
    estimatedSavings: 200,
    triggerConditions: ['high_electricity'],
    alternatives: ['Smart LED bulbs with auto-dimming', 'Motion sensor lights'],
  },
  {
    id: 'rec-solar',
    category: AssessmentCategory.Electricity,
    title: 'Consider Rooftop Solar',
    description: 'With government subsidies available, rooftop solar can reduce electricity bills by 70% and emissions significantly.',
    impact: 'high',
    estimatedSavings: 1500,
    triggerConditions: ['high_electricity', 'no_renewable'],
    alternatives: ['Green energy plans from utility', 'Community solar programs'],
  },
  {
    id: 'rec-efficient-ac',
    category: AssessmentCategory.Electricity,
    title: 'Optimize AC Usage',
    description: 'Set AC to 24°C instead of 18°C, use timer functions, and ensure regular maintenance for efficiency.',
    impact: 'medium',
    estimatedSavings: 400,
    triggerConditions: ['heavy_ac'],
    alternatives: ['Ceiling fans as primary cooling', 'Window insulation'],
  },
  {
    id: 'rec-star-appliances',
    category: AssessmentCategory.Electricity,
    title: 'Upgrade to 5-Star Appliances',
    description: 'When replacing appliances, choose BEE 5-star rated models. They use 30-50% less energy.',
    impact: 'medium',
    estimatedSavings: 300,
    triggerConditions: ['no_efficient_appliances'],
    alternatives: ['Smart power strips', 'Timer-based plugs'],
  },

  /* ─── Shopping ─── */
  {
    id: 'rec-buy-less',
    category: AssessmentCategory.Shopping,
    title: 'Adopt a "Buy Less" Mindset',
    description: 'Before any purchase, ask: Do I need it? Can I borrow or rent it? Quality over quantity saves both money and carbon.',
    impact: 'medium',
    estimatedSavings: 400,
    triggerConditions: ['frequent_shopping'],
    alternatives: ['30-day rule for non-essentials', 'Capsule wardrobe approach'],
  },
  {
    id: 'rec-secondhand',
    category: AssessmentCategory.Shopping,
    title: 'Buy Second-Hand',
    description: 'Thrift stores, online marketplaces, and refurbished electronics save 50-80% of manufacturing emissions.',
    impact: 'medium',
    estimatedSavings: 350,
    triggerConditions: ['no_secondhand', 'frequent_shopping'],
    alternatives: ['Clothing swaps with friends', 'Refurbished electronics'],
  },
  {
    id: 'rec-sustainable-brands',
    category: AssessmentCategory.Shopping,
    title: 'Choose Sustainable Brands',
    description: 'Support brands with verified sustainability certifications and transparent supply chains.',
    impact: 'low',
    estimatedSavings: 150,
    triggerConditions: ['no_sustainable_brands'],
    alternatives: ['Check for B-Corp certification', 'Look for organic/fair-trade labels'],
  },

  /* ─── Waste ─── */
  {
    id: 'rec-segregate',
    category: AssessmentCategory.Waste,
    title: 'Start Waste Segregation',
    description: 'Separate wet, dry, and recyclable waste. This alone can divert 60% of waste from landfills.',
    impact: 'medium',
    estimatedSavings: 200,
    triggerConditions: ['no_segregation'],
    alternatives: ['Color-coded bins', 'Community recycling programs'],
  },
  {
    id: 'rec-compost',
    category: AssessmentCategory.Waste,
    title: 'Start Composting',
    description: 'Composting kitchen scraps reduces methane from landfills and creates nutrient-rich soil for plants.',
    impact: 'medium',
    estimatedSavings: 150,
    triggerConditions: ['no_composting', 'high_waste'],
    alternatives: ['Balcony composting kits', 'Community compost bins'],
  },
  {
    id: 'rec-reusables',
    category: AssessmentCategory.Waste,
    title: 'Carry Reusables',
    description: 'Always carry a reusable bag, water bottle, and coffee cup. Small changes, big impact over time.',
    impact: 'low',
    estimatedSavings: 50,
    triggerConditions: ['single_use_plastics'],
    alternatives: ['Stainless steel bottles', 'Cloth shopping bags'],
  },

  /* ─── Water ─── */
  {
    id: 'rec-shorter-showers',
    category: AssessmentCategory.Water,
    title: 'Shorter Showers',
    description: 'Reducing shower time by 2 minutes saves ~25 liters of water per shower and the energy to heat it.',
    impact: 'low',
    estimatedSavings: 100,
    triggerConditions: ['long_showers'],
    alternatives: ['Shower timer', 'Low-flow showerhead'],
  },
  {
    id: 'rec-fix-leaks',
    category: AssessmentCategory.Water,
    title: 'Fix Leaky Taps',
    description: 'A dripping tap wastes up to 20,000 liters per year. Fix leaks promptly to save water and money.',
    impact: 'medium',
    estimatedSavings: 150,
    triggerConditions: ['high_water_usage'],
    alternatives: ['Water-saving aerators', 'Regular plumbing checks'],
  },
  {
    id: 'rec-solar-heater',
    category: AssessmentCategory.Water,
    title: 'Switch to Solar Water Heater',
    description: 'Solar water heaters can provide 70% of your hot water needs with zero emissions.',
    impact: 'high',
    estimatedSavings: 400,
    triggerConditions: ['electric_heater', 'gas_heater'],
    alternatives: ['Heat pump water heater', 'Insulate existing heater'],
  },
];

/**
 * Generate personalized recommendations based on assessment answers.
 * Matches user patterns to trigger conditions and returns relevant suggestions.
 */
export function generateRecommendations(
  answers: AssessmentAnswer[],
  score: CarbonScore
): Recommendation[] {
  const patterns = extractPatterns(answers);
  const recommendations: Recommendation[] = [];

  for (const rec of allRecommendations) {
    const isRelevant = rec.triggerConditions.some((condition) =>
      patterns.includes(condition)
    );
    if (isRelevant) {
      recommendations.push(rec);
    }
  }

  // Sort by impact (high first) then by estimated savings
  recommendations.sort((a, b) => {
    const impactOrder = { high: 3, medium: 2, low: 1 };
    const impactDiff = impactOrder[b.impact] - impactOrder[a.impact];
    if (impactDiff !== 0) return impactDiff;
    return b.estimatedSavings - a.estimatedSavings;
  });

  // Also include top-category-based recommendations if we have few matches
  if (recommendations.length < 5 && score.breakdown.length > 0) {
    const topCategory = score.breakdown[0].category;
    const categoryRecs = allRecommendations.filter(
      (r) => r.category === topCategory && !recommendations.find((existing) => existing.id === r.id)
    );
    recommendations.push(...categoryRecs.slice(0, 3));
  }

  return recommendations.slice(0, 10);
}

/**
 * Extract behavior patterns from assessment answers for recommendation matching.
 */
function extractPatterns(answers: AssessmentAnswer[]): string[] {
  const patterns: string[] = [];

  for (const answer of answers) {
    const val = typeof answer.value === 'string' ? answer.value : String(answer.value);

    // Transportation patterns
    if (answer.questionId === 'transport-1') {
      if (val.includes('car') || val === 't1-car') patterns.push('car_commute');
    }
    if (answer.questionId === 'transport-2') {
      const km = typeof answer.value === 'number' ? answer.value : 0;
      if (km > 20) patterns.push('long_commute');
      if (km <= 10 && km > 0) patterns.push('short_commute');
    }
    if (answer.questionId === 'transport-3') {
      if (val === 't3-frequent' || val === 't3-moderate') patterns.push('frequent_flights');
    }

    // Food patterns
    if (answer.questionId === 'food-1') {
      if (val === 'f1-heavy-meat') patterns.push('heavy_meat');
      if (val === 'f1-omnivore') patterns.push('omnivore');
    }
    if (answer.questionId === 'food-3') {
      if (val === 'f3-never' || val === 'f3-sometimes') patterns.push('non_local_food');
    }
    if (answer.questionId === 'food-4') {
      if (val === 'f4-lot' || val === 'f4-moderate') patterns.push('high_food_waste');
    }

    // Electricity patterns
    if (answer.questionId === 'elec-1') {
      if (val === 'e1-high' || val === 'e1-vhigh') patterns.push('high_electricity');
    }
    if (answer.questionId === 'elec-2') {
      if (val === 'e2-no' || val === 'e2-unsure') patterns.push('no_renewable');
    }
    if (answer.questionId === 'elec-3') {
      const hours = typeof answer.value === 'number' ? answer.value : 0;
      if (hours > 6) patterns.push('heavy_ac');
    }
    if (answer.questionId === 'elec-4') {
      if (val === 'e4-few' || val === 'e4-none') patterns.push('no_efficient_appliances');
    }

    // Shopping patterns
    if (answer.questionId === 'shop-1') {
      if (val === 's1-weekly' || val === 's1-biweekly') patterns.push('frequent_shopping');
    }
    if (answer.questionId === 'shop-2') {
      if (val === 's2-never' || val === 's2-sometimes') patterns.push('no_sustainable_brands');
    }
    if (answer.questionId === 'shop-4') {
      if (val === 's4-rarely' || val === 's4-never') patterns.push('no_secondhand');
    }

    // Waste patterns
    if (answer.questionId === 'waste-1') {
      if (val === 'w1-never' || val === 'w1-sometimes') patterns.push('no_segregation');
    }
    if (answer.questionId === 'waste-2') {
      if (val === 'w2-no') patterns.push('no_composting');
    }
    if (answer.questionId === 'waste-3') {
      if (val === 'w3-often' || val === 'w3-sometimes') patterns.push('single_use_plastics');
    }
    if (answer.questionId === 'waste-4') {
      const bags = typeof answer.value === 'number' ? answer.value : 0;
      if (bags > 5) patterns.push('high_waste');
    }

    // Water patterns
    if (answer.questionId === 'water-1') {
      if (val === 'wa1-long' || val === 'wa1-vlong') patterns.push('long_showers');
    }
    if (answer.questionId === 'water-2') {
      if (val === 'wa2-no' || val === 'wa2-unsure') patterns.push('high_water_usage');
    }
    if (answer.questionId === 'water-4') {
      if (val === 'wa4-electric') patterns.push('electric_heater');
      if (val === 'wa4-gas') patterns.push('gas_heater');
    }
  }

  return patterns;
}

/**
 * Get all recommendations for a specific category.
 */
export function getRecommendationsByCategory(
  category: AssessmentCategory
): Recommendation[] {
  return allRecommendations.filter((r) => r.category === category);
}
