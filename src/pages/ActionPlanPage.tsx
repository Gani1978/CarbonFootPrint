/**
 * EcoPulse AI — Action Plan Page
 * Personalized action plan with short-term and long-term goals,
 * estimated savings, and difficulty levels.
 */

import { useMemo, useState } from 'react';
import { CheckCircle2, Circle, Clock, TrendingDown, Zap, ArrowRight, Leaf } from 'lucide-react';
import { Card } from '../components/common/Card';
import { StatusBadge } from '../components/common/Badge';
import { ProgressBar } from '../components/common/ProgressBar';
import { PageContainer } from '../components/layout/PageContainer';
import { useApp } from '../contexts/AppContext';
import { useGamification } from '../contexts/GamificationContext';
import { generateActionPlan, calculateTotalSavings } from '../data/actionPlans';
import { formatCO2, formatDuration } from '../utils/formatters';
import { POINT_VALUES, CATEGORY_LABELS } from '../utils/constants';
import type { ActionItem } from '../types';
import { DifficultyLevel, AssessmentCategory } from '../types';

const difficultyConfig = {
  [DifficultyLevel.Easy]: { label: 'Easy', variant: 'success' as const, color: 'text-emerald-400' },
  [DifficultyLevel.Medium]: { label: 'Medium', variant: 'warning' as const, color: 'text-amber-400' },
  [DifficultyLevel.Hard]: { label: 'Hard', variant: 'danger' as const, color: 'text-rose-400' },
};

export function ActionPlanPage() {
  const { state: appState } = useApp();
  const { addPoints } = useGamification();
  const [completedActions, setCompletedActions] = useState<Set<string>>(new Set());

  const plan = useMemo(() => {
    const topCategories = appState.carbonScore
      ? appState.carbonScore.breakdown
          .slice(0, 3)
          .map((b) => b.category as AssessmentCategory)
      : [AssessmentCategory.Transportation, AssessmentCategory.Food, AssessmentCategory.Electricity];
    return generateActionPlan(topCategories);
  }, [appState.carbonScore]);

  const totalSavings = calculateTotalSavings([...plan.shortTerm, ...plan.longTerm]);

  const handleToggleAction = (actionId: string) => {
    setCompletedActions((prev) => {
      const next = new Set(prev);
      if (next.has(actionId)) {
        next.delete(actionId);
      } else {
        next.add(actionId);
        addPoints(POINT_VALUES.COMPLETE_ACTION);
      }
      return next;
    });
  };

  const renderActionCard = (action: ActionItem) => {
    const isCompleted = completedActions.has(action.id);
    const diffConfig = difficultyConfig[action.difficulty];

    return (
      <div
        key={action.id}
        className={`
          p-5 rounded-xl border transition-all duration-300
          ${isCompleted
            ? 'bg-emerald-500/5 border-emerald-500/20'
            : 'bg-white/5 border-white/10 hover:bg-white/10'
          }
        `.trim()}
      >
        <div className="flex items-start gap-4">
          <button
            onClick={() => handleToggleAction(action.id)}
            className="mt-0.5 flex-shrink-0 transition-transform duration-300 hover:scale-110"
            aria-label={isCompleted ? 'Mark incomplete' : 'Mark complete'}
          >
            {isCompleted ? (
              <CheckCircle2 size={22} className="text-emerald-400" />
            ) : (
              <Circle size={22} className="text-slate-500" />
            )}
          </button>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <h4 className={`font-semibold ${isCompleted ? 'text-emerald-300 line-through' : 'text-white'}`}>
                {action.title}
              </h4>
              <StatusBadge variant={diffConfig.variant} size="sm">
                {diffConfig.label}
              </StatusBadge>
            </div>

            <p className="text-sm text-slate-400 mb-3">{action.description}</p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <TrendingDown size={12} className="text-emerald-400" />
                Save {formatCO2(action.estimatedSavings)}/yr
              </span>
              <span className="flex items-center gap-1">
                <Clock size={12} />
                {formatDuration(action.timeframe * 7)}
              </span>
              <span className="flex items-center gap-1">
                <Leaf size={12} />
                {CATEGORY_LABELS[action.category]}
              </span>
            </div>

            {/* Tips */}
            {action.tips.length > 0 && !isCompleted && (
              <div className="mt-3 p-3 rounded-lg bg-white/5 border border-white/5">
                <p className="text-xs font-medium text-slate-300 mb-1.5">💡 Tips:</p>
                <ul className="space-y-1">
                  {action.tips.map((tip, i) => (
                    <li key={i} className="text-xs text-slate-400 flex items-start gap-1.5">
                      <span className="text-emerald-400 mt-0.5">•</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const shortTermCompleted = plan.shortTerm.filter((a) => completedActions.has(a.id)).length;
  const longTermCompleted = plan.longTerm.filter((a) => completedActions.has(a.id)).length;

  return (
    <PageContainer
      title="Your Action Plan"
      subtitle="Personalized steps to reduce your carbon footprint"
    >
      {/* Summary Banner */}
      <Card glow padding="md" className="mb-8">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-400/20 to-teal-400/20 flex items-center justify-center flex-shrink-0">
            <Zap size={28} className="text-emerald-400" />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h2 className="text-xl font-bold text-white mb-1">
              Potential Savings: {formatCO2(totalSavings)}/year
            </h2>
            <p className="text-sm text-slate-400">
              By completing all actions below, you could reduce your carbon footprint by{' '}
              <span className="text-emerald-400 font-medium">
                {appState.carbonScore
                  ? Math.round((totalSavings / appState.carbonScore.totalAnnual) * 100)
                  : 25}%
              </span>
            </p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-emerald-400">
              {shortTermCompleted + longTermCompleted}
            </p>
            <p className="text-xs text-slate-500">actions done</p>
          </div>
        </div>
      </Card>

      {/* Short-term Goals */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Zap size={18} className="text-amber-400" />
              Short-term Goals
            </h2>
            <p className="text-sm text-slate-500">Quick wins you can start this week</p>
          </div>
          <StatusBadge variant="warning">
            {shortTermCompleted}/{plan.shortTerm.length}
          </StatusBadge>
        </div>
        <ProgressBar
          value={(shortTermCompleted / plan.shortTerm.length) * 100}
          size="sm"
          color="amber"
          className="mb-4"
        />
        <div className="space-y-3">
          {plan.shortTerm.map(renderActionCard)}
        </div>
      </div>

      {/* Long-term Goals */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <ArrowRight size={18} className="text-blue-400" />
              Long-term Goals
            </h2>
            <p className="text-sm text-slate-500">Bigger changes for lasting impact</p>
          </div>
          <StatusBadge variant="info">
            {longTermCompleted}/{plan.longTerm.length}
          </StatusBadge>
        </div>
        <ProgressBar
          value={plan.longTerm.length > 0 ? (longTermCompleted / plan.longTerm.length) * 100 : 0}
          size="sm"
          color="blue"
          className="mb-4"
        />
        <div className="space-y-3">
          {plan.longTerm.map(renderActionCard)}
        </div>
      </div>
    </PageContainer>
  );
}
