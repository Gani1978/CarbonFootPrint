/**
 * EcoPulse AI — Card Component
 * Glassmorphism card with optional header, hover effects, and glow.
 */

import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  onClick?: () => void;
}

const paddingClasses: Record<string, string> = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

export function Card({
  children,
  className = '',
  hover = false,
  glow = false,
  padding = 'md',
  onClick,
}: CardProps) {
  return (
    <div
      className={`
        relative rounded-2xl border border-white/10
        bg-white/5 backdrop-blur-xl
        ${hover ? 'transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:shadow-xl hover:-translate-y-1 cursor-pointer' : ''}
        ${glow ? 'shadow-lg shadow-emerald-500/10' : ''}
        ${paddingClasses[padding]}
        ${className}
      `.trim()}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(); }} : undefined}
    >
      {glow && (
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500/5 to-teal-500/5 pointer-events-none" />
      )}
      <div className="relative">{children}</div>
    </div>
  );
}

interface CardHeaderProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
}

export function CardHeader({ title, subtitle, icon, action }: CardHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-3">
        {icon && <div className="text-emerald-400">{icon}</div>}
        <div>
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          {subtitle && <p className="text-sm text-slate-400 mt-0.5">{subtitle}</p>}
        </div>
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}
