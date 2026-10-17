import Link from 'next/link';

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-slate-800 bg-slate-950 px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center font-bold text-lg">
            MB
          </div>
          <div>
            <h1 className="text-lg font-semibold text-white">Malick Buss — Super Admin</h1>
            <p className="text-xs text-slate-400">Plateforme de gouvernance & finance</p>
          </div>
        </div>
        <div className="text-sm text-slate-400">
          Marché : <span className="text-emerald-400 font-medium">Sénégal (FCFA)</span>
        </div>
      </header>

      <main className="flex-1 p-8 max-w-7xl mx-auto w-full space-y-6">
        <h2 className="text-2xl font-bold text-white">Tableau de bord</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-slate-800 border border-slate-700 p-5 rounded-xl">
            <span className="text-xs text-slate-400 uppercase font-semibold">Boutiques actives</span>
            <p className="text-3xl font-bold text-white mt-2">0</p>
          </div>
          <div className="bg-slate-800 border border-slate-700 p-5 rounded-xl">
            <span className="text-xs text-slate-400 uppercase font-semibold">Commissions générées</span>
            <p className="text-3xl font-bold text-emerald-400 mt-2">0 FCFA</p>
          </div>
          <div className="bg-slate-800 border border-slate-700 p-5 rounded-xl">
            <span className="text-xs text-slate-400 uppercase font-semibold">Boutiques en attente KYC</span>
            <p className="text-3xl font-bold text-amber-400 mt-2">0</p>
          </div>
          <div className="bg-slate-800 border border-slate-700 p-5 rounded-xl">
            <span className="text-xs text-slate-400 uppercase font-semibold">Litiges ouverts</span>
            <p className="text-3xl font-bold text-rose-400 mt-2">0</p>
          </div>
        </div>
      </main>
    </div>
  );
}
