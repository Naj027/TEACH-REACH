import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string | number;
  subtext?: string;
  icon?: LucideIcon;
  trend?: {
    value: string;
    positive?: boolean;
  };
  onClick?: () => void;
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  subtext,
  icon: Icon,
  trend,
  onClick
}) => {
  return (
    <div 
      onClick={onClick}
      className={`bg-white border border-[#E5E5E5] rounded-xl p-5 shadow-xs transition-all ${
        onClick ? 'cursor-pointer hover:border-[#B91C1C]/40 hover:shadow-sm' : ''
      }`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-[#737373] uppercase tracking-wider">{label}</p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-[#171717] tabular-nums font-mono">{value}</span>
            {trend && (
              <span className={`text-xs font-medium ${trend.positive ? 'text-emerald-700' : 'text-amber-700'}`}>
                {trend.value}
              </span>
            )}
          </div>
          {subtext && <p className="mt-1 text-xs text-[#737373]">{subtext}</p>}
        </div>
        {Icon && (
          <div className="p-2.5 rounded-lg bg-[#FEE2E2]/60 text-[#B91C1C] shrink-0">
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>
    </div>
  );
};
