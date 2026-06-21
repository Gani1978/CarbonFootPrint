/**
 * EcoPulse AI — Dashboard Page
 * Main insights hub with carbon score visualization, emission breakdown,
 * weekly trends, and goal tracking using Recharts.
 */

import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  PieChart, Pie, Cell, ResponsiveContainer, AreaChart, Area, XAxis, YAxis,
  Tooltip, CartesianGrid,
} from 'recharts';
import { TrendingDown, TrendingUp, ArrowRight, Leaf, Flame, Target, Award } from 'lucide-react';
import { Card, CardHeader } from '../components/common/Card';
import { ProgressBar } from '../components/common/ProgressBar';
import { StatusBadge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { PageContainer } from '../components/layout/PageContainer';
import { useApp } from '../contexts/AppContext';
import { useGamification } from '../contexts/GamificationContext';
import { useHabits } from '../contexts/HabitContext';
import { formatCO2, formatNumber, getTimeGreeting } from '../utils/formatters';
import { ROUTES } from '../utils/constants';

/** Generate mock weekly trend data */
function generateWeeklyTrend(): { day: string; value: number }[] {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  return days.map((day) => ({
    day,
    value: Math.round(3 + Math.random() * 8),
  }));
}

export function DashboardPage() {
  const navigate = useNavigate();
  const { state: appState } = useApp();
  const { state: gamification, getProgressToNextLevel } = useGamification();
  const { habits, getTodayCompletedCount, getTotalSavingsToday } = useHabits();
  const { carbonScore, user } = appState;

  const weeklyTrend = useMemo(() => generateWeeklyTrend(), []);

  // If no assessment done, show prompt
  if (!carbonScore) {
    return (
      <PageContainer title="Dashboard">
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-emerald-400/20 to-teal-400/20 flex items-center justify-center mb-6">
            <Leaf size={40} className="text-emerald-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-3">
            Complete Your Assessment First
          </h2>
          <p className="text-slate-400 max-w-md mb-8">
            Take the carbon footprint assessment to unlock your personalized dashboard
            with insights, trends, and recommendations.
          </p>
          <Button onClick={() => navigate(ROUTES.ASSESSMENT)} icon={<ArrowRight size={16} />} iconPosition="right">
            Start Assessment
          </Button>
        </div>
      </PageContainer>
    );
  }

  const impactColors = {
    low: { bg: 'from-emerald-400 to-green-400', text: 'text-emerald-400', badge: 'success' as const },
    moderate: { bg: 'from-amber-400 to-orange-400', text: 'text-amber-400', badge: 'warning' as const },
    high: { bg: 'from-rose-400 to-red-400', text: 'text-rose-400', badge: 'danger' as const },
  };
  const impact = impactColors[carbonScore.impactLevel];

  return (
    <PageContainer
      title={`${getTimeGreeting()}, ${user?.name || 'there'}!`}
      subtitle="Here's your sustainability overview"
    >
      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {/* Carbon Score */}
        <Card glow padding="md">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-400">Carbon Score</span>
            <StatusBadge variant={impact.badge} dot>
              {carbonScore.impactLevel.charAt(0).toUpperCase() + carbonScore.impactLevel.slice(1)} Impact
            </StatusBadge>
          </div>
          <p className={`text-3xl font-bold ${impact.text}`}>
            {formatCO2(carbonScore.totalAnnual)}
          </p>
          <p className="text-xs text-slate-500 mt-1">per year</p>
        </Card>

        {/* Eco Points */}
        <Card hover padding="md" onClick={() => navigate(ROUTES.ACHIEVEMENTS)}>
          <div className="flex items-center gap-2 mb-2">
            <Flame size={16} className="text-amber-400" />
            <span className="text-sm text-slate-400">Eco Points</span>
          </div>
          <p className="text-3xl font-bold text-amber-400">
            {formatNumber(gamification.ecoPoints)}
          </p>
          <p className="text-xs text-slate-500 mt-1">Level {gamification.currentLevel.level} — {gamification.currentLevel.name}</p>
        </Card>

        {/* Today's Habits */}
        <Card hover padding="md" onClick={() => navigate(ROUTES.HABITS)}>
          <div className="flex items-center gap-2 mb-2">
            <Target size={16} className="text-blue-400" />
            <span className="text-sm text-slate-400">Today's Habits</span>
          </div>
          <p className="text-3xl font-bold text-blue-400">
            {getTodayCompletedCount()}/{habits.length}
          </p>
          <p className="text-xs text-slate-500 mt-1">{getTotalSavingsToday().toFixed(1)} kg CO₂ saved</p>
        </Card>

        {/* Badges */}
        <Card hover padding="md" onClick={() => navigate(ROUTES.ACHIEVEMENTS)}>
          <div className="flex items-center gap-2 mb-2">
            <Award size={16} className="text-purple-400" />
            <span className="text-sm text-slate-400">Badges Earned</span>
          </div>
          <p className="text-3xl font-bold text-purple-400">
            {gamification.badges.filter((b) => b.isUnlocked).length}
          </p>
          <p className="text-xs text-slate-500 mt-1">of {gamification.badges.length} total</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Emission Breakdown Donut Chart */}
        <Card padding="md">
          <CardHeader title="Emission Breakdown" subtitle="Annual CO₂e by category" />
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="w-48 h-48 flex-shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={carbonScore.breakdown}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    dataKey="amount"
                    strokeWidth={2}
                    stroke="rgba(15,23,42,0.8)"
                  >
                    {carbonScore.breakdown.map((entry) => (
                      <Cell key={entry.category} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(30,41,59,0.95)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '12px',
                      color: '#fff',
                      fontSize: '13px',
                    }}
                    formatter={(value) => [`${formatCO2(Number(value))}`, 'Emissions']}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex-1 space-y-3 w-full">
              {carbonScore.breakdown.map((item) => (
                <div key={item.category} className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                  <span className="text-sm text-slate-300 flex-1">{item.label}</span>
                  <span className="text-sm font-medium text-white">{item.percentage}%</span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Weekly Trend */}
        <Card padding="md">
          <CardHeader
            title="Weekly Carbon Trend"
            subtitle="Daily estimated emissions (kg CO₂e)"
            action={
              <div className="flex items-center gap-1 text-emerald-400 text-sm">
                <TrendingDown size={14} />
                <span>-12%</span>
              </div>
            }
          />
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyTrend}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#34d399" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#34d399" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="day" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(30,41,59,0.95)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '13px',
                  }}
                  formatter={(value) => [`${value} kg CO₂e`, 'Emissions']}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#34d399"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorValue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Level Progress */}
        <Card padding="md">
          <CardHeader title="Level Progress" icon={<span className="text-xl">{gamification.currentLevel.icon}</span>} />
          <div className="text-center mb-4">
            <p className="text-4xl mb-1">{gamification.currentLevel.icon}</p>
            <p className="text-lg font-bold text-white">{gamification.currentLevel.name}</p>
            <p className="text-sm text-slate-400">Level {gamification.currentLevel.level}</p>
          </div>
          <ProgressBar
            value={getProgressToNextLevel()}
            showPercentage
            label="Progress to next level"
            color="emerald"
          />
        </Card>

        {/* Quick Actions */}
        <Card padding="md">
          <CardHeader title="Quick Actions" />
          <div className="space-y-3">
            {[
              { label: 'Talk to AI Coach', path: ROUTES.CHATBOT, icon: '🤖', color: 'bg-purple-500/10 hover:bg-purple-500/20' },
              { label: 'View Action Plan', path: ROUTES.ACTION_PLAN, icon: '📋', color: 'bg-blue-500/10 hover:bg-blue-500/20' },
              { label: 'Track Habits', path: ROUTES.HABITS, icon: '✅', color: 'bg-emerald-500/10 hover:bg-emerald-500/20' },
              { label: 'See Achievements', path: ROUTES.ACHIEVEMENTS, icon: '🏆', color: 'bg-amber-500/10 hover:bg-amber-500/20' },
            ].map((action) => (
              <button
                key={action.path}
                onClick={() => navigate(action.path)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-white transition-all duration-200 ${action.color}`}
              >
                <span className="text-lg">{action.icon}</span>
                <span>{action.label}</span>
                <ArrowRight size={14} className="ml-auto text-slate-500" />
              </button>
            ))}
          </div>
        </Card>

        {/* Comparison */}
        <Card padding="md">
          <CardHeader title="How You Compare" />
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm text-slate-300">You</span>
                <span className="text-sm font-medium text-white">{formatCO2(carbonScore.totalAnnual)}</span>
              </div>
              <ProgressBar
                value={Math.min(100, (carbonScore.totalAnnual / 8000) * 100)}
                size="md"
                color={carbonScore.impactLevel === 'low' ? 'emerald' : carbonScore.impactLevel === 'moderate' ? 'amber' : 'rose'}
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm text-slate-300">National Avg</span>
                <span className="text-sm font-medium text-white">{formatCO2(1900)}</span>
              </div>
              <ProgressBar value={(1900 / 8000) * 100} size="md" color="blue" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm text-slate-300">Global Avg</span>
                <span className="text-sm font-medium text-white">{formatCO2(4700)}</span>
              </div>
              <ProgressBar value={(4700 / 8000) * 100} size="md" color="purple" />
            </div>
            <div className="pt-2 border-t border-white/10">
              <p className="text-sm text-slate-400">
                {carbonScore.comparedToAverage > 0 ? (
                  <span className="flex items-center gap-1">
                    <TrendingUp size={14} className="text-rose-400" />
                    {carbonScore.comparedToAverage}% above national average
                  </span>
                ) : (
                  <span className="flex items-center gap-1">
                    <TrendingDown size={14} className="text-emerald-400" />
                    {Math.abs(carbonScore.comparedToAverage)}% below national average
                  </span>
                )}
              </p>
            </div>
          </div>
        </Card>
      </div>
    </PageContainer>
  );
}
