/**
 * Service de gestion des notifications de l'Espace Vendeur Malick Buss
 * Fournit persistance, marquage lu/non-lu, suppression et alertes temps réel.
 */

export interface VendorNotification {
  id: string;
  type: 'ORDERS' | 'COMMISSIONS' | 'SUPPORT' | 'SYSTEM';
  title: string;
  subtitle: string;
  time: string;
  href: string;
  read: boolean;
  createdAt: string;
}

const STORAGE_KEY = 'malick_buss_vendor_notifications';

const DEFAULT_NOTIFICATIONS: VendorNotification[] = [
  {
    id: 'notif-1',
    type: 'ORDERS',
    title: 'Nouvelle commande à préparer',
    subtitle: 'Commande #MB-2025-00124 (Awa Diop) • Ensemble Boubou Soie • 28 500 FCFA',
    time: 'Il y a 10 min',
    href: '/vendeur/commandes',
    read: false,
    createdAt: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
  },
  {
    id: 'notif-2',
    type: 'COMMISSIONS',
    title: 'Virement Wave validé avec succès',
    subtitle: 'Votre retrait de 25 000 FCFA vers Wave (+221 77 123 45 67) a été transféré.',
    time: 'Il y a 1 h',
    href: '/vendeur/retraits',
    read: false,
    createdAt: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'notif-3',
    type: 'COMMISSIONS',
    title: 'Commission créditée sur vente #MB-00120',
    subtitle: 'Crédit net de 12 500 FCFA ajouté à votre solde disponible.',
    time: 'Il y a 3 h',
    href: '/vendeur/retraits',
    read: true,
    createdAt: new Date(Date.now() - 180 * 60 * 1000).toISOString(),
  },
  {
    id: 'notif-4',
    type: 'SUPPORT',
    title: 'Message du client (Fatou Ndiaye)',
    subtitle: '« Bonjour, la livraison à Point E est-elle possible avant 17h aujourd\'hui ? »',
    time: 'Il y a 5 h',
    href: '/vendeur/support',
    read: true,
    createdAt: new Date(Date.now() - 300 * 60 * 1000).toISOString(),
  },
  {
    id: 'notif-5',
    type: 'ORDERS',
    title: 'Colis livré & validé par le client',
    subtitle: 'La commande #MB-2025-00122 a été remise au client Moussa Fall.',
    time: 'Hier',
    href: '/vendeur/commandes',
    read: true,
    createdAt: new Date(Date.now() - 1440 * 60 * 1000).toISOString(),
  },
];

export function getVendorNotifications(): VendorNotification[] {
  if (typeof window === 'undefined') return DEFAULT_NOTIFICATIONS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_NOTIFICATIONS));
      return DEFAULT_NOTIFICATIONS;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Erreur lecture notifications:', err);
    return DEFAULT_NOTIFICATIONS;
  }
}

function saveAndBroadcast(notifications: VendorNotification[]) {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(notifications));
      window.dispatchEvent(new Event('malick_notifications_updated'));
    } catch (err) {
      console.error('Erreur écriture notifications:', err);
    }
  }
}

export function markNotificationAsRead(id: string): VendorNotification[] {
  const current = getVendorNotifications();
  const updated = current.map((n) => (n.id === id ? { ...n, read: true } : n));
  saveAndBroadcast(updated);
  return updated;
}

export function markAllNotificationsAsRead(): VendorNotification[] {
  const current = getVendorNotifications();
  const updated = current.map((n) => ({ ...n, read: true }));
  saveAndBroadcast(updated);
  return updated;
}

export function deleteNotification(id: string): VendorNotification[] {
  const current = getVendorNotifications();
  const updated = current.filter((n) => n.id !== id);
  saveAndBroadcast(updated);
  return updated;
}

export function addVendorNotification(notif: Omit<VendorNotification, 'id' | 'createdAt' | 'read'>): VendorNotification {
  const current = getVendorNotifications();
  const newNotif: VendorNotification = {
    ...notif,
    id: `notif-${Date.now()}`,
    read: false,
    createdAt: new Date().toISOString(),
  };
  const updated = [newNotif, ...current];
  saveAndBroadcast(updated);
  return newNotif;
}

