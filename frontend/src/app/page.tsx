import Link from 'next/link';
import {
  ArrowRight,
  Smartphone,
  Sparkles,
  Home as HomeIcon,
  Star,
  ShieldCheck,
  Truck,
  Headphones,
  CreditCard,
  Zap,
} from 'lucide-react';
import { getShops } from '../services/api';

export default async function HomePage() {
  const shops = await getShops();

  // 4 Boutiques Populaires fidèles à la maquette
  const popularShops = [
    {
      id: '1',
      name: 'Style & Mode',
      slug: 'style-and-mode',
      category: 'Mode, Vêtements',
      rating: '4.8',
      image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: '2',
      name: 'TechZone',
      slug: 'techzone',
      category: 'Électronique, Accessoires',
      rating: '4.6',
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: '3',
      name: 'Beauty World',
      slug: 'beauty-world',
      category: 'Beauté, Soins',
      rating: '4.7',
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: '4',
      name: 'Maison Chic',
      slug: 'maison-chic',
      category: 'Maison, Décoration',
      rating: '4.5',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=400&q=80',
    },
  ];

  return (
    <div className="space-y-4 pb-6 bg-[#fafafa]">
      {/* 1. Grande Bannière Promotionnelle Jaune/Ambrée Écran Accueil */}
      <section className="px-4 pt-1">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#e58a00] via-[#f59e0b] to-[#d97706] text-white p-5 shadow-sm min-h-[190px] flex items-center justify-between">
          {/* Photo Mode Femme Stylée à droite */}
          <div className="absolute right-0 top-0 bottom-0 w-[48%] overflow-hidden pointer-events-none">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80"
              alt="Fashion woman"
              className="w-full h-full object-cover object-top mix-blend-multiply opacity-90 scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#e58a00] via-transparent to-transparent" />
          </div>

          {/* Contenu Texte à gauche */}
          <div className="relative z-10 space-y-2 max-w-[210px]">
            <h1 className="text-[21px] font-black leading-[1.15] text-white drop-shadow-xs">
              La meilleure boutique en ligne
            </h1>
            <p className="text-[11px] font-medium text-amber-100/90 leading-tight">
              Mode • Électronique • Beauté • Maison • Sport
            </p>
            <div className="pt-2">
              <Link
                href="/categories"
                className="inline-flex items-center gap-1.5 bg-[#fcd34d] hover:bg-[#fbbf24] text-slate-950 font-black text-xs py-2 px-3.5 rounded-full shadow-sm transition active:scale-95"
              >
                <span>Découvrir maintenant</span>
                <ArrowRight className="w-3.5 h-3.5 stroke-[2.5px]" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Rangée des 5 Catégories Circulaires Pastel */}
      <section className="px-4 pt-1">
        <div className="flex justify-between items-center gap-2">
          {/* Mode */}
          <Link href="/categories" className="flex flex-col items-center gap-1.5 group flex-1">
            <div className="w-12 h-12 rounded-full bg-[#fef08a] flex items-center justify-center text-slate-900 shadow-2xs group-hover:scale-105 transition">
              {/* Icône Cintre Hanger */}
              <svg className="w-6 h-6 stroke-[2px] stroke-current fill-none" viewBox="0 0 24 24">
                <path d="M12 4a3 3 0 0 1 3 3c0 .8-.3 1.5-.8 2L2 17h20L12.8 9" />
                <path d="M2 17v2a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-2" />
              </svg>
            </div>
            <span className="text-xs font-semibold text-slate-800">Mode</span>
          </Link>

          {/* Électronique */}
          <Link href="/categories" className="flex flex-col items-center gap-1.5 group flex-1">
            <div className="w-12 h-12 rounded-full bg-[#e0f2fe] flex items-center justify-center text-slate-800 shadow-2xs group-hover:scale-105 transition">
              <Smartphone className="w-5 h-5 stroke-[2px]" />
            </div>
            <span className="text-xs font-semibold text-slate-800">Électronique</span>
          </Link>

          {/* Beauté */}
          <Link href="/categories" className="flex flex-col items-center gap-1.5 group flex-1">
            <div className="w-12 h-12 rounded-full bg-[#fce7f3] flex items-center justify-center text-rose-600 shadow-2xs group-hover:scale-105 transition">
              {/* Icône Rouge à lèvres Lipstick */}
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M7 13h10v8a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1v-8zm2-1V7a3 3 0 0 1 6 0v5H9z" />
              </svg>
            </div>
            <span className="text-xs font-semibold text-slate-800">Beauté</span>
          </Link>

          {/* Maison */}
          <Link href="/categories" className="flex flex-col items-center gap-1.5 group flex-1">
            <div className="w-12 h-12 rounded-full bg-[#fef3c7] flex items-center justify-center text-slate-800 shadow-2xs group-hover:scale-105 transition">
              <HomeIcon className="w-5 h-5 stroke-[2px]" />
            </div>
            <span className="text-xs font-semibold text-slate-800">Maison</span>
          </Link>

          {/* Sport */}
          <Link href="/categories" className="flex flex-col items-center gap-1.5 group flex-1">
            <div className="w-12 h-12 rounded-full bg-[#dcfce7] flex items-center justify-center text-emerald-700 shadow-2xs group-hover:scale-105 transition">
              <Zap className="w-5 h-5 stroke-[2px]" />
            </div>
            <span className="text-xs font-semibold text-slate-800">Sport</span>
          </Link>
        </div>
      </section>

      {/* 3. Section Boutiques populaires */}
      <section className="px-4 space-y-2.5 pt-2">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-base text-slate-900 tracking-tight">
            Boutiques populaires
          </h2>
          <Link
            href="/boutiques"
            className="text-xs font-bold text-emerald-600 hover:text-emerald-700 transition"
          >
            Voir tout
          </Link>
        </div>

        {/* Grille horizontale des 4 boutiques */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {popularShops.map((shop) => (
            <Link
              key={shop.id}
              href={`/boutiques/${shop.slug}`}
              className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-2xs hover:shadow-sm hover:border-slate-200 transition group flex flex-col"
            >
              {/* Image Boutique */}
              <div className="aspect-[4/3] w-full bg-slate-100 overflow-hidden relative">
                <img
                  src={shop.image}
                  alt={shop.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
              </div>

              {/* Infos Boutique */}
              <div className="p-2 space-y-0.5">
                <h3 className="font-bold text-xs text-slate-900 truncate">
                  {shop.name}
                </h3>
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                  <span className="text-[11px] font-bold text-slate-800">
                    {shop.rating}
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 truncate">
                  {shop.category}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. Barre de Réassurance et Confiance (4 badges) */}
      <section className="px-4 pt-2">
        <div className="bg-white rounded-2xl border border-slate-100/90 py-3 px-2 shadow-2xs grid grid-cols-4 divide-x divide-slate-100 text-center">
          {/* Produits sécurisés */}
          <div className="flex flex-col items-center gap-1 px-1">
            <ShieldCheck className="w-5 h-5 text-slate-800 stroke-[1.8px]" />
            <span className="text-[10px] font-semibold text-slate-700 leading-tight">
              Produits sécurisés
            </span>
          </div>

          {/* Livraison rapide */}
          <div className="flex flex-col items-center gap-1 px-1">
            <Truck className="w-5 h-5 text-slate-800 stroke-[1.8px]" />
            <span className="text-[10px] font-semibold text-slate-700 leading-tight">
              Livraison rapide
            </span>
          </div>

          {/* Service client 7j/7 */}
          <div className="flex flex-col items-center gap-1 px-1">
            <Headphones className="w-5 h-5 text-slate-800 stroke-[1.8px]" />
            <span className="text-[10px] font-semibold text-slate-700 leading-tight">
              Service client 7j/7
            </span>
          </div>

          {/* Paiement à la livraison */}
          <div className="flex flex-col items-center gap-1 px-1">
            <CreditCard className="w-5 h-5 text-slate-800 stroke-[1.8px]" />
            <span className="text-[10px] font-semibold text-slate-700 leading-tight">
              Paiement à la livraison
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
