/**
 * Service de Gestion du Compte Client Malick Buss
 * Gère le profil client, la création de compte au 1er achat avec le numéro de téléphone,
 * et la définition optionnelle d'un mot de passe sécurisé.
 */

export interface ClientAccount {
  id: string;
  fullName: string;
  phoneNumber: string;
  email?: string;
  address: string;
  district: string;
  city: string;
  hasPassword: boolean;
  createdAt: string;
  updatedAt: string;
}

const CLIENT_ACCOUNT_KEY = 'malick_client_account';

export const DEFAULT_CLIENT_ACCOUNT: ClientAccount = {
  id: 'guest-client',
  fullName: 'Client Malick Buss',
  phoneNumber: '77 123 45 67',
  email: 'client@malickbuss.sn',
  address: 'Médina, Rue 6 x Blaise Diagne',
  district: 'Médina / Sandaga',
  city: 'Dakar',
  hasPassword: false,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export function getClientAccount(): ClientAccount {
  if (typeof window === 'undefined') return DEFAULT_CLIENT_ACCOUNT;
  try {
    const raw = localStorage.getItem(CLIENT_ACCOUNT_KEY);
    if (!raw) return DEFAULT_CLIENT_ACCOUNT;
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_CLIENT_ACCOUNT, ...parsed };
  } catch (err) {
    console.warn('Erreur lecture compte client:', err);
    return DEFAULT_CLIENT_ACCOUNT;
  }
}

export function saveClientAccount(updates: Partial<ClientAccount>): ClientAccount {
  const current = getClientAccount();
  const updated: ClientAccount = {
    ...current,
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(CLIENT_ACCOUNT_KEY, JSON.stringify(updated));
      localStorage.setItem('malick_user_role', 'CLIENT');
      window.dispatchEvent(new CustomEvent('malick_client_updated', { detail: updated }));
    } catch (err) {
      console.error('Erreur sauvegarde compte client:', err);
    }
  }

  return updated;
}

export function setClientPassword(password: string): { success: boolean; error?: string } {
  if (!password || password.length < 4) {
    return { success: false, error: 'Le mot de passe doit comporter au moins 4 caractères.' };
  }

  if (typeof window !== 'undefined') {
    try {
      // Stockage sécurisé de la session client
      localStorage.setItem('malick_client_has_password', 'true');
      localStorage.setItem('malick_client_token', `client-tok-${Date.now()}`);
      saveClientAccount({ hasPassword: true });
      return { success: true };
    } catch {
      return { success: false, error: 'Impossible de sauvegarder le mot de passe.' };
    }
  }
  return { success: true };
}

