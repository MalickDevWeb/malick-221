import Link from 'next/link';
import { getShops, getProducts } from '../services/api';
import { ProductCard } from '../components/client/ProductCard';
import { Sparkles, ArrowRight, ShieldCheck, Flame } from 'lucide-react';

export default async function HomePage() {
  const [shops, products] = await Promise.all([
    getShops(),
    getProducts(),
  ]);

  return (
    <div className="space-y-6 pb-6">
      {/* Bannière Promotionnelle */}
      <section className="px-4 pt-3">
        <div className="bg-gradient-to-br from-emerald-600 to-teal-800 rounded-2xl p-5 text-white shadow-md relative overflow-hidden">
          <div className="relative z-10 space-y-2">
            <span className="inline-flex items-center gap-1 bg-white/20 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wide">
              <Sparkles className="w-3 h-3 text-amber-300" />
              Arrivages de la semaine
            </span>
            <h2 className="text-xl font-black leading-tight">
              Friperie & Mode Urbaine à Dakar
            </h2>
            <p className="text-xs text-emerald-100 max-w-[240px]">
              Commandez chez vos vendeurs préférés. Payez en toute sécurité par Wave ou Orange Money.
            </p>
          </div>
          <div className="absolute -right-6 -bottom-8 w-32 h-32 bg-white/10 rounded-full blur-xl" />
        </div>
      </section>

      {/* Catégories Rapides */}
      <section className="px-4">
        <div className="flex items-center justify-between mb-2.5">
          <h3 className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
            <Flame className="w-4 h-4 text-orange-500" />
            Catégories populaires
          </h3>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {[
            { label: 'Friperie', emoji: '👕', href: '/categories/friperie' },
            { label: 'Streetwear', emoji: '🧢', href: '/categories/streetwear' },
            { label: 'Sneakers', emoji: '👟', href: '/categories/sneakers' },
            { label: 'Accessoires', emoji: '🕶️', href: '/categories/accessoires' },
          ].map((cat) => (
            <Link
              key={cat.label}
              href={cat.href}
              className="bg-white p-2.5 rounded-xl border border-slate-100 flex flex-col items-center gap-1 shadow-sm hover:border-emerald-300 transition"
            >
              <span className="text-xl">{cat.emoji}</span>
              <span className="text-[11px] font-medium text-slate-700">{cat.label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Boutiques Partenaires */}
      <section className="px-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-sm text-slate-900">
            Boutiques vérifiées
          </h3>
          <Link href="/boutiques" className="text-xs font-semibold text-emerald-600 flex items-center gap-0.5">
            Voir tout <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
          {shops.map((shop) => (
            <Link
              key={shop.id}
              href={`/boutiques/${shop.slug}`}
              className="flex-shrink-0 w-44 bg-white p-3 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition flex flex-col items-center text-center gap-2"
            >
              <div className="w-14 h-14 rounded-full overflow-hidden bg-slate-100 border border-slate-200">
                <img
                  src={shop.logoUrl || 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=200&q=80'}
                  alt={shop.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-full">
                <h4 className="font-bold text-xs text-slate-900 truncate flex items-center justify-center gap-1">
                  {shop.name}
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                </h4>
                <p className="text-[10px] text-slate-500 mt-0.5">
                  {shop._count?.products || 0} articles en ligne
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Catalogue & Nouveaux Arrivages */}
      <section className="px-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-sm text-slate-900">
            Derniers arrivages
          </h3>
          <span className="text-xs text-slate-500 font-medium">
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
