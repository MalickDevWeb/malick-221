'use client';

import { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function RedirectCategories() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const category = searchParams.get('category');
    if (category) {
      router.replace(`/boutiques?category=${encodeURIComponent(category)}`);
    } else {
      router.replace('/boutiques');
    }
  }, [router, searchParams]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3 text-slate-500 text-sm">
      <div className="w-8 h-8 border-3 border-amber-500 border-t-transparent rounded-full animate-spin" />
      <p className="font-semibold text-slate-700">Redirection vers les boutiques de Dakar...</p>
    </div>
  );
}

export default function CategoriesPage() {
  return (
    <Suspense fallback={null}>
      <RedirectCategories />
    </Suspense>
  );
}
