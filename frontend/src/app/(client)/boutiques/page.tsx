import Link from 'next/link';
import {
  ArrowLeft,
  Search,
  Star,
  RotateCw,
  ChevronDown,
  Wifi,
  Crown,
  Smartphone,
  Tv,
  Sparkles,
  Home as HomeIcon,
  Zap,
  Smile,
} from 'lucide-react';

export default function ShopsListPage() {
  const boutiques = [
    {
      id: '1',
      name: 'Style & Mode',
      slug: 'style-and-mode',
      subtitle: 'Vêtements, chaussures, accessoires',
      rating: '4.8',
      reviews: '1,2k avis',
      tags: ['Mode', 'Chaussures', 'Accessoires'],
      avatarBg: 'bg-black text-white',
      logoType: 'crown-mb',
      logoText: 'Style & Mode',
    },
    {
      id: '2',
      name: 'TechZone',
      slug: 'techzone',
      subtitle: 'Téléphones, ordinateurs, accessoires',
      rating: '4.6',
      reviews: '980 avis',
      tags: ['Électronique', 'Informatique', 'Accessoires'],
      avatarBg: 'bg-[#081a36] text-sky-400',
      logoType: 'tech-screens',
      logoText: 'TechZone',
    },
    {
      id: '3',
      name: 'Beauty World',
      slug: 'beauty-world',
      subtitle: 'Parfums, soins, maquillage',
      rating: '4.7',
      reviews: '756 avis',
      tags: ['Beauté', 'Parfums', 'Soins'],
      avatarBg: 'bg-[#fbcfe8] text-slate-900',
      logoType: 'crown-mb-pink',
      logoText: 'Beauty World',
    },
    {
      id: '4',
      name: 'Maison Chic',
      slug: 'maison-chic',
      subtitle: 'Décoration, cuisine, linge de maison',
      rating: '4.5',
      reviews: '421 avis',
      tags: ['Maison', 'Décoration', 'Cuisine'],
      avatarBg: 'bg-[#063327] text-white',
      logoType: 'house-chic',
      logoText: 'Maison Chic',
    },
    {
      id: '5',
      name: 'Sport Max',
      slug: 'sport-max',
      subtitle: 'Fitness, sport, accessoires',
      rating: '4.4',
      reviews: '367 avis',
      tags: ['Sport', 'Fitness', 'Accessoires'],
      avatarBg: 'bg-[#facc15] text-slate-950',
      logoType: 'running-sport',
      logoText: 'Sport Max',
    },
    {
      id: '6',
      name: 'Kids World',
      slug: 'kids-world',
      subtitle: 'Jouets, vêtements, puériculture',
      rating: '4.6',
      reviews: '523 avis',
      tags: ['Enfants', 'Jouets', 'Vêtements'],
      avatarBg: 'bg-[#0284c7] text-white',
      logoType: 'teddy-kids',
      logoText: 'Kids World',
    },
  ];

  return (
    <div className="space-y-3 pb-8 bg-[#fafafa] min-h-screen">
      {/* Barre de statut iOS 9:41 */}
      <div className="bg-white px-4 pt-1 flex items-center justify-between text-slate-900 text-xs font-semibold">
        <span>9:41</span>
        <div className="flex items-center gap-1.5">
          <div className="flex items-end gap-0.5 h-2.5">
            <span className="w-0.5 h-1 bg-slate-900 rounded-2xs" />
            <span className="w-0.5 h-1.5 bg-slate-900 rounded-2xs" />
            <span className="w-0.5 h-2 bg-slate-900 rounded-2xs" />
            <span className="w-0.5 h-2.5 bg-slate-900 rounded-2xs" />
          </div>
          <Wifi className="w-3 h-3 stroke-[2.5px]" />
          <div className="w-5 h-2.5 border border-slate-900 rounded-[3px] p-[1px] flex items-center relative">
            <div className="h-full w-full bg-slate-900 rounded-[1px]" />
            <span className="w-0.5 h-1 bg-slate-900 absolute -right-[2px] top-1/2 -translate-y-1/2 rounded-r-[1px]" />
          </div>
        </div>
      </div>

      {/* Header Écran Nos Boutiques */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-100/80 px-4 py-2.5 flex items-center justify-between">
        <Link href="/" className="text-slate-900 p-1 hover:bg-slate-100 rounded-full transition">
          <ArrowLeft className="w-6 h-6 stroke-[2.2px]" />
        </Link>
        <h1 className="font-black text-lg text-slate-900 tracking-tight">Nos boutiques</h1>
        <button className="text-slate-900 p-1 hover:bg-slate-100 rounded-full transition">
          <Search className="w-5 h-5 stroke-[2.2px]" />
        </button>
      </header>

      {/* Barre de Recherche Pilule */}
      <div className="px-4">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 stroke-[2px]" />
          <input
            type="text"
            placeholder="Rechercher une boutique..."
            className="w-full bg-[#f4f5f7] hover:bg-[#ecedf0] focus:bg-white text-xs pl-11 pr-4 py-2.5 rounded-full border border-transparent focus:border-amber-400 focus:outline-none transition-all placeholder:text-slate-400 font-medium"
          />
        </div>
      </div>

      {/* Filtres Pilules Horizontaux */}
      <div className="px-4 flex gap-2 overflow-x-auto scrollbar-none pt-1">
        <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-1.5 rounded-full flex-shrink-0 transition shadow-xs">
          Toutes
        </button>
        {['Mode', 'Électronique', 'Beauté', 'Maison', 'Sport'].map((cat) => (
          <button
            key={cat}
            className="bg-[#f0f4f8] hover:bg-slate-200 text-slate-700 font-medium text-xs px-4 py-1.5 rounded-full flex-shrink-0 transition"
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Liste des 6 Boutiques Maquette */}
      <div className="px-4 space-y-2.5 pt-1">
        {boutiques.map((shop) => (
          <div
            key={shop.id}
            className="bg-white rounded-2xl border border-slate-100/90 p-3 shadow-2xs hover:shadow-xs transition flex items-center justify-between gap-3"
          >
            {/* Logo Circulaire Spécifique */}
            <div
              className={`w-14 h-14 rounded-full flex-shrink-0 flex flex-col items-center justify-center p-1 text-center border border-slate-100 shadow-xs ${shop.avatarBg}`}
            >
              {shop.logoType === 'crown-mb' && (
                <>
                  <Crown className="w-3 h-3 text-amber-400 fill-amber-400 mb-0.5" />
                  <span className="font-black text-xs leading-none">MB</span>
                  <span className="text-[7px] font-bold tracking-tighter leading-none mt-0.5 scale-90">
                    Style & Mode
                  </span>
                </>
              )}
              {shop.logoType === 'tech-screens' && (
                <>
                  <div className="flex items-center gap-0.5 text-sky-400 mb-0.5">
                    <Smartphone className="w-2.5 h-2.5 stroke-[2.5px]" />
                    <Tv className="w-3 h-3 stroke-[2.5px]" />
                  </div>
                  <span className="text-[7.5px] font-black uppercase text-white leading-none">
                    TechZone
                  </span>
                  <span className="text-[5.5px] text-sky-300 font-bold uppercase tracking-wider">
                    TECH ZONE
                  </span>
                </>
              )}
              {shop.logoType === 'crown-mb-pink' && (
                <>
                  <Crown className="w-3 h-3 text-amber-500 fill-amber-400 mb-0.5" />
                  <span className="font-black text-xs text-slate-900 leading-none">MB</span>
                  <span className="text-[7px] font-bold text-slate-800 tracking-tighter leading-none mt-0.5">
                    Beauty World
                  </span>
                </>
              )}
              {shop.logoType === 'house-chic' && (
                <>
                  <HomeIcon className="w-3.5 h-3.5 text-emerald-400 stroke-[2.2px] mb-0.5" />
                  <span className="text-[7.5px] font-black text-white leading-none">
                    Maison Chic
                  </span>
                </>
              )}
              {shop.logoType === 'running-sport' && (
                <>
                  <Zap className="w-3.5 h-3.5 text-slate-950 fill-slate-950 mb-0.5" />
                  <span className="text-[7.5px] font-black uppercase text-slate-950 leading-none">
                    Sport Max
                  </span>
                </>
              )}
              {shop.logoType === 'teddy-kids' && (
                <>
                  <Smile className="w-4 h-4 text-amber-300 stroke-[2.5px] mb-0.5" />
                  <span className="text-[7.5px] font-black uppercase text-white leading-none">
                    Kids World
                  </span>
                </>
              )}
            </div>

            {/* Infos Médianes */}
            <div className="flex-1 min-w-0 space-y-1">
              <h3 className="font-bold text-xs sm:text-sm text-slate-900 truncate">
                {shop.name}
              </h3>
              <p className="text-[11px] text-slate-500 truncate">
                {shop.subtitle}
              </p>
              <div className="flex items-center gap-1.5">
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                  <span className="text-xs font-bold text-slate-900">{shop.rating}</span>
                </div>
                <span className="text-[10px] text-slate-400">({shop.reviews})</span>
              </div>
              {/* Badges Tags */}
              <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
                {shop.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-emerald-50 text-emerald-700 text-[9px] font-medium px-2 py-0.5 rounded-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Bouton Vert Voir */}
            <Link
              href={`/boutiques/${shop.slug}`}
              className="bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold text-xs px-4 py-1.5 rounded-full transition shadow-2xs flex-shrink-0"
            >
              Voir
            </Link>
          </div>
        ))}
      </div>

      {/* Bouton Apprenez plus de boutiques */}
      <div className="pt-2 pb-4 text-center">
        <button className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition">
          <RotateCw className="w-3.5 h-3.5 stroke-[2.2px]" />
          <span>Apprenez plus de boutiques</span>
          <ChevronDown className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
