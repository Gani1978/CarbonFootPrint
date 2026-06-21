/**
 * EcoPulse AI — Landing Page
 * Stunning hero section with animated elements, feature highlights,
 * and onboarding flow to create user profile.
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Leaf, ArrowRight, Sparkles, BarChart3, MessageCircle, Trophy, Target, CheckCircle2 } from 'lucide-react';
import { Button } from '../components/common/Button';
import { useApp } from '../contexts/AppContext';
import { useGamification } from '../contexts/GamificationContext';
import { validateName } from '../utils/validators';
import { ROUTES } from '../utils/constants';
import { ThemeMode } from '../types';
import type { UserProfile } from '../types';

const features = [
  {
    icon: <Sparkles size={24} />,
    title: 'AI Carbon Assessment',
    description: 'Interactive questionnaire analyzes your lifestyle across 6 categories to calculate your carbon footprint.',
    color: 'from-emerald-400 to-teal-400',
  },
  {
    icon: <BarChart3 size={24} />,
    title: 'Smart Dashboard',
    description: 'Beautiful visualizations show your emission breakdown, trends, and progress over time.',
    color: 'from-blue-400 to-cyan-400',
  },
  {
    icon: <MessageCircle size={24} />,
    title: 'AI Sustainability Coach',
    description: 'Conversational chatbot provides personalized advice based on your habits and goals.',
    color: 'from-purple-400 to-indigo-400',
  },
  {
    icon: <Target size={24} />,
    title: 'Personalized Action Plans',
    description: 'Custom short-term and long-term goals with estimated carbon savings and difficulty levels.',
    color: 'from-amber-400 to-orange-400',
  },
  {
    icon: <CheckCircle2 size={24} />,
    title: 'Habit Tracker',
    description: 'Track daily eco-friendly activities, build streaks, and see your cumulative impact.',
    color: 'from-rose-400 to-pink-400',
  },
  {
    icon: <Trophy size={24} />,
    title: 'Gamification',
    description: 'Earn eco-points, unlock achievement badges, level up, and take on weekly challenges.',
    color: 'from-yellow-400 to-amber-400',
  },
];

export function LandingPage() {
  const navigate = useNavigate();
  const { state: appState, updateUser } = useApp();
  const { unlockBadge } = useGamification();
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');

  // If user already exists, redirect to dashboard
  useEffect(() => {
    if (appState.user?.hasCompletedOnboarding) {
      navigate(ROUTES.DASHBOARD, { replace: true });
    }
  }, [appState.user, navigate]);

  if (appState.user?.hasCompletedOnboarding) {
    return null;
  }

  const handleGetStarted = () => {
    setShowOnboarding(true);
  };

  const handleCreateProfile = () => {
    const validation = validateName(name);
    if (!validation.isValid) {
      setNameError(validation.error || 'Invalid name');
      return;
    }

    const user: UserProfile = {
      id: `user-${Date.now()}`,
      name: name.trim(),
      avatarInitial: name.trim().charAt(0).toUpperCase(),
      joinedAt: new Date().toISOString(),
      hasCompletedAssessment: false,
      hasCompletedOnboarding: true,
      theme: ThemeMode.Dark,
    };

    updateUser(user);
    unlockBadge('badge-early-adopter');
    navigate(ROUTES.ASSESSMENT);
  };

  return (
    <div className="min-h-screen bg-slate-950 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-3xl" />
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>

      {/* Hero Section */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-20 sm:pt-32 pb-16">
        {/* Top badge */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-sm">
            <Sparkles size={14} />
            <span>AI-Powered Sustainability Coach</span>
          </div>
        </div>

        {/* Hero Title */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
            Track, Reduce &{' '}
            <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
              Transform
            </span>{' '}
            Your Carbon Footprint
          </h1>

          <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            EcoPulse AI analyzes your lifestyle habits, provides personalized insights,
            and coaches you toward a more sustainable future — one small action at a time.
          </p>

          {/* CTA Buttons */}
          {!showOnboarding && (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                onClick={handleGetStarted}
                icon={<ArrowRight size={18} />}
                iconPosition="right"
                id="get-started-btn"
              >
                Get Started — It's Free
              </Button>
              <Button
                variant="secondary"
                size="lg"
                onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Learn More
              </Button>
            </div>
          )}

          {/* Onboarding Form */}
          {showOnboarding && (
            <div className="max-w-md mx-auto mt-8 p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center mx-auto mb-5">
                <Leaf size={28} className="text-white" />
              </div>
              <h2 className="text-xl font-bold text-white mb-2">Welcome aboard! 🌱</h2>
              <p className="text-slate-400 text-sm mb-6">
                Let's start by getting your name. We'll calculate your carbon footprint next.
              </p>

              <div className="space-y-4">
                <div>
                  <label htmlFor="user-name" className="block text-sm font-medium text-slate-300 mb-1.5 text-left">
                    Your Name
                  </label>
                  <input
                    id="user-name"
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      setNameError('');
                    }}
                    onKeyDown={(e) => e.key === 'Enter' && handleCreateProfile()}
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:border-emerald-400/50 transition-all"
                    maxLength={50}
                    autoFocus
                    aria-describedby={nameError ? 'name-error' : undefined}
                    aria-invalid={!!nameError}
                  />
                  {nameError && (
                    <p id="name-error" className="text-rose-400 text-sm mt-1.5 text-left" role="alert">
                      {nameError}
                    </p>
                  )}
                </div>

                <Button fullWidth size="lg" onClick={handleCreateProfile} icon={<ArrowRight size={18} />} iconPosition="right">
                  Start Assessment
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Stats Bar */}
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-16 mt-20 text-center">
          {[
            { value: '24', label: 'Assessment Questions' },
            { value: '6', label: 'Life Categories' },
            { value: '17+', label: 'Badges to Earn' },
            { value: '∞', label: 'Carbon to Save' },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                {stat.value}
              </p>
              <p className="text-sm text-slate-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <section id="features" className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-20">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Everything You Need to{' '}
            <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              Go Green
            </span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            A comprehensive toolkit powered by AI to help you understand and reduce your environmental impact.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              className="group p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-20 text-center">
        <div className="p-10 rounded-3xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Ready to Make a Difference? 🌍
          </h2>
          <p className="text-slate-400 mb-8 max-w-lg mx-auto">
            Join the movement toward a sustainable future. Your journey starts with understanding your impact.
          </p>
          <Button
            size="lg"
            onClick={handleGetStarted}
            icon={<ArrowRight size={18} />}
            iconPosition="right"
          >
            Calculate Your Carbon Footprint
          </Button>
        </div>
      </section>
    </div>
  );
}
