import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Share2, Heart, Star, ArrowRight } from 'lucide-react';
import { getShopBySlug, formatFCFA } from '../../../../services/api';

export default async function ShopDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const shop = await getShopBySlug(params.slug);

  const fallbackShop = {
    name: 'Style & Mode',
    slug: 'style-and-mode',
    category: 'Friperie',
    rating: '4.8',
    reviews: '1.2k avis',
    bio: 'Vêtements de seconde main tendance, qualité garantie et prix abordables.',
    bannerUrl: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=800&q=80',
    logoUrl: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=300&q=80',
    products: [
      {
        id: '1',
        title: 'Veste en jean',
        price: 12000,
        image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=400&q=80',
      },
      {
        id: '2',
        title: 'T-shirt vintage',
        price: 8000,
        image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=400&q=80',
      },
    ],
  };

  const currentShop = shop || fallbackShop;
  const productsList = shop?.products?.length ? shop.products : fallbackShop.products;

  return (
    <div className="space-y-4 pb-8">
      {/* Couverture avec actions retour & partage */}
      <div className="relative h-44 w-full bg-slate-900">
        <img
          src={currentShop.bannerUrl || fallbackShop.bannerUrl}
          alt={currentShop.name}
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
          <Link
            href="/boutiques"
            className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-slate-800 shadow-sm"
          >
            <ArrowLeft className="w-5 h-5 stroke-[2.2px]" />
          </Link>
          <div className="flex items-center gap-2">
            <button className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-slate-800 shadow-sm">
              <Share2 className="w-4 h-4" />
            </button>
            <button className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-slate-800 shadow-sm">
              <Heart className="w-4 h-4 text-rose-500" />
            </button>
          </div>
        </div>
      </div>

      {/* Carte Flottante de la Boutique (Écran 5) */}
      <div className="px-4 -mt-12 relative z-20">
        <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm flex flex-col items-center text-center space-y-3">
          <div className="w-16 h-16 rounded-full border-2 border-white shadow-md overflow-hidden bg-slate-50 -mt-10 flex-shrink-0">
            <img
              src={currentShop.logoUrl || fallbackShop.logoUrl}
              alt={currentShop.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <h1 className="font-extrabold text-base text-slate-900">
              {currentShop.name}
            </h1>
            <span className="text-xs text-slate-400 block mt-0.5">
              {shop?.description ? 'Friperie' : fallbackShop.category}
            </span>
            <div className="flex items-center justify-center gap-1 mt-1 text-xs font-bold text-slate-700">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span>4.8</span>
              <span className="text-[11px] font-normal text-slate-400">
                (1.2k avis)
              </span>
            </div>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed max-w-[280px]">
            {fallbackShop.bio}
          </p>

          <div className="flex gap-2">
            {['Homme', 'Femme', 'Enfant'].map((tag) => (
              <span
                key={tag}
                className="bg-slate-100 text-slate-700 text-[11px] font-semibold px-3 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          <Link
            href={`/boutiques/${params.slug}/produits`}
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-3 px-4 rounded-xl flex items-center justify-center gap-1.5 shadow-sm transition active:scale-[0.98]"
          >
            <span>Voir tous les produits</span>
            <ArrowRight className="w-3.5 h-3.5 stroke-[2.5px]" />
          </Link>
        </div>
      </div>

      {/* Section Produits Populaires (Écran 5) */}
      <div className="px-4 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-sm text-slate-900">
            Produits populaires
          </h2>
          <Link
            href={`/boutiques/${params.slug}/produits`}
            className="text-xs font-semibold text-emerald-600 flex items-center gap-0.5"
          >
            Voir tout <ArrowRight className="w-3 h-3 stroke-[2.5px]" />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {productsList.slice(0, 2).map((item: any) => (
            <Link
              key={item.id}
              href={`/produits/${item.id}`}
              className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm flex flex-col justify-between"
            >
              <div className="aspect-square bg-slate-100 overflow-hidden">
                <img
                  src={item.image || 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=400&q=80'}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-3">
                <h3 className="font-semibold text-xs text-slate-900 truncate">
                  {item.title}
                </h3>
                <span className="font-bold text-xs text-slate-900 block mt-1">
                  {formatFCFA(item.price || item.basePrice)}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
