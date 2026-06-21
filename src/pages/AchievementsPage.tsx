/**
 * EcoPulse AI — Achievements Page
 * Badges, levels, weekly challenges, and gamification overview.
 */

import { useState, type ReactNode } from 'react';
import { Trophy, Lock, Star, Flame, Target, Award, Sparkles } from 'lucide-react';
import { Card } from '../components/common/Card';
import { ProgressBar } from '../components/common/ProgressBar';
import { StatusBadge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { PageContainer } from '../components/layout/PageContainer';
import { useGamification } from '../contexts/GamificationContext';
import { formatNumber, formatDate } from '../utils/formatters';
import { SUSTAINABILITY_LEVELS } from '../utils/constants';

type TabType = 'badges' | 'challenges' | 'levels';

export function AchievementsPage() {
  const {
    state: gamification,
    getUnlockedBadges,
    getLockedBadges,
    getProgressToNextLevel,
    startNewChallenges,
    updateChallengeProgress,
  } = useGamification();

  const [activeTab, setActiveTab] = useState<TabType>('badges');
  const unlockedBadges = getUnlockedBadges();
  const lockedBadges = getLockedBadges();

  const tabs: { id: TabType; label: string; icon: ReactNode }[] = [
    { id: 'badges', label: 'Badges', icon: <Award size={16} /> },
    { id: 'challenges', label: 'Challenges', icon: <Target size={16} /> },
    { id: 'levels', label: 'Levels', icon: <Star size={16} /> },
  ];

  return (
    <PageContainer
      title="Achievements"
      subtitle="Track your progress, earn badges, and take on challenges"
    >
      {/* Stats Overview */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <Card padding="md" className="text-center">
          <Flame size={24} className="text-amber-400 mx-auto mb-2" />
          <p className="text-2xl font-bold text-white">{formatNumber(gamification.ecoPoints)}</p>
          <p className="text-xs text-slate-500">Eco Points</p>
        </Card>
        <Card padding="md" className="text-center">
          <Trophy size={24} className="text-purple-400 mx-auto mb-2" />
          <p className="text-2xl font-bold text-white">{unlockedBadges.length}</p>
          <p className="text-xs text-slate-500">Badges Earned</p>
        </Card>
        <Card padding="md" className="text-center">
          <Target size={24} className="text-blue-400 mx-auto mb-2" />
          <p className="text-2xl font-bold text-white">{gamification.completedChallenges.length}</p>
          <p className="text-xs text-slate-500">Challenges Done</p>
        </Card>
        <Card padding="md" className="text-center">
          <Sparkles size={24} className="text-emerald-400 mx-auto mb-2" />
          <p className="text-2xl font-bold text-white">{gamification.totalCarbonSaved.toFixed(1)}</p>
          <p className="text-xs text-slate-500">kg CO₂ Saved</p>
        </Card>
      </div>

      {/* Level Progress */}
      <Card padding="md" glow className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-4xl">{gamification.currentLevel.icon}</span>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-white">{gamification.currentLevel.name}</h3>
            <p className="text-sm text-slate-400">Level {gamification.currentLevel.level}</p>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-emerald-400">{formatNumber(gamification.ecoPoints)} XP</p>
            <p className="text-xs text-slate-500">
              {gamification.currentLevel.maxPoints === Infinity
                ? 'Max level!'
                : `${formatNumber(gamification.currentLevel.maxPoints - gamification.ecoPoints)} to next`}
            </p>
          </div>
        </div>
        <ProgressBar
          value={getProgressToNextLevel()}
          showPercentage
          size="lg"
          color="emerald"
        />
      </Card>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-white/10 pb-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-t-xl
              transition-all duration-200 border-b-2
              ${activeTab === tab.id
                ? 'text-emerald-300 border-emerald-400 bg-emerald-500/10'
                : 'text-slate-400 border-transparent hover:text-white'
              }
            `.trim()}
            role="tab"
            aria-selected={activeTab === tab.id}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Badge Tab */}
      {activeTab === 'badges' && (
        <div>
          {/* Unlocked */}
          {unlockedBadges.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Award size={18} className="text-amber-400" />
                Earned ({unlockedBadges.length})
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {unlockedBadges.map((badge) => (
                  <Card key={badge.id} padding="md" className="text-center" glow>
                    <div className="text-4xl mb-3">{badge.icon}</div>
                    <h4 className="text-sm font-bold text-white mb-1">{badge.name}</h4>
                    <p className="text-xs text-slate-400 mb-2">{badge.description}</p>
                    <StatusBadge variant="success" size="sm">
                      +{badge.pointsReward} pts
                    </StatusBadge>
                    {badge.unlockedAt && (
                      <p className="text-xs text-slate-500 mt-2">
                        Earned {formatDate(badge.unlockedAt, 'short')}
                      </p>
                    )}
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Locked */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Lock size={18} className="text-slate-500" />
              Locked ({lockedBadges.length})
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {lockedBadges.map((badge) => (
                <Card key={badge.id} padding="md" className="text-center opacity-60">
                  <div className="text-4xl mb-3 grayscale">{badge.icon}</div>
                  <h4 className="text-sm font-bold text-slate-400 mb-1">{badge.name}</h4>
                  <p className="text-xs text-slate-500 mb-2">{badge.criteria}</p>
                  <StatusBadge variant="default" size="sm">
                    +{badge.pointsReward} pts
                  </StatusBadge>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Challenges Tab */}
      {activeTab === 'challenges' && (
        <div>
          {gamification.activeChallenges.length === 0 ? (
            <Card padding="lg" className="text-center">
              <Target size={40} className="text-slate-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">No Active Challenges</h3>
              <p className="text-sm text-slate-400 mb-6">Start new weekly challenges to earn bonus eco-points!</p>
              <Button onClick={startNewChallenges} icon={<Sparkles size={16} />}>
                Start Weekly Challenges
              </Button>
            </Card>
          ) : (
            <div className="space-y-4">
              {gamification.activeChallenges.map((challenge) => (
                <Card key={challenge.id} padding="md">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                      <Target size={22} className="text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-white">{challenge.title}</h4>
                        <StatusBadge variant="info" size="sm">
                          +{challenge.pointsReward} pts
                        </StatusBadge>
                      </div>
                      <p className="text-sm text-slate-400 mb-3">{challenge.description}</p>
                      <ProgressBar
                        value={(challenge.progress / challenge.target) * 100}
                        label={`${challenge.progress}/${challenge.target} completed`}
                        showPercentage
                        size="sm"
                        color="blue"
                      />
                      <div className="flex gap-2 mt-3">
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => updateChallengeProgress(challenge.id, challenge.progress + 1)}
                          disabled={challenge.progress >= challenge.target}
                        >
                          Log Progress
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
              <div className="text-center pt-4">
                <Button variant="ghost" onClick={startNewChallenges} icon={<Sparkles size={14} />}>
                  Get More Challenges
                </Button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Levels Tab */}
      {activeTab === 'levels' && (
        <div className="space-y-3">
          {SUSTAINABILITY_LEVELS.map((level) => {
            const isCurrent = gamification.currentLevel.level === level.level;
            const isReached = gamification.ecoPoints >= level.minPoints;
            return (
              <Card
                key={level.level}
                padding="md"
                className={`${isCurrent ? 'ring-2 ring-emerald-400/30' : ''} ${!isReached ? 'opacity-50' : ''}`}
                glow={isCurrent}
              >
                <div className="flex items-center gap-4">
                  <span className={`text-3xl ${!isReached ? 'grayscale' : ''}`}>{level.icon}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-white">Level {level.level}: {level.name}</h4>
                      {isCurrent && <StatusBadge variant="success" size="sm" dot>Current</StatusBadge>}
                      {isReached && !isCurrent && <StatusBadge variant="default" size="sm">Reached</StatusBadge>}
                    </div>
                    <p className="text-sm text-slate-500">
                      {level.minPoints.toLocaleString()} — {level.maxPoints === Infinity ? '∞' : level.maxPoints.toLocaleString()} XP
                    </p>
                  </div>
                  {isReached && (
                    <Star size={20} className="text-amber-400" />
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </PageContainer>
  );
}
