'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Crown, LoaderCircle, LockKeyhole } from 'lucide-react';
import { AdminApiError, adminLogin } from '../../services/admin-api';

export default function AdminLoginPage() {
  const router = useRouter();
  const [identity, setIdentity] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      const result = await adminLogin(identity, password);
      sessionStorage.setItem('super-admin-token', result.accessToken);
      sessionStorage.setItem('super-admin-name', result.user.fullName);
      router.replace('/');
    } catch (cause) {
      setError(cause instanceof AdminApiError && cause.status === 401
        ? 'Identifiants invalides.'
        : 'Service indisponible. Réessaie dans quelques instants.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen grid lg:grid-cols-[1fr_0.9fr] bg-[#f3f4ef] text-slate-950">
      <section className="hidden lg:flex flex-col justify-between bg-[#102c27] p-12 text-white">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-amber-400 text-[#102c27]">
            <Crown className="h-5 w-5" />
          </span>
          <div>
            <p className="font-bold">Malick Buss</p>
            <p className="text-xs text-emerald-100/70">Administration sécurisée</p>
          </div>
        </div>
        <div className="max-w-lg">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-amber-300">Espace de contrôle</p>
          <h1 className="text-5xl font-black leading-tight">La marketplace, sous contrôle.</h1>
          <p className="mt-5 max-w-md text-sm leading-6 text-emerald-50/75">
            Connecte-toi avec les identifiants du compte Super Admin pour accéder aux opérations de la plateforme.
          </p>
        </div>
        <p className="text-xs text-emerald-100/50">Sénégal · FCFA</p>
      </section>

      <section className="flex items-center justify-center px-5 py-12">
        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-7">
          <div className="lg:hidden mb-10 flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#102c27] text-amber-300">
              <Crown className="h-5 w-5" />
            </span>
            <div>
              <p className="font-bold">Malick Buss</p>
              <p className="text-xs text-slate-500">Super Administration</p>
            </div>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-800">Accès réservé</p>
            <h2 className="mt-2 text-3xl font-black">Connexion admin</h2>
            <p className="mt-2 text-sm text-slate-600">Utilise ton adresse e-mail ou ton numéro de téléphone.</p>
          </div>

          <label className="block space-y-2 text-sm font-semibold">
            Identifiant
            <input
              autoComplete="username"
              required
              value={identity}
              onChange={(event) => setIdentity(event.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-3 outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/15"
              placeholder="admin@exemple.sn"
            />
          </label>

          <label className="block space-y-2 text-sm font-semibold">
            Mot de passe
            <span className="relative block">
              <LockKeyhole className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                autoComplete="current-password"
                required
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white py-3 pl-10 pr-3.5 outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/15"
                placeholder="Mot de passe"
              />
            </span>
          </label>

          {error && <p role="alert" className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2.5 text-sm text-rose-800">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#102c27] px-4 py-3.5 text-sm font-bold text-white transition hover:bg-[#194239] disabled:cursor-wait disabled:opacity-70"
          >
            {submitting && <LoaderCircle className="h-4 w-4 animate-spin" />}
            {submitting ? 'Vérification…' : 'Se connecter'}
          </button>
        </form>
      </section>
    </main>
  );
}