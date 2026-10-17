import Link from 'next/link';
import { ArrowLeft, Search, Star } from 'lucide-react';
import { getShops } from '../../../services/api';

export default async function ShopsListPage() {
  const shops = await getShops();

  const fallbackShops = [
    {
      id: '1',
      name: 'Style & Mode',
      slug: 'style-and-mode',
      category: 'Friperie',
      rating: '4.8',
      reviews: '1.2k avis',
      image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=300&q=80',
    },
    {
      id: '2',
      name: 'TechZone',
      slug: 'techzone',
      category: 'Électronique',
      rating: '4.7',
      reviews: '980 avis',
      image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=300&q=80',
    },
    {
      id: '3',
      name: 'Beauty World',
      slug: 'beauty-world',
      category: 'Beauté',
      rating: '4.6',
      reviews: '756 avis',
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=300&q=80',
    },
    {
      id: '4',
      name: 'Home Decor',
      slug: 'home-decor',
      category: 'Maison',
      rating: '4.5',
      reviews: '621 avis',
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=300&q=80',
    },
  ];

  const displayList = shops.length > 0 ? shops.map((s, i) => ({
    id: s.id,
    name: s.name,
    slug: s.slug,
    category: s.description?.slice(0, 20) || 'Boutique',
    rating: (4.8 - i * 0.1).toFixed(1),
    reviews: `${1200 - i * 200} avis`,
    image: s.logoUrl || fallbackShops[i % fallbackShops.length].image,
  })) : fallbackShops;

  return (
    <div className="space-y-4 pb-6">
      {/* Header Écran 4 */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-100 px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-slate-800">
          <ArrowLeft className="w-5 h-5 stroke-[2.2px]" />
          <h1 className="font-bold text-base text-slate-900">Nos boutiques</h1>
        </Link>
      </header>

      {/* Barre de Recherche Écran 4 */}
      <div className="px-4">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 stroke-2" />
          <input
            type="text"
            placeholder="Rechercher une boutique..."
            className="w-full bg-slate-100/90 text-xs pl-10 pr-4 py-2.5 rounded-xl border border-transparent focus:border-emerald-500 focus:outline-none transition-all placeholder:text-slate-400"
          />
        </div>
      </div>

      {/* Filtres Pilules Écran 4 */}
      <div className="px-4 flex gap-2 overflow-x-auto scrollbar-none">
        <button className="bg-emerald-600 text-white font-semibold text-xs px-4 py-1.5 rounded-full flex-shrink-0">
          Toutes
        </button>
        {['Mode', 'Électronique', 'Beauté', 'Maison'].map((filter) => (
          <button
            key={filter}
            className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-xs px-4 py-1.5 rounded-full flex-shrink-0 transition"
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Liste des Boutiques Écran 4 */}
      <div className="px-4 space-y-3">
        {displayList.map((shop) => (
          <div
            key={shop.id}
            className="bg-white rounded-2xl border border-slate-100 p-3.5 shadow-sm flex items-center justify-between gap-3"
          >
            <Link href={`/boutiques/${shop.slug}`} className="flex items-center gap-3 flex-1 min-w-0">
              <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0">
                <img
                  src={shop.image}
                  alt={shop.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="font-bold text-xs text-slate-900 truncate">
                  {shop.name}
                </h2>
                <span className="text-[11px] text-slate-400 block mt-0.5">
                  {shop.category}
                </span>
                <div className="flex items-center gap-1 mt-1 text-[11px] font-bold text-slate-700">
                  <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                  <span>{shop.rating}</span>
                  <span className="font-normal text-slate-400 text-[10px]">
                    ({shop.reviews})
                  </span>
                </div>
              </div>
            </Link>

            <button className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-3.5 py-1.5 rounded-xl shadow-sm transition active:scale-95 flex-shrink-0">
              Suivre
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
