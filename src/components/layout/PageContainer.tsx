/**
 * EcoPulse AI — PageContainer Component
 * Consistent page wrapper with padding, max-width, and page title.
 */

import React from 'react';

interface PageContainerProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  className?: string;
  action?: React.ReactNode;
}

export function PageContainer({
  children,
  title,
  subtitle,
  className = '',
  action,
}: PageContainerProps) {
  return (
    <main className={`flex-1 min-h-[calc(100vh-4rem)] p-4 sm:p-6 lg:p-8 ${className}`}>
      <div className="max-w-6xl mx-auto">
        {(title || action) && (
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6 sm:mb-8">
            <div>
              {title && (
                <h1 className="text-2xl sm:text-3xl font-bold text-white">{title}</h1>
              )}
              {subtitle && (
                <p className="text-slate-400 mt-1 text-sm sm:text-base">{subtitle}</p>
              )}
            </div>
            {action && <div className="flex-shrink-0">{action}</div>}
          </div>
        )}
        {children}
      </div>
    </main>
  );
}
