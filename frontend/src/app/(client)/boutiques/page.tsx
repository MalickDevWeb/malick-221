 'use client';

import Link from 'next/link';
import { useRef, useState } from 'react';
import {
  ArrowLeft,
  Search,
  Star,
  RotateCw,
  ChevronDown,
  Crown,
  Smartphone,
  Tv,
  Sparkles,
  Home as HomeIcon,
  Zap,
  Smile,
} from 'lucide-react';

export default function ShopsListPage() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Toutes');
  const searchInputRef = useRef<HTMLInputElement>(null);

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

  const categories = ['Mode', 'Électronique', 'Beauté', 'Maison', 'Sport', 'Enfants'];
  const normalizeText = (value: string) =>
    value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('fr');
  const normalizedSearch = normalizeText(search.trim());
  const filteredBoutiques = boutiques.filter((shop) => {
    const matchesSearch = !normalizedSearch ||
      normalizeText([shop.name, shop.subtitle, ...shop.tags].join(' ')).includes(normalizedSearch);
    const matchesCategory = selectedCategory === 'Toutes' ||
      shop.tags.some((tag) => normalizeText(tag) === normalizeText(selectedCategory));

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="w-full bg-[#fafafa] min-h-screen py-3 md:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 md:space-y-6">
        
        {/* En-tête Page Mobile (< md) */}
        <div className="md:hidden flex items-center justify-between border-b border-slate-100 pb-2.5">
          <Link href="/" className="text-slate-900 p-1 hover:bg-slate-100 rounded-full transition">
            <ArrowLeft className="w-6 h-6 stroke-[2.2px]" />
          </Link>
          <h1 className="font-black text-lg text-slate-900 tracking-tight">Nos boutiques</h1>
          <button
            type="button"
            aria-label="Rechercher une boutique"
            onClick={() => searchInputRef.current?.focus()}
            className="text-slate-900 p-1 hover:bg-slate-100 rounded-full transition"
          >
            <Search className="w-5 h-5 stroke-[2.2px]" />
          </button>
        </div>

        {/* Titre & Description Desktop (md et +) */}
        <div className="hidden md:flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              Toutes les Boutiques Malick Buss
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Explorez les meilleures boutiques vérifiées du Sénégal. Mode, tech, beauté et déco en direct des commerçants.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500 bg-slate-200/60 px-3 py-1.5 rounded-full">
              {filteredBoutiques.length} boutique{filteredBoutiques.length === 1 ? '' : 's'} partenaire{filteredBoutiques.length === 1 ? '' : 's'}
            </span>
          </div>
        </div>

        {/* Barre de Recherche et Filtres */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-white p-3 md:p-4 rounded-2xl border border-slate-100 shadow-2xs">
          {/* Barre de recherche */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 stroke-[2px]" />
            <input
              ref={searchInputRef}
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              aria-label="Rechercher une boutique ou une marque"
              placeholder="Rechercher une boutique, une marque..."
              className="w-full bg-[#f4f5f7] hover:bg-[#ecedf0] focus:bg-white text-xs pl-11 pr-4 py-2.5 rounded-full border border-transparent focus:border-amber-400 focus:outline-none transition-all placeholder:text-slate-400 font-medium"
            />
          </div>

          {/* Filtres Pilules Horizontaux */}
          <div className="flex gap-2 overflow-x-auto scrollbar-none py-1">
            <button
              type="button"
              aria-pressed={selectedCategory === 'Toutes'}
              onClick={() => setSelectedCategory('Toutes')}
              className={`${selectedCategory === 'Toutes' ? 'bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-xs' : 'bg-[#f0f4f8] hover:bg-slate-200 text-slate-700 font-medium'} text-xs px-4 py-1.5 rounded-full flex-shrink-0 transition`}
            >
              Toutes
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                aria-pressed={selectedCategory === cat}
                onClick={() => setSelectedCategory(cat)}
                className={`${selectedCategory === cat ? 'bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-xs' : 'bg-[#f0f4f8] hover:bg-slate-200 text-slate-700 font-medium'} text-xs px-4 py-1.5 rounded-full flex-shrink-0 transition`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grille des 6 Boutiques (1 col sur mobile, 2 ou 3 cols sur desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 pt-2">
          {filteredBoutiques.map((shop) => (
            <div
              key={shop.id}
              className="bg-white rounded-2xl md:rounded-3xl border border-slate-100/90 p-4 shadow-2xs hover:shadow-lg hover:border-amber-200 transition-all flex items-center justify-between gap-3.5 group"
            >
              {/* Logo Circulaire Spécifique */}
              <div
                className={`w-14 h-14 md:w-16 md:h-16 rounded-full flex-shrink-0 flex flex-col items-center justify-center p-1 text-center border border-slate-100 shadow-xs group-hover:scale-105 transition ${shop.avatarBg}`}
              >
                {shop.logoType === 'crown-mb' && (
                  <>
                    <Crown className="w-3.5 h-3.5 text-amber-400 fill-amber-400 mb-0.5" />
                    <span className="font-black text-xs md:text-sm leading-none">MB</span>
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
                    <Crown className="w-3.5 h-3.5 text-amber-500 fill-amber-400 mb-0.5" />
                    <span className="font-black text-xs md:text-sm text-slate-900 leading-none">MB</span>
                    <span className="text-[7px] font-bold text-slate-800 tracking-tighter leading-none mt-0.5">
                      Beauty World
                    </span>
                  </>
                )}
                {shop.logoType === 'house-chic' && (
                  <>
                    <HomeIcon className="w-4 h-4 text-emerald-400 stroke-[2.2px] mb-0.5" />
                    <span className="text-[7.5px] font-black text-white leading-none">
                      Maison Chic
                    </span>
                  </>
                )}
                {shop.logoType === 'running-sport' && (
                  <>
                    <Zap className="w-4 h-4 text-slate-950 fill-slate-950 mb-0.5" />
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
                <h3 className="font-bold text-sm md:text-base text-slate-900 truncate group-hover:text-amber-600 transition">
                  {shop.name}
                </h3>
                <p className="text-[11px] md:text-xs text-slate-500 truncate">
                  {shop.subtitle}
                </p>
                <div className="flex items-center gap-1.5">
                  <div className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    <span className="text-xs font-bold text-slate-900">{shop.rating}</span>
                  </div>
                  <span className="text-[10px] md:text-xs text-slate-400">({shop.reviews})</span>
                </div>
                {/* Badges Tags */}
                <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
                  {shop.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-emerald-50 text-emerald-700 text-[9px] md:text-[10px] font-medium px-2 py-0.5 rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bouton Vert Voir */}
              <Link
                href={`/boutiques/${shop.slug}`}
                className="bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold text-xs md:text-sm px-4 md:px-5 py-2 rounded-full transition shadow-2xs flex-shrink-0"
              >
                Voir
              </Link>
            </div>
          ))}
          {filteredBoutiques.length === 0 && (
            <p className="col-span-full py-10 text-center text-sm text-slate-500" role="status">
              Aucune boutique ne correspond à votre recherche.
            </p>
          )}
        </div>

        {/* Bouton Apprenez plus de boutiques */}
        <div className="pt-4 pb-8 text-center">
          <button className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-6 py-2.5 rounded-full shadow-2xs hover:shadow-xs transition">
            <RotateCw className="w-4 h-4 stroke-[2.2px]" />
            <span>Charger plus de boutiques</span>
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
