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
 * Compresse et redimensionne une image côté client pour éviter d'envoyer des Mo inutiles
 * et garantir une publication instantanée même avec des photos de smartphone haute résolution.
 */
export function compressImage(file: File | Blob, maxWidth = 1200, quality = 0.8): Promise<string> {
  return new Promise((resolve) => {
    // Si ce n'est pas une image ou si l'environnement n'a pas de DOM (SSR), fallback direct
    if (typeof window === 'undefined' || (file.type && !file.type.startsWith('image/'))) {
      readFileAsDataUrl(file).then(resolve).catch(() => resolve(''));
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // Calcul du redimensionnement en conservant le ratio
        if (width > maxWidth || height > maxWidth) {
          if (width > height) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxWidth) / height);
            height = maxWidth;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(e.target?.result as string);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        // Exporte en image/jpeg avec qualité 0.8 (réduit 10 Mo en ~150 Ko)
        const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(compressedDataUrl);
      };
      img.onerror = () => {
        resolve(e.target?.result as string);
      };
      img.src = e.target?.result as string;
    };
    reader.onerror = () => {
      readFileAsDataUrl(file).then(resolve).catch(() => resolve(''));
    };
    reader.readAsDataURL(file);
  });
}

/**
 * Téléverse une image vers Cloudinary
 * Si Cloudinary n'est pas joignable ou les clés ne sont pas activées,
 * compresse et retourne gracieusement l'image sous format Base64 optimisé sans faire crasher l'app.
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

  // Fallback immédiat et ultra-rapide avec compression automatique
  onProgress?.(50);
  const localUrl = await compressImage(file);
  onProgress?.(100);

  return {
    url: localUrl,
    isCloudinary: false,
  };
}

export const uploadImageToCloudinary = uploadToCloudinary;

