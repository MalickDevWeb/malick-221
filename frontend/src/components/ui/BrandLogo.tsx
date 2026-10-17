import React from 'react';
import { Crown } from 'lucide-react';

export function BrandLogo({ variant = 'dark', size = 'md' }: { variant?: 'light' | 'dark' | 'gold'; size?: 'sm' | 'md' | 'lg' }) {
  const isDark = variant === 'dark';
  const isLight = variant === 'light';

  const sizeClasses = {
    sm: { box: 'w-7 h-7 text-xs', crown: 'w-3 h-3', title: 'text-sm', sub: 'text-[9px]' },
    md: { box: 'w-9 h-9 text-sm', crown: 'w-4 h-4', title: 'text-base', sub: 'text-[10px]' },
    lg: { box: 'w-14 h-14 text-xl', crown: 'w-6 h-6', title: 'text-2xl', sub: 'text-xs' },
  }[size];

  return (
    <div className="flex flex-col items-center select-none">
      <div className="flex items-center gap-1.5">
        <Crown className={`${sizeClasses.crown} text-amber-400 fill-amber-400`} />
      </div>
      <div className="flex items-center gap-1.5 mt-0.5">
        <span
          className={`font-black tracking-tight ${sizeClasses.title} ${
            isLight ? 'text-white' : 'text-slate-900'
          }`}
        >
          MB
        </span>
        <span
          className={`font-extrabold tracking-wider ${sizeClasses.title} ${
            isLight ? 'text-white' : 'text-slate-900'
          }`}
        >
          MALICK BUSS
        </span>
      </div>
    </div>
  );
}

