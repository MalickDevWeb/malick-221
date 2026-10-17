import React from 'react';
import { Crown } from 'lucide-react';

export function BrandLogo({
  variant = 'dark',
  size = 'md',
  layout = 'horizontal',
  showSubtitle = true,
}: {
  variant?: 'light' | 'dark' | 'gold';
  size?: 'sm' | 'md' | 'lg';
  layout?: 'vertical' | 'horizontal';
  showSubtitle?: boolean;
}) {
  const isLight = variant === 'light';

  if (layout === 'horizontal') {
    return (
      <div className="flex items-center gap-2.5 select-none">
        <div className="relative flex flex-col items-center justify-center">
          <Crown className="w-3.5 h-3.5 text-amber-500 fill-amber-400 -mb-1 drop-shadow-xs" />
          <span
            className={`font-black tracking-tight text-2xl leading-none ${
              isLight ? 'text-white' : 'text-slate-950'
            }`}
          >
            MB
          </span>
        </div>
        <div className="flex flex-col justify-center leading-tight">
          <span
            className={`font-black text-sm tracking-wider uppercase ${
              isLight ? 'text-white' : 'text-slate-950'
            }`}
          >
            MALICK BUSS
          </span>
          {showSubtitle && (
            <span className="font-bold text-[8px] tracking-[0.12em] text-slate-400 uppercase">
              LE MARKETPLACE DU SÉNÉGAL
            </span>
          )}
        </div>
      </div>
    );
  }

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
