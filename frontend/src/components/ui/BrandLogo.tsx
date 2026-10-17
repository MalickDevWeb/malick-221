import React from 'react';
import { Crown } from 'lucide-react';

export function BrandLogo({
  variant = 'dark',
  size = 'md',
}: {
  variant?: 'light' | 'dark' | 'gold';
  size?: 'sm' | 'md' | 'lg';
}) {
  const isLight = variant === 'light';

  return (
    <div className="flex flex-col items-center select-none leading-none">
      <div className="relative flex items-center justify-center">
        <Crown className="w-3.5 h-3.5 text-amber-500 fill-amber-400 absolute -top-2.5 left-1/2 -translate-x-1/2 drop-shadow-xs" />
        <span
          className={`font-black tracking-tight text-xl ${
            isLight ? 'text-white' : 'text-slate-950'
          }`}
        >
          MB
        </span>
      </div>
      <span
        className={`font-extrabold text-[10px] tracking-[0.16em] uppercase mt-0.5 ${
          isLight ? 'text-slate-200' : 'text-slate-900'
        }`}
      >
        MALICK BUSS
      </span>
    </div>
  );
}
