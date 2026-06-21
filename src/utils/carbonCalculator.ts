/**
 * EcoPulse AI — Carbon Calculator Engine
 * Core calculation logic that converts assessment answers into
 * a comprehensive carbon footprint score with per-category breakdown.
 */

import type {
  AssessmentAnswer,
  CarbonScore,
  EmissionBreakdown,
  ImpactLevel,
} from '../types';
import { AssessmentCategory } from '../types';
import { IMPACT_THRESHOLDS, NATIONAL_AVERAGE_CO2E, CATEGORY_COLORS, CATEGORY_LABELS, CATEGORY_ICONS } from './constants';

/**
 * Calculate the total annual CO₂e from a set of assessment answers.
 */
export function calculateCarbonScore(answers: AssessmentAnswer[]): CarbonScore {
  // Sum up contributions per category
  const categoryTotals = new Map<AssessmentCategory, number>();

  // Initialize all categories to 0
  Object.values(AssessmentCategory).forEach((cat) => {
    categoryTotals.set(cat, 0);
  });

  // Accumulate per-answer contributions
  answers.forEach((answer) => {
    const current = categoryTotals.get(answer.category) || 0;
    categoryTotals.set(answer.category, current + answer.carbonContribution);
  });

  // Total annual emissions
  const totalAnnual = Array.from(categoryTotals.values()).reduce((sum, val) => sum + val, 0);

  // Build breakdown
  const breakdown: EmissionBreakdown[] = Array.from(categoryTotals.entries())
    .map(([category, amount]) => ({
      category,
      amount: Math.round(amount),
      percentage: totalAnnual > 0 ? Math.round((amount / totalAnnual) * 100) : 0,
      label: CATEGORY_LABELS[category] || category,
      color: CATEGORY_COLORS[category] || '#94a3b8',
      icon: CATEGORY_ICONS[category] || 'Circle',
    }))
    .sort((a, b) => b.amount - a.amount);

  // Determine impact level
  const impactLevel = getImpactLevel(totalAnnual);

  // Calculate score 0-100 (lower = better, capped at 100)
  const score = Math.min(100, Math.round((totalAnnual / (NATIONAL_AVERAGE_CO2E * 2)) * 100));

  // Comparison to national average
  const comparedToAverage = totalAnnual > 0
    ? Math.round(((totalAnnual - NATIONAL_AVERAGE_CO2E) / NATIONAL_AVERAGE_CO2E) * 100)
    : -100;

  // Top contributing factors (top 3 categories)
  const topFactors = breakdown
    .slice(0, 3)
    .map((b) => `${b.label}: ${b.percentage}%`);

  return {
    totalAnnual: Math.round(totalAnnual),
    totalTonnes: parseFloat((totalAnnual / 1000).toFixed(2)),
    impactLevel,
    score,
    breakdown,
    comparedToAverage,
    topFactors,
    calculatedAt: new Date().toISOString(),
  };
}

/**
 * Classify the impact level based on total annual emissions.
 */
function getImpactLevel(totalAnnual: number): ImpactLevel {
  if (totalAnnual <= IMPACT_THRESHOLDS.LOW) return 'low' as ImpactLevel;
  if (totalAnnual <= IMPACT_THRESHOLDS.MODERATE) return 'moderate' as ImpactLevel;
  return 'high' as ImpactLevel;
}

/**
 * Calculate the carbon contribution for a single assessment answer.
 * This is called when the user answers each question.
 */
export function calculateAnswerContribution(
  questionId: string,
  value: string | number | string[],
  emissionFactor: number,
  weight: number
): number {
  let numericValue: number;

  if (typeof value === 'number') {
    numericValue = value;
  } else if (typeof value === 'string') {
    numericValue = parseFloat(value) || 0;
  } else if (Array.isArray(value)) {
    // For multiple-choice, sum all selected values
    numericValue = value.length;
  } else {
    numericValue = 0;
  }

  // Annual contribution = value × emission factor × weight
  // The emission factor already accounts for annualization in the question data
  void questionId; // used for logging if needed
  return numericValue * emissionFactor * weight;
}

/**
 * Get improvement suggestions based on the carbon score breakdown.
 */
export function getTopImprovementAreas(breakdown: EmissionBreakdown[]): string[] {
  return breakdown
    .filter((b) => b.percentage > 15)
    .map((b) => {
      switch (b.category) {
        case AssessmentCategory.Transportation:
          return 'Consider reducing car usage — try cycling, carpooling, or public transit.';
        case AssessmentCategory.Electricity:
          return 'Optimize energy usage — switch to LED bulbs and use energy-efficient appliances.';
        case AssessmentCategory.Food:
          return 'Reduce meat consumption — try plant-based meals a few days a week.';
        case AssessmentCategory.Shopping:
          return 'Buy less, choose quality — opt for sustainable and second-hand products.';
        case AssessmentCategory.Waste:
          return 'Reduce, reuse, recycle — compost organic waste and minimize single-use items.';
        case AssessmentCategory.Water:
          return 'Conserve water — fix leaks, take shorter showers, and collect rainwater.';
        default:
          return '';
      }
    })
    .filter(Boolean);
}

/**
 * Estimate potential carbon savings if all recommended actions are followed.
 */
export function estimatePotentialSavings(currentScore: CarbonScore): number {
  // Estimate 20-40% reduction potential based on impact level
  const reductionFactor =
    currentScore.impactLevel === 'high' ? 0.4 :
    currentScore.impactLevel === 'moderate' ? 0.3 : 0.2;
  return Math.round(currentScore.totalAnnual * reductionFactor);
}
