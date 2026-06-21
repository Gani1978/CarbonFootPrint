/**
 * EcoPulse AI — Navbar Component
 * Responsive top navigation bar with mobile menu, eco-points display,
 * and active route highlighting.
 */

import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Leaf, Flame } from 'lucide-react';
import { NAV_ITEMS, ROUTES } from '../../utils/constants';
import { useGamification } from '../../contexts/GamificationContext';
import { useApp } from '../../contexts/AppContext';
import { formatNumber } from '../../utils/formatters';

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { state: gamification } = useGamification();
  const { state: appState } = useApp();

  // Don't show navbar on landing page
  if (location.pathname === ROUTES.HOME) return null;

  return (
    <nav
      className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur-xl border-b border-white/10"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to={ROUTES.DASHBOARD}
            className="flex items-center gap-2 text-white font-bold text-lg hover:opacity-90 transition-opacity"
            aria-label="EcoPulse AI Home"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center">
              <Leaf size={18} className="text-white" />
            </div>
            <span className="hidden sm:block bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              EcoPulse AI
            </span>
          </Link>

          {/* Desktop Navigation (Hidden on lg+ since sidebar is visible) */}
          <div className="hidden md:flex lg:hidden items-center gap-1">
            {NAV_ITEMS.slice(0, 5).map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`
                    px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
                    ${isActive
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'text-slate-300 hover:text-white hover:bg-white/10'
                    }
                  `.trim()}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Right section: Points + Avatar */}
          <div className="flex items-center gap-3">
            {/* Eco Points */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20">
              <Flame size={14} className="text-amber-400" />
              <span className="text-sm font-semibold text-amber-300">
                {formatNumber(gamification.ecoPoints)}
              </span>
            </div>

            {/* User Avatar */}
            {appState.user && (
              <Link
                to={ROUTES.SETTINGS}
                className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white text-sm font-bold hover:ring-2 hover:ring-emerald-400/50 transition-all"
                aria-label="Settings"
              >
                {appState.user.avatarInitial}
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-slate-900/95 backdrop-blur-xl">
          <div className="px-4 py-3 space-y-1">
            {NAV_ITEMS.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`
                    block px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200
                    ${isActive
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'text-slate-300 hover:text-white hover:bg-white/10'
                    }
                  `.trim()}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}
