import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'indigo' | 'purple' | 'cyan' | 'emerald' | 'rose' | 'amber' | 'neutral';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'indigo',
  size = 'md',
  icon,
  className = ''
}) => {
  const variantStyles = {
    indigo: 'bg-indigo-500/10 text-indigo-300 border-indigo-500/20',
    purple: 'bg-purple-500/10 text-purple-300 border-purple-500/20',
    cyan: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20',
    emerald: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20',
    rose: 'bg-rose-500/10 text-rose-300 border-rose-500/20',
    amber: 'bg-amber-500/10 text-amber-300 border-amber-500/20',
    neutral: 'bg-slate-800/80 text-slate-300 border-slate-700/50',
  };

  const sizeStyles = {
    sm: 'text-xs px-2 py-0.5 rounded-md gap-1',
    md: 'text-xs px-2.5 py-1 rounded-lg gap-1.5 font-medium',
    lg: 'text-sm px-3 py-1.5 rounded-xl gap-2 font-semibold',
  };

  return (
    <span
      className={`inline-flex items-center border backdrop-blur-md transition-colors ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </span>
  );
};
