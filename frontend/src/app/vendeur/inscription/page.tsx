'use client';

import { AuthLoginView } from '../../../components/auth/AuthLoginView';

export default function VendorInscriptionPage() {
  return <AuthLoginView initialRole="VENDEUR" initialMode="SIGNUP" />;
}

