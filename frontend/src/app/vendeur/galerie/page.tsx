'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function GalerieRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/vendeur/dashboard');
  }, [router]);

  return null;
}
