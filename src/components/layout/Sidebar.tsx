/**
 * EcoPulse AI — Sidebar Component
 * Desktop sidebar navigation with icons and active state.
 */

import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, ClipboardCheck, MessageCircle,
  CheckSquare, Target, Trophy, Settings, Leaf,
} from 'lucide-react';
import { NAV_ITEMS, ROUTES } from '../../utils/constants';
import { useGamification } from '../../contexts/GamificationContext';
import { ProgressBar } from '../common/ProgressBar';

/** Map icon names to Lucide components */
const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  LayoutDashboard,
  ClipboardCheck,
  MessageCircle,
  CheckSquare,
  Target,
  Trophy,
  Settings,
};

export function Sidebar() {
  const location = useLocation();
  const { state: gamification, getProgressToNextLevel } = useGamification();

  // Don't show sidebar on landing page
  if (location.pathname === ROUTES.HOME) return null;

  return (
    <aside
      className="hidden lg:flex flex-col w-64 bg-slate-900/50 backdrop-blur-xl border-r border-white/10 h-[calc(100vh-4rem)] sticky top-16"
      role="complementary"
      aria-label="Sidebar navigation"
    >
      {/* Level Card */}
      <div className="p-4 m-4 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-2xl">{gamification.currentLevel.icon}</span>
          <div>
            <p className="text-sm font-semibold text-white">{gamification.currentLevel.name}</p>
            <p className="text-xs text-slate-400">Level {gamification.currentLevel.level}</p>
          </div>
        </div>
        <ProgressBar
          value={getProgressToNextLevel()}
          size="sm"
          color="emerald"
          showPercentage={false}
        />
        <p className="text-xs text-slate-400 mt-1.5">
          {gamification.ecoPoints} XP
        </p>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-2 space-y-1" aria-label="Page navigation">
        {NAV_ITEMS.map((item) => {
          const Icon = iconMap[item.icon] || Leaf;
          const isActive = location.pathname === item.path;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={`
                flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium
                transition-all duration-200 group
                ${isActive
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
                }
              `.trim()}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon
                size={18}
                className={`transition-colors ${isActive ? 'text-emerald-400' : 'text-slate-500 group-hover:text-slate-300'}`}
              />
              {item.label}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-white/5">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Leaf size={12} />
          <span>EcoPulse AI v1.0</span>
        </div>
      </div>
    </aside>
  );
}
