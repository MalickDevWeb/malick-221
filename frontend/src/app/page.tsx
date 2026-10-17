import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="max-w-md mx-auto min-h-screen bg-white shadow-sm flex flex-col justify-between p-6">
      <div className="space-y-6 pt-12 text-center">
        <div className="w-16 h-16 bg-emerald-600 rounded-2xl mx-auto flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-emerald-200">
          MB
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
          Malick Buss
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          La marketplace multi-boutiques nouvelle génération au Sénégal. Découvrez vos boutiques favorites, achetez en toute confiance avec Wave ou Orange Money.
        </p>
      </div>

      <div className="space-y-3 pb-8">
        <Link
          href="/boutiques"
          className="w-full block text-center bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3.5 px-4 rounded-xl shadow-md transition"
        >
          Découvrir les boutiques
        </Link>
        <Link
          href="/dashboard"
          className="w-full block text-center bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold py-3.5 px-4 rounded-xl transition"
        >
          Espace Vendeur
        </Link>
      </div>
    </main>
  );
}
