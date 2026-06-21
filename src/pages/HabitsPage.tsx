/**
 * EcoPulse AI — Habits Page
 * Daily eco-friendly habit tracker with streak counters,
 * activity log, and progress analytics.
 */

import { CheckCircle2, Circle, Flame, Trophy, Leaf } from 'lucide-react';
import { Card, CardHeader } from '../components/common/Card';
import { ProgressBar } from '../components/common/ProgressBar';
import { StatusBadge } from '../components/common/Badge';
import { PageContainer } from '../components/layout/PageContainer';
import { useHabits } from '../contexts/HabitContext';
import { useGamification } from '../contexts/GamificationContext';
import { POINT_VALUES, CATEGORY_LABELS } from '../utils/constants';

export function HabitsPage() {
  const { habits, completeHabit, getTodayCompletedCount, getTotalSavingsToday } = useHabits();
  const { addPoints, addCarbonSaved, unlockBadge } = useGamification();

  const completedCount = getTodayCompletedCount();
  const totalSavings = getTotalSavingsToday();
  const totalHabits = habits.length;
  const completionPercentage = totalHabits > 0 ? (completedCount / totalHabits) * 100 : 0;

  const handleComplete = (habitId: string) => {
    const habit = habits.find((h) => h.id === habitId);
    if (!habit || habit.isCompletedToday) return;

    completeHabit(habitId);
    addPoints(POINT_VALUES.COMPLETE_HABIT);
    addCarbonSaved(habit.carbonSavingsPerAction);

    // Check for badge unlocks
    const newStreak = habit.streak + 1;
    if (newStreak >= 7) unlockBadge('badge-streak-7');
    if (newStreak >= 30) unlockBadge('badge-streak-30');
    if (newStreak >= 3) unlockBadge('badge-streak-3');
    if (habit.totalCompletions === 0) unlockBadge('badge-first-habit');
    if (completedCount + 1 >= 5) unlockBadge('badge-5-habits');
  };

  return (
    <PageContainer
      title="Habit Tracker"
      subtitle="Build eco-friendly habits and track your streaks"
    >
      {/* Today's Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <Card padding="md" glow>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
              <CheckCircle2 size={20} className="text-emerald-400" />
            </div>
            <div>
              <p className="text-sm text-slate-400">Completed Today</p>
              <p className="text-2xl font-bold text-white">{completedCount}/{totalHabits}</p>
            </div>
          </div>
          <ProgressBar value={completionPercentage} size="sm" color="emerald" />
        </Card>

        <Card padding="md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
              <Leaf size={20} className="text-green-400" />
            </div>
            <div>
              <p className="text-sm text-slate-400">CO₂ Saved Today</p>
              <p className="text-2xl font-bold text-green-400">{totalSavings.toFixed(1)} kg</p>
            </div>
          </div>
        </Card>

        <Card padding="md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
              <Trophy size={20} className="text-amber-400" />
            </div>
            <div>
              <p className="text-sm text-slate-400">Best Streak</p>
              <p className="text-2xl font-bold text-amber-400">
                {Math.max(...habits.map((h) => h.bestStreak), 0)} days
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Habits List */}
      <Card padding="md" className="mb-8">
        <CardHeader title="Today's Habits" subtitle="Tap to complete — build your streak!" />
        <div className="space-y-3">
          {habits.map((habit) => (
            <button
              key={habit.id}
              onClick={() => handleComplete(habit.id)}
              disabled={habit.isCompletedToday}
              className={`
                w-full flex items-center gap-4 px-4 py-4 rounded-xl border transition-all duration-300
                ${habit.isCompletedToday
                  ? 'bg-emerald-500/10 border-emerald-500/20 opacity-80'
                  : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 active:scale-[0.99]'
                }
              `.trim()}
              aria-label={`${habit.isCompletedToday ? 'Completed' : 'Complete'}: ${habit.title}`}
            >
              {/* Check Icon */}
              <div className={`flex-shrink-0 transition-transform duration-300 ${habit.isCompletedToday ? 'scale-110' : ''}`}>
                {habit.isCompletedToday ? (
                  <CheckCircle2 size={24} className="text-emerald-400" />
                ) : (
                  <Circle size={24} className="text-slate-500" />
                )}
              </div>

              {/* Emoji Icon */}
              <span className="text-2xl flex-shrink-0">{habit.icon}</span>

              {/* Content */}
              <div className="flex-1 text-left min-w-0">
                <p className={`font-medium ${habit.isCompletedToday ? 'text-emerald-300 line-through' : 'text-white'}`}>
                  {habit.title}
                </p>
                <p className="text-xs text-slate-500 truncate">{habit.description}</p>
              </div>

              {/* Streak */}
              {habit.streak > 0 && (
                <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-amber-500/10">
                  <Flame size={14} className="text-amber-400" />
                  <span className="text-xs font-semibold text-amber-400">{habit.streak}</span>
                </div>
              )}

              {/* Category Badge */}
              <StatusBadge variant="default" size="sm">
                {CATEGORY_LABELS[habit.category]?.split(' ')[0] || habit.category}
              </StatusBadge>
            </button>
          ))}
        </div>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {habits.map((habit) => (
          <Card key={habit.id} padding="md" hover>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">{habit.icon}</span>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-white truncate">{habit.title}</p>
                <p className="text-xs text-slate-500">{habit.totalCompletions} total completions</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div>
                <p className="text-lg font-bold text-emerald-400">{habit.streak}</p>
                <p className="text-xs text-slate-500">Current</p>
              </div>
              <div>
                <p className="text-lg font-bold text-amber-400">{habit.bestStreak}</p>
                <p className="text-xs text-slate-500">Best</p>
              </div>
              <div>
                <p className="text-lg font-bold text-blue-400">
                  {(habit.totalCompletions * habit.carbonSavingsPerAction).toFixed(1)}
                </p>
                <p className="text-xs text-slate-500">kg saved</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </PageContainer>
  );
}
