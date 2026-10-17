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
      image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: '2',
      name: 'TechZone',
      slug: 'techzone',
      category: 'Électronique, Accessoires',
      rating: '4.6',
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: '3',
      name: 'Beauty World',
      slug: 'beauty-world',
      category: 'Beauté, Soins',
      rating: '4.7',
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: '4',
      name: 'Maison Chic',
      slug: 'maison-chic',
      category: 'Maison, Décoration',
      rating: '4.5',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=600&q=80',
    },
  ];

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-3 md:py-6 space-y-6 md:space-y-10">
        
        {/* 1. GRANDE BANNIÈRE PROMOTIONNELLE JAUNE / OR (100% RESPONSIVE) */}
        <section className="w-full">
          <div className="relative rounded-3xl md:rounded-[36px] overflow-hidden bg-gradient-to-r from-[#e58a00] via-[#f59e0b] to-[#d97706] text-white p-5 sm:p-8 md:p-12 shadow-sm min-h-[190px] md:min-h-[360px] flex items-center justify-between">
            {/* Photo Mode Stylée à droite */}
            <div className="absolute right-0 top-0 bottom-0 w-[48%] md:w-[44%] overflow-hidden pointer-events-none">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80"
                alt="Fashion woman"
                className="w-full h-full object-cover object-top mix-blend-multiply opacity-90 scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#e58a00] via-transparent to-transparent" />
            </div>

            {/* Contenu Texte à gauche */}
            <div className="relative z-10 space-y-2.5 md:space-y-4 max-w-[210px] sm:max-w-md md:max-w-xl">
              <span className="hidden md:inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider bg-black/20 backdrop-blur-md px-3 py-1 rounded-full text-amber-200">
                ★ Marketplace N°1 au Sénégal
              </span>
              <h1 className="text-[21px] sm:text-3xl md:text-5xl font-black leading-[1.12] text-white drop-shadow-xs">
                La meilleure boutique en ligne
              </h1>
              <p className="text-[11px] sm:text-sm md:text-base font-medium text-amber-100/90 leading-tight">
                Mode • Électronique • Beauté • Maison • Sport
              </p>
              <div className="pt-2 md:pt-4">
                <Link
                  href="/categories"
                  className="inline-flex items-center gap-2 bg-[#fcd34d] hover:bg-[#fbbf24] text-slate-950 font-black text-xs sm:text-sm py-2.5 px-4 md:py-3.5 md:px-6 rounded-full shadow-md transition active:scale-95"
                >
                  <span>Découvrir maintenant</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5px]" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 2. RANGÉE DES 5 CATÉGORIES CIRCULAIRES PASTEL */}
        <section className="w-full">
          <div className="flex justify-between items-center gap-2 sm:gap-4 md:gap-6">
            {/* Mode */}
            <Link
              href="/categories"
              className="flex flex-col items-center gap-1.5 md:gap-2.5 group flex-1"
            >
              <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full bg-[#fef08a] flex items-center justify-center text-slate-900 shadow-2xs group-hover:scale-110 group-hover:shadow-md transition">
                <svg className="w-6 h-6 md:w-9 md:h-9 stroke-[2px] stroke-current fill-none" viewBox="0 0 24 24">
                  <path d="M12 4a3 3 0 0 1 3 3c0 .8-.3 1.5-.8 2L2 17h20L12.8 9" />
                  <path d="M2 17v2a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-2" />
                </svg>
              </div>
              <span className="text-xs sm:text-sm font-semibold text-slate-800 group-hover:text-amber-600 transition">
                Mode
              </span>
            </Link>

            {/* Électronique */}
            <Link
              href="/categories"
              className="flex flex-col items-center gap-1.5 md:gap-2.5 group flex-1"
            >
              <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full bg-[#e0f2fe] flex items-center justify-center text-slate-800 shadow-2xs group-hover:scale-110 group-hover:shadow-md transition">
                <Smartphone className="w-5 h-5 md:w-8 md:h-8 stroke-[2px]" />
              </div>
              <span className="text-xs sm:text-sm font-semibold text-slate-800 group-hover:text-amber-600 transition">
                Électronique
              </span>
            </Link>

            {/* Beauté */}
            <Link
              href="/categories"
              className="flex flex-col items-center gap-1.5 md:gap-2.5 group flex-1"
            >
              <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full bg-[#fce7f3] flex items-center justify-center text-rose-600 shadow-2xs group-hover:scale-110 group-hover:shadow-md transition">
                <svg className="w-5 h-5 md:w-8 md:h-8 fill-current" viewBox="0 0 24 24">
                  <path d="M7 13h10v8a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1v-8zm2-1V7a3 3 0 0 1 6 0v5H9z" />
                </svg>
              </div>
              <span className="text-xs sm:text-sm font-semibold text-slate-800 group-hover:text-amber-600 transition">
                Beauté
              </span>
            </Link>

            {/* Maison */}
            <Link
              href="/categories"
              className="flex flex-col items-center gap-1.5 md:gap-2.5 group flex-1"
            >
              <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full bg-[#fef3c7] flex items-center justify-center text-slate-800 shadow-2xs group-hover:scale-110 group-hover:shadow-md transition">
                <HomeIcon className="w-5 h-5 md:w-8 md:h-8 stroke-[2px]" />
              </div>
              <span className="text-xs sm:text-sm font-semibold text-slate-800 group-hover:text-amber-600 transition">
                Maison
              </span>
            </Link>

            {/* Sport */}
            <Link
              href="/categories"
              className="flex flex-col items-center gap-1.5 md:gap-2.5 group flex-1"
            >
              <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full bg-[#dcfce7] flex items-center justify-center text-emerald-700 shadow-2xs group-hover:scale-110 group-hover:shadow-md transition">
                <Zap className="w-5 h-5 md:w-8 md:h-8 stroke-[2px]" />
              </div>
              <span className="text-xs sm:text-sm font-semibold text-slate-800 group-hover:text-amber-600 transition">
                Sport
              </span>
            </Link>
          </div>
        </section>

        {/* 3. SECTION BOUTIQUES POPULAIRES (ADAPTATIVE DESKTOP & MOBILE) */}
        <section className="w-full space-y-3 md:space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-bold text-base sm:text-xl md:text-2xl text-slate-900 tracking-tight">
                Boutiques populaires
              </h2>
              <p className="hidden md:block text-xs text-slate-500 mt-0.5">
                Les commerçants les mieux notés de Dakar et du Sénégal
              </p>
            </div>
            <Link
              href="/boutiques"
              className="text-xs sm:text-sm font-bold text-emerald-600 hover:text-emerald-700 transition flex items-center gap-1"
            >
              <span>Voir tout</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Grille : 2 colonnes sur mobile, 4 colonnes sur desktop */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5 md:gap-6">
            {popularShops.map((shop) => (
              <Link
                key={shop.id}
                href={`/boutiques/${shop.slug}`}
                className="bg-white rounded-2xl md:rounded-3xl border border-slate-100 overflow-hidden shadow-2xs hover:shadow-lg hover:border-amber-200 transition-all duration-200 group flex flex-col"
              >
                {/* Image Boutique */}
                <div className="aspect-[4/3] w-full bg-slate-100 overflow-hidden relative">
                  <img
                    src={shop.image}
                    alt={shop.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                  <span className="absolute top-2 right-2 bg-slate-900/80 backdrop-blur-md text-amber-400 font-bold text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Star className="w-3 h-3 fill-amber-400" />
                    <span>{shop.rating}</span>
                  </span>
                </div>

                {/* Infos Boutique */}
                <div className="p-3 md:p-4 space-y-1">
                  <h3 className="font-bold text-xs sm:text-sm md:text-base text-slate-900 truncate group-hover:text-amber-600 transition">
                    {shop.name}
                  </h3>
                  <p className="text-[10px] sm:text-xs text-slate-400 truncate">
                    {shop.category}
                  </p>
                  <div className="pt-1.5 hidden md:block">
                    <span className="inline-block text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md">
                      Boutique vérifiée ✓
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 4. BARRE DE RÉASSURANCE ET CONFIANCE (4 BADGES) */}
        <section className="w-full pt-2">
          <div className="bg-white rounded-2xl md:rounded-3xl border border-slate-100 py-3.5 px-3 md:py-6 md:px-6 shadow-2xs grid grid-cols-4 divide-x divide-slate-100 text-center">
            {/* Produits sécurisés */}
            <div className="flex flex-col items-center gap-1 md:gap-2 px-1">
              <ShieldCheck className="w-5 h-5 md:w-8 md:h-8 text-slate-800 stroke-[1.8px]" />
              <span className="text-[10px] sm:text-xs md:text-sm font-semibold text-slate-700 leading-tight">
                Produits sécurisés
              </span>
            </div>

            {/* Livraison rapide */}
            <div className="flex flex-col items-center gap-1 md:gap-2 px-1">
              <Truck className="w-5 h-5 md:w-8 md:h-8 text-slate-800 stroke-[1.8px]" />
              <span className="text-[10px] sm:text-xs md:text-sm font-semibold text-slate-700 leading-tight">
                Livraison rapide
              </span>
            </div>

            {/* Service client 7j/7 */}
            <div className="flex flex-col items-center gap-1 md:gap-2 px-1">
              <Headphones className="w-5 h-5 md:w-8 md:h-8 text-slate-800 stroke-[1.8px]" />
              <span className="text-[10px] sm:text-xs md:text-sm font-semibold text-slate-700 leading-tight">
                Service client 7j/7
              </span>
            </div>

            {/* Paiement à la livraison */}
            <div className="flex flex-col items-center gap-1 md:gap-2 px-1">
              <CreditCard className="w-5 h-5 md:w-8 md:h-8 text-slate-800 stroke-[1.8px]" />
              <span className="text-[10px] sm:text-xs md:text-sm font-semibold text-slate-700 leading-tight">
                Paiement à la livraison
              </span>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
