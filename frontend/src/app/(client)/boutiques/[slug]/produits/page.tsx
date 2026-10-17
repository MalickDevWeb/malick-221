import Link from 'next/link';
import { ArrowLeft, SlidersHorizontal, Star, Heart } from 'lucide-react';
import { formatFCFA } from '../../../../../services/api';

export default function ShopProductsListingPage({
  params,
}: {
  params: { slug: string };
}) {
  const shopName = params.slug === 'dakar-streetwear' ? 'Dakar Streetwear' : 'Style & Mode';

  const products = [
    {
      id: '1',
      title: 'Veste en jean',
      price: 12000,
      rating: '4.8',
      image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: '2',
      title: 'Hoodie Nike',
      price: 15000,
      rating: '4.7',
      image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: '3',
      title: 'Sneakers',
      price: 18000,
      rating: '4.6',
      image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: '4',
      title: 'T-shirt vintage',
      price: 8000,
      rating: '4.5',
      image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=400&q=80',
    },
  ];

  return (
    <div className="space-y-4 pb-8">
      {/* Header Écran 6 */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-100 px-4 py-3 flex items-center justify-between">
        <Link href={`/boutiques/${params.slug}`} className="flex items-center gap-2 text-slate-800">
          <ArrowLeft className="w-5 h-5 stroke-[2.2px]" />
          <h1 className="font-bold text-base text-slate-900">{shopName}</h1>
        </Link>
        <button className="text-slate-700 p-1 hover:bg-slate-100 rounded-lg">
          <SlidersHorizontal className="w-5 h-5 stroke-[2px]" />
        </button>
      </header>

      {/* Filtres Pilules Écran 6 */}
      <div className="px-4 flex gap-2 overflow-x-auto scrollbar-none">
        <button className="bg-emerald-600 text-white font-semibold text-xs px-4 py-1.5 rounded-full flex-shrink-0">
          Tous
        </button>
        {['Homme', 'Femme', 'Enfant'].map((filter) => (
          <button
            key={filter}
            className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-xs px-4 py-1.5 rounded-full flex-shrink-0 transition"
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Grille des Produits Écran 6 */}
      <div className="px-4 grid grid-cols-2 gap-3">
        {products.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm flex flex-col justify-between"
          >
            <div className="relative aspect-square bg-slate-100 overflow-hidden">
              <Link href={`/produits/${item.id}`}>
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover hover:scale-105 transition duration-300"
                />
              </Link>
              <button className="absolute top-2 right-2 w-7 h-7 bg-white/90 rounded-full flex items-center justify-center shadow-sm">
                <Heart className="w-3.5 h-3.5 text-slate-400" />
              </button>
            </div>

            <div className="p-3 space-y-2">
              <Link href={`/produits/${item.id}`} className="block">
                <h3 className="font-semibold text-xs text-slate-900 truncate">
                  {item.title}
                </h3>
                <span className="font-bold text-xs text-slate-900 block mt-0.5">
                  {formatFCFA(item.price)}
                </span>
                <div className="flex items-center gap-1 mt-1 text-[11px] font-bold text-slate-700">
                  <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                  <span>{item.rating}</span>
                </div>
              </Link>

              <button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] py-1.5 px-2 rounded-xl transition shadow-sm active:scale-95">
                Ajouter au panier
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

