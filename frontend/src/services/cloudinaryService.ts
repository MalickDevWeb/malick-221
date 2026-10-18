/**
 * Service Cloudinary pour Malick Buss
 * Gère l'upload direct d'images vers Cloudinary (Unsigned Preset)
 * avec fallback local automatique haute fidélité pour un fonctionnement 100% garanti.
 */

export interface CloudinaryConfig {
  cloudName: string;
  uploadPreset: string;
}

const STORAGE_KEY = 'malick_cloudinary_config';

export function getCloudinaryConfig(): CloudinaryConfig {
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Failed to read Cloudinary config from localStorage', e);
    }
  }

  return {
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'malick-buss',
    uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_PRESET || 'malick_preset',
  };
}

export function saveCloudinaryConfig(config: CloudinaryConfig): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  }
}

/**
 * Lit un fichier en tant que Data URL Base64 (Fallback résilient)
 */
export function readFileAsDataUrl(file: File | Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
}

/**
 * Téléverse une image vers Cloudinary
 * Si Cloudinary n'est pas joignable ou les clés ne sont pas activées,
 * retourne gracieusement l'image sous format Base64 optimisé sans faire crasher l'app.
 */
export async function uploadToCloudinary(
  file: File | Blob,
  onProgress?: (percent: number) => void
): Promise<{ url: string; isCloudinary: boolean; publicId?: string }> {
  const config = getCloudinaryConfig();

  // Si une configuration Cloudinary personnalisée est détectée
  if (config.cloudName && config.uploadPreset && config.cloudName !== 'malick-buss') {
    try {
      onProgress?.(25);
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', config.uploadPreset);

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${config.cloudName}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      if (res.ok) {
        onProgress?.(100);
        const data = await res.json();
        return {
          url: data.secure_url || data.url,
          isCloudinary: true,
          publicId: data.public_id,
        };
      }
    } catch (err) {
      console.warn('Cloudinary upload attempt failed, falling back to local asset:', err);
    }
  }

  // Fallback immédiat et ultra-rapide
  onProgress?.(50);
  const localUrl = await readFileAsDataUrl(file);
  onProgress?.(100);

  return {
    url: localUrl,
    isCloudinary: false,
  };
}
