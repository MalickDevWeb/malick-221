import Link from 'next/link';
import { Search } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 px-4 py-3 max-w-md mx-auto">
      <div className="flex items-center justify-between gap-3">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold text-sm shadow-sm">
            MB
          </div>
          <div>
            <span className="font-extrabold text-base tracking-tight text-slate-900 block leading-none">
              MALICK BUSS
            </span>
            <span className="text-[10px] text-emerald-600 font-semibold uppercase tracking-wider block">
              Marketplace Sénégal
            </span>
          </div>
        </Link>
        <div className="bg-slate-100 text-slate-700 text-xs px-2.5 py-1 rounded-full font-medium">
          Dakar • FCFA
        </div>
      </div>

      <div className="mt-3 relative">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Rechercher friperie, chemise, sneakers..."
          className="w-full bg-slate-100/80 hover:bg-slate-100 focus:bg-white text-xs pl-9 pr-4 py-2.5 rounded-xl border border-transparent focus:border-emerald-500 focus:outline-none transition-all placeholder:text-slate-400"
        />
      </div>
    </header>
  );
}
