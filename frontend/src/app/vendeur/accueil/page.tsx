'use client';

import { AuthLoginView } from '../../../components/auth/AuthLoginView';

export default function VendorWelcomeScreen() {
  return <AuthLoginView initialRole="VENDEUR" initialMode="LOGIN" />;
}
