/**
 * EcoPulse AI — Assessment Page
 * Multi-step carbon footprint assessment wizard with category navigation,
 * progress tracking, and animated transitions.
 */

import { useState, useMemo, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft, CheckCircle2, Car, Zap, UtensilsCrossed, ShoppingBag, Trash2, Droplets } from 'lucide-react';
import { Button } from '../components/common/Button';
import { ProgressBar } from '../components/common/ProgressBar';
import { Card } from '../components/common/Card';
import { PageContainer } from '../components/layout/PageContainer';
import { useAssessment } from '../contexts/AssessmentContext';
import { useApp } from '../contexts/AppContext';
import { useGamification } from '../contexts/GamificationContext';
import { assessmentQuestions, getAssessmentCategories } from '../data/questions';
import { calculateCarbonScore } from '../utils/carbonCalculator';
import { ROUTES, CATEGORY_LABELS, POINT_VALUES } from '../utils/constants';
import type { AssessmentAnswer } from '../types';

const categoryIcons: Record<string, ReactNode> = {
  transportation: <Car size={20} />,
  electricity: <Zap size={20} />,
  food: <UtensilsCrossed size={20} />,
  shopping: <ShoppingBag size={20} />,
  waste: <Trash2 size={20} />,
  water: <Droplets size={20} />,
};

export function AssessmentPage() {
  const navigate = useNavigate();
  const { state: assessmentState, submitAnswer, completeAssessment, getAnswer } = useAssessment();
  const { updateCarbonScore, updateUser, state: appState } = useApp();
  const { addPoints, unlockBadge } = useGamification();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [sliderValues, setSliderValues] = useState<Record<string, number>>({});
  const categories = getAssessmentCategories();
  const totalQuestions = assessmentQuestions.length;
  const currentQuestion = assessmentQuestions[currentIndex];

  // Track which categories are complete
  const categoryCompletion = useMemo(() => {
    const completion: Record<string, { total: number; answered: number }> = {};
    categories.forEach((cat) => {
      const catQuestions = assessmentQuestions.filter((q) => q.category === cat);
      const catAnswers = assessmentState.answers.filter((a) => a.category === cat);
      completion[cat] = { total: catQuestions.length, answered: catAnswers.length };
    });
    return completion;
  }, [assessmentState.answers, categories]);

  const handleSelectOption = (questionId: string, optionId: string, emissionFactor: number) => {
    const answer: AssessmentAnswer = {
      questionId,
      category: currentQuestion.category,
      value: optionId,
      carbonContribution: emissionFactor,
    };
    submitAnswer(answer);

    // Auto-advance after 300ms
    setTimeout(() => {
      if (currentIndex < totalQuestions - 1) {
        setCurrentIndex(currentIndex + 1);
      }
    }, 300);
  };

  const handleSliderChange = (questionId: string, value: number) => {
    setSliderValues((prev) => ({ ...prev, [questionId]: value }));
    const emissionFactor = currentQuestion.weight;
    const answer: AssessmentAnswer = {
      questionId,
      category: currentQuestion.category,
      value: value,
      carbonContribution: value * emissionFactor,
    };
    submitAnswer(answer);
  };

  const handleComplete = () => {
    const score = calculateCarbonScore(assessmentState.answers);
    updateCarbonScore(score);
    completeAssessment();

    // Award points and badges
    addPoints(POINT_VALUES.COMPLETE_ASSESSMENT);
    unlockBadge('badge-first-assessment');

    if (appState.user) {
      updateUser({ ...appState.user, hasCompletedAssessment: true });
    }

    navigate(ROUTES.DASHBOARD);
  };

  const getSelectedOption = (questionId: string): string | null => {
    const answer = getAnswer(questionId);
    return answer ? String(answer.value) : null;
  };

  const getSliderValue = (questionId: string): number => {
    const answer = getAnswer(questionId);
    if (answer && typeof answer.value === 'number') return answer.value;
    return sliderValues[questionId] ?? currentQuestion.defaultValue ?? 0;
  };

  const progress = ((currentIndex + 1) / totalQuestions) * 100;
  const isLastQuestion = currentIndex === totalQuestions - 1;
  const hasAnsweredCurrent = !!getAnswer(currentQuestion.id);

  return (
    <PageContainer
      title="Carbon Footprint Assessment"
      subtitle="Answer these questions to calculate your environmental impact"
    >
      {/* Category Navigation */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => {
          const completion = categoryCompletion[cat];
          const isComplete = completion.answered === completion.total;
          const isCurrent = currentQuestion.category === cat;
          return (
            <button
              key={cat}
              onClick={() => {
                const firstQ = assessmentQuestions.findIndex((q) => q.category === cat);
                if (firstQ >= 0) setCurrentIndex(firstQ);
              }}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium
                transition-all duration-200 border
                ${isCurrent
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                  : isComplete
                    ? 'bg-white/5 text-green-400 border-green-500/20'
                    : 'bg-white/5 text-slate-400 border-white/10 hover:bg-white/10'
                }
              `.trim()}
              aria-label={`${CATEGORY_LABELS[cat]} — ${completion.answered}/${completion.total} answered`}
            >
              {isComplete ? <CheckCircle2 size={16} className="text-green-400" /> : categoryIcons[cat]}
              <span className="hidden sm:inline">{CATEGORY_LABELS[cat]}</span>
              <span className="text-xs opacity-60">{completion.answered}/{completion.total}</span>
            </button>
          );
        })}
      </div>

      {/* Progress */}
      <ProgressBar
        value={progress}
        label={`Question ${currentIndex + 1} of ${totalQuestions}`}
        showPercentage
        size="md"
        className="mb-8"
      />

      {/* Question Card */}
      <Card glow padding="lg" className="max-w-3xl mx-auto mb-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-emerald-400">{categoryIcons[currentQuestion.category]}</span>
          <span className="text-sm text-emerald-400 font-medium">
            {CATEGORY_LABELS[currentQuestion.category]}
          </span>
        </div>

        <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
          {currentQuestion.question}
        </h2>
        {currentQuestion.description && (
          <p className="text-slate-400 text-sm mb-6">{currentQuestion.description}</p>
        )}

        {/* Options (single choice) */}
        {currentQuestion.type === 'single' && currentQuestion.options && (
          <div className="space-y-3" role="radiogroup" aria-label={currentQuestion.question}>
            {currentQuestion.options.map((option) => {
              const isSelected = getSelectedOption(currentQuestion.id) === option.id;
              return (
                <button
                  key={option.id}
                  onClick={() => handleSelectOption(currentQuestion.id, option.id, option.emissionFactor)}
                  className={`
                    w-full text-left px-5 py-4 rounded-xl border transition-all duration-200
                    ${isSelected
                      ? 'bg-emerald-500/20 border-emerald-500/40 text-white ring-2 ring-emerald-400/30'
                      : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:border-white/20'
                    }
                  `.trim()}
                  role="radio"
                  aria-checked={isSelected}
                >
                  <div className="flex items-center gap-3">
                    <div className={`
                      w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0
                      ${isSelected ? 'border-emerald-400 bg-emerald-400' : 'border-slate-500'}
                    `}>
                      {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                    </div>
                    <span className="font-medium">{option.label}</span>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* Slider */}
        {currentQuestion.type === 'slider' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 text-sm">{currentQuestion.min} {currentQuestion.unit}</span>
              <span className="text-2xl font-bold text-emerald-400">
                {getSliderValue(currentQuestion.id)} {currentQuestion.unit}
              </span>
              <span className="text-slate-400 text-sm">{currentQuestion.max} {currentQuestion.unit}</span>
            </div>
            <input
              type="range"
              min={currentQuestion.min}
              max={currentQuestion.max}
              step={currentQuestion.step}
              value={getSliderValue(currentQuestion.id)}
              onChange={(e) => handleSliderChange(currentQuestion.id, Number(e.target.value))}
              className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer
                [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6
                [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-emerald-400
                [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:shadow-emerald-400/30
                [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:transition-transform
                [&::-webkit-slider-thumb]:hover:scale-110"
              aria-label={currentQuestion.question}
            />
          </div>
        )}
      </Card>

      {/* Navigation */}
      <div className="flex items-center justify-between max-w-3xl mx-auto">
        <Button
          variant="ghost"
          onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
          disabled={currentIndex === 0}
          icon={<ArrowLeft size={16} />}
        >
          Previous
        </Button>

        {isLastQuestion ? (
          <Button
            onClick={handleComplete}
            disabled={assessmentState.answers.length < totalQuestions * 0.7}
            icon={<CheckCircle2 size={16} />}
          >
            See My Results
          </Button>
        ) : (
          <Button
            onClick={() => setCurrentIndex(currentIndex + 1)}
            icon={<ArrowRight size={16} />}
            iconPosition="right"
            variant={hasAnsweredCurrent ? 'primary' : 'secondary'}
          >
            {hasAnsweredCurrent ? 'Next' : 'Skip'}
          </Button>
        )}
      </div>
    </PageContainer>
  );
}
