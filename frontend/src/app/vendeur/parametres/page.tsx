'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function VendorSettingsRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/vendeur/profil');
  }, [router]);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center text-xs font-bold text-slate-500">
      Redirection vers votre profil & paramètres...
    </div>
  );
}
