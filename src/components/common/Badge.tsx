/**
 * EcoPulse AI — Badge Component
 * Status badge / tag with color variants.
 */

import React from 'react';

interface BadgeComponentProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'purple';
  size?: 'sm' | 'md';
  dot?: boolean;
  className?: string;
}

const variantClasses: Record<string, string> = {
  default: 'bg-slate-500/20 text-slate-300 border-slate-500/30',
  success: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
  warning: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
  danger: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
  info: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  purple: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
};

const dotClasses: Record<string, string> = {
  default: 'bg-slate-400',
  success: 'bg-emerald-400',
  warning: 'bg-amber-400',
  danger: 'bg-rose-400',
  info: 'bg-blue-400',
  purple: 'bg-purple-400',
};

export function StatusBadge({
  children,
  variant = 'default',
  size = 'sm',
  dot = false,
  className = '',
}: BadgeComponentProps) {
  return (
    <span
      className={`
        inline-flex items-center gap-1.5 font-medium border rounded-full
        ${size === 'sm' ? 'px-2.5 py-0.5 text-xs' : 'px-3 py-1 text-sm'}
        ${variantClasses[variant]}
        ${className}
      `.trim()}
    >
      {dot && (
        <span className={`w-1.5 h-1.5 rounded-full ${dotClasses[variant]}`} />
      )}
      {children}
    </span>
  );
}
