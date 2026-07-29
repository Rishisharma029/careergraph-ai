import React from 'react';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  glowColor?: 'indigo' | 'purple' | 'cyan' | 'emerald' | 'amber' | 'rose' | 'none';
  hoverEffect?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  glowColor = 'none',
  hoverEffect = true,
  ...props
}) => {
  const glowClasses = {
    indigo: 'hover:border-indigo-500/50 hover:shadow-[0_8px_30px_rgba(99,102,241,0.25)]',
    purple: 'hover:border-purple-500/50 hover:shadow-[0_8px_30px_rgba(139,92,246,0.25)]',
    cyan: 'hover:border-cyan-500/50 hover:shadow-[0_8px_30px_rgba(6,182,212,0.25)]',
    emerald: 'hover:border-emerald-500/50 hover:shadow-[0_8px_30px_rgba(16,185,129,0.25)]',
    amber: 'hover:border-amber-500/50 hover:shadow-[0_8px_30px_rgba(245,158,11,0.25)]',
    rose: 'hover:border-rose-500/50 hover:shadow-[0_8px_30px_rgba(244,63,94,0.25)]',
    none: '',
  };

  return (
    <div
      className={`glass-panel rounded-2xl p-5 transition-all duration-300 ${
        hoverEffect ? 'hover:-translate-y-1 hover:scale-[1.005]' : ''
      } ${glowClasses[glowColor]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
