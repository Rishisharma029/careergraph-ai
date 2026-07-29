import React from 'react';

interface RadialGaugeProps {
  value: number; // 0 - 100
  size?: number;
  strokeWidth?: number;
  label?: string;
  color?: 'purple' | 'cyan' | 'emerald' | 'amber';
}

export const RadialGauge: React.FC<RadialGaugeProps> = ({
  value,
  size = 64,
  strokeWidth = 6,
  label,
  color = 'purple'
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  const colorStyles = {
    purple: 'text-purple-400 stroke-purple-500',
    cyan: 'text-cyan-400 stroke-cyan-500',
    emerald: 'text-emerald-400 stroke-emerald-500',
    amber: 'text-amber-400 stroke-amber-500'
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative inline-flex items-center justify-center">
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="transparent"
            className="text-white/10"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            className={`${colorStyles[color]} transition-all duration-700 ease-out`}
          />
        </svg>
        <span className={`absolute text-xs font-mono font-extrabold ${colorStyles[color].split(' ')[0]}`}>
          {value}%
        </span>
      </div>
      {label && <span className="text-[10px] text-slate-400 font-mono mt-1">{label}</span>}
    </div>
  );
};
