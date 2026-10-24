/**
 * Service de Configuration Plateforme & Canaux WhatsApp Malick Buss (Back-office)
 * Rendu 100% dynamique et modifiable par le Super Admin :
 * - Numéro de contact WhatsApp du Super Admin (défaut : 77 171 90 13)
 * - Modèles de messages de validation et de confirmation
 */

export interface PlatformSettings {
  superAdminPhone: string;
  superAdminName: string;
  supportPhone: string;
  supportEmail: string;
  validationRequestMessage: string;
  validationApprovalMessage: string;
  updatedAt: string;
}

const SETTINGS_KEY = 'malick_platform_settings';

export const DEFAULT_PLATFORM_SETTINGS: PlatformSettings = {
  superAdminPhone: '77 171 90 13',
  superAdminName: 'Super Admin Malick Buss',
  supportPhone: '77 171 90 13',
  supportEmail: 'support@malickbuss.sn',
  validationRequestMessage:
    'Bonjour {adminName}, je viens de créer ma boutique *{shopName}* (Gérant: {vendorName}, Tél: {vendorPhone}, Catégorie: {category}, Quartier: {district}). Pouvez-vous vérifier et valider ma boutique s\'il vous plaît ? Merci !',
  validationApprovalMessage:
    'Bonjour {vendorName}, Félicitations ! 🎉\n\nVotre boutique "{shopName}" a été vérifiée et validée avec succès par l\'équipe Super Admin de Malick Buss.\n\nVotre boutique est désormais active et vous pouvez dès à présent ajouter vos produits et gérer vos ventes :\n👉 https://malickbuss.sn/vendeur/dashboard\n\nBienvenue parmi nous et excellentes ventes !',
  updatedAt: new Date().toISOString(),
};

export function formatPhoneForWhatsApp(phone: string): string {
  const digits = (phone || '').replace(/[^0-9]/g, '');
  if (!digits) return '221771719013';
  if (digits.startsWith('221') && digits.length >= 12) return digits;
  if (digits.length === 9) return `221${digits}`;
  return digits.startsWith('221') ? digits : `221${digits}`;
}

export function getPlatformSettings(): PlatformSettings {
  if (typeof window === 'undefined') return DEFAULT_PLATFORM_SETTINGS;
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (!raw) {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(DEFAULT_PLATFORM_SETTINGS));
      return DEFAULT_PLATFORM_SETTINGS;
    }
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_PLATFORM_SETTINGS, ...parsed };
  } catch (err) {
    console.warn('Erreur lecture platform settings:', err);
    return DEFAULT_PLATFORM_SETTINGS;
  }
}

export function savePlatformSettings(updates: Partial<PlatformSettings>): PlatformSettings {
  const current = getPlatformSettings();
  const updated: PlatformSettings = {
    ...current,
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(updated));
      window.dispatchEvent(new CustomEvent('malick_settings_updated', { detail: updated }));
    } catch (err) {
      console.error('Erreur écriture platform settings:', err);
    }
  }

  return updated;
}

export function generateValidationApprovalMessage(params: {
  shopName: string;
  vendorName: string;
  vendorPhone?: string;
}): string {
  const settings = getPlatformSettings();
  const template = settings.validationApprovalMessage || DEFAULT_PLATFORM_SETTINGS.validationApprovalMessage;
  return template
    .replace('{shopName}', params.shopName)
    .replace('{vendorName}', params.vendorName)
    .replace('{vendorPhone}', params.vendorPhone || '');
}

export function buildWhatsAppUrl(phone: string, text: string): string {
  const cleanPhone = formatPhoneForWhatsApp(phone);
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
}

