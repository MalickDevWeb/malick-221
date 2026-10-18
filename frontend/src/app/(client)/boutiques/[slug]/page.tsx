import { redirect } from 'next/navigation';

export default function ShopDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  redirect(`/boutiques/${params.slug}/produits`);
}
