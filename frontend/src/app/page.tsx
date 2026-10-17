import Link from 'next/link';
import { ArrowRight, Shirt, Smartphone, Sparkles, Home as HomeIcon, Trophy, Star } from 'lucide-react';
import { getShops, getProducts } from '../services/api';
import { ProductCard } from '../components/client/ProductCard';

export default async function HomePage() {
  const [shops, products] = await Promise.all([
    getShops(),
    getProducts(),
  ]);

  // Si shops ou products est vide, on fournit des données par défaut fidèles à la maquette
  const displayShops = shops.length > 0 ? shops : [
    {
      id: '1',
      name: 'Style & Mode',
      slug: 'style-and-mode',
      description: 'Friperie',
      logoUrl: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=300&q=80',
      bannerUrl: null,
      status: 'ACTIVE',
      _count: { products: 12 },
    },
    {
      id: '2',
      name: 'TechZone',
      slug: 'techzone',
      description: 'Électronique',
      logoUrl: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=300&q=80',
      bannerUrl: null,
      status: 'ACTIVE',
      _count: { products: 24 },
    },
    {
      id: '3',
      name: 'Beauty World',
      slug: 'beauty-world',
      description: 'Beauté',
      logoUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=300&q=80',
      bannerUrl: null,
      status: 'ACTIVE',
      _count: { products: 8 },
    },
  ];

  const categoryIcons = [
    { label: 'Mode', icon: Shirt, color: 'bg-emerald-500 text-white', href: '/categories/mode' },
    { label: 'Électronique', icon: Smartphone, color: 'bg-sky-500 text-white', href: '/categories/electronique' },
    { label: 'Beauté', icon: Sparkles, color: 'bg-pink-500 text-white', href: '/categories/beaute' },
    { label: 'Maison', icon: HomeIcon, color: 'bg-amber-500 text-white', href: '/categories/maison' },
    { label: 'Sport', icon: Trophy, color: 'bg-indigo-500 text-white', href: '/categories/sport' },
  ];

  return (
    <div className="space-y-5 pb-6">
      {/* Bannière Promotionnelle Écran 2 */}
      <section className="px-4 pt-1">
        <div className="relative rounded-2xl overflow-hidden bg-slate-950 text-white p-5 shadow-sm min-h-[155px] flex flex-col justify-between">
          <div className="absolute inset-0 z-0 opacity-40">
            <img
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80"
              alt="Promo Banner"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />
          </div>

          <div className="relative z-10 space-y-1.5 max-w-[230px]">
            <h2 className="text-base font-extrabold leading-tight">
              Tout ce dont tu as besoin au même endroit !
            </h2>
            <p className="text-[11px] text-slate-300 leading-snug">
              Vêtements, électronique, beauté, maison et bien plus...
            </p>
          </div>

          <div className="relative z-10 pt-3">
            <Link
              href="/boutiques"
              className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-2 px-3.5 rounded-xl shadow-md transition active:scale-95"
            >
              <span>Découvrir les boutiques</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[2.5px]" />
            </Link>
          </div>
        </div>
      </section>

      {/* Rangée de Catégories Bulles Écran 2 */}
      <section className="px-4">
        <div className="flex justify-between items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categoryIcons.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.label}
                href={cat.href}
                className="flex flex-col items-center gap-1.5 flex-1 min-w-[58px]"
              >
                <div
                  className={`w-12 h-12 rounded-full ${cat.color} flex items-center justify-center shadow-sm`}
                >
                  <Icon className="w-5 h-5 stroke-[2.2px]" />
                </div>
                <span className="text-[11px] font-medium text-slate-700 tracking-tight text-center">
                  {cat.label}
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Section Boutiques Populaires Écran 2 */}
      <section className="px-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-sm text-slate-900">
            Boutiques populaires
          </h3>
          <Link
            href="/boutiques"
            className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-0.5"
          >
            Voir tout <ArrowRight className="w-3 h-3 stroke-[2.5px]" />
          </Link>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
          {displayShops.map((shop, idx) => {
            const ratings = ['4.8', '4.7', '4.6'];
            const tags = ['Friperie', 'Électronique', 'Beauté'];
            return (
              <Link
                key={shop.id}
                href={`/boutiques/${shop.slug}`}
                className="flex-shrink-0 w-32 bg-white rounded-2xl border border-slate-100 p-2.5 shadow-sm hover:shadow-md transition flex flex-col items-center text-center gap-1.5"
              >
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-100 border border-slate-100 flex-shrink-0">
                  <img
                    src={shop.logoUrl || 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=200&q=80'}
                    alt={shop.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="font-bold text-xs text-slate-900 truncate w-full">
                  {shop.name}
                </h4>
                <span className="text-[10px] text-slate-400 -mt-1 block">
                  {tags[idx % tags.length]}
                </span>
                <div className="flex items-center gap-1 text-[11px] font-bold text-slate-700">
                  <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                  <span>{ratings[idx % ratings.length]}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Catalogue & Nouveautés */}
      <section className="px-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-sm text-slate-900">
            Articles recommandés
          </h3>
          <span className="text-xs text-slate-400">
            {products.length} articles
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
