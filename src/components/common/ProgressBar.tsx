/**
 * EcoPulse AI — ProgressBar Component
 * Animated progress bar with gradient fill and optional label.
 */



interface ProgressBarProps {
  value: number; // 0-100
  max?: number;
  label?: string;
  showPercentage?: boolean;
  size?: 'sm' | 'md' | 'lg';
  color?: 'emerald' | 'blue' | 'amber' | 'rose' | 'purple';
  animated?: boolean;
  className?: string;
}

const colorClasses: Record<string, string> = {
  emerald: 'from-emerald-400 to-teal-400',
  blue: 'from-blue-400 to-cyan-400',
  amber: 'from-amber-400 to-yellow-400',
  rose: 'from-rose-400 to-pink-400',
  purple: 'from-purple-400 to-indigo-400',
};

const bgColorClasses: Record<string, string> = {
  emerald: 'shadow-emerald-400/30',
  blue: 'shadow-blue-400/30',
  amber: 'shadow-amber-400/30',
  rose: 'shadow-rose-400/30',
  purple: 'shadow-purple-400/30',
};

const sizeClasses: Record<string, string> = {
  sm: 'h-1.5',
  md: 'h-2.5',
  lg: 'h-4',
};

export function ProgressBar({
  value,
  max = 100,
  label,
  showPercentage = false,
  size = 'md',
  color = 'emerald',
  animated = true,
  className = '',
}: ProgressBarProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className={`w-full ${className}`}>
      {(label || showPercentage) && (
        <div className="flex justify-between items-center mb-1.5">
          {label && <span className="text-sm text-slate-300">{label}</span>}
          {showPercentage && (
            <span className="text-sm font-medium text-white">
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      )}
      <div
        className={`w-full bg-white/10 rounded-full overflow-hidden ${sizeClasses[size]}`}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={label || 'Progress'}
      >
        <div
          className={`
            h-full rounded-full bg-gradient-to-r ${colorClasses[color]}
            ${animated ? 'transition-all duration-700 ease-out' : ''}
            ${bgColorClasses[color]} shadow-sm
          `.trim()}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
