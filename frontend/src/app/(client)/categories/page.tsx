import Link from 'next/link';
import { ArrowLeft, Search } from 'lucide-react';

export default function CategoriesPage() {
  const categories = [
    {
      title: 'Mode',
      subtitle: 'Vêtements, chaussures...',
      image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=500&q=80',
      href: '/categories/mode',
    },
    {
      title: 'Électronique',
      subtitle: 'Téléphones, ordinateurs...',
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=500&q=80',
      href: '/categories/electronique',
    },
    {
      title: 'Beauté',
      subtitle: 'Parfums, soins...',
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=500&q=80',
      href: '/categories/beaute',
    },
    {
      title: 'Maison',
      subtitle: 'Déco, cuisine...',
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=500&q=80',
      href: '/categories/maison',
    },
    {
      title: 'Sport',
      subtitle: 'Fitness, accessoires...',
      image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=500&q=80',
      href: '/categories/sport',
    },
    {
      title: 'Enfants',
      subtitle: 'Vêtements, jouets...',
      image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=500&q=80',
      href: '/categories/enfants',
    },
  ];

  return (
    <div className="space-y-4 pb-6">
      {/* Header Écran 3 */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-100 px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-slate-800">
          <ArrowLeft className="w-5 h-5 stroke-[2.2px]" />
          <h1 className="font-bold text-base text-slate-900">Catégories</h1>
        </Link>
        <button className="text-slate-700 p-1 hover:bg-slate-100 rounded-lg">
          <Search className="w-5 h-5 stroke-[2px]" />
        </button>
      </header>

      {/* Grille Catégories 2 Colonnes */}
      <div className="px-4 grid grid-cols-2 gap-3.5">
        {categories.map((cat) => (
          <Link
            key={cat.title}
            href={cat.href}
            className="group bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col"
          >
            <div className="h-28 w-full bg-slate-100 overflow-hidden">
              <img
                src={cat.image}
                alt={cat.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-3">
              <h2 className="font-bold text-sm text-slate-900 group-hover:text-emerald-600 transition-colors">
                {cat.title}
              </h2>
              <p className="text-[11px] text-slate-400 mt-0.5 truncate">
                {cat.subtitle}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
