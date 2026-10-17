import Link from 'next/link';
import {
  ShieldCheck,
  Truck,
  Headphones,
  CreditCard,
  Phone,
  Mail,
  MapPin,
  Store,
  ArrowRight,
} from 'lucide-react';
import { BrandLogo } from '../ui/BrandLogo';

export function DesktopFooter() {
  return (
    <footer className="hidden md:block bg-slate-950 text-slate-300 border-t border-slate-800 mt-16 font-sans">
      {/* 4 Piliers de Confiance en Bandeau Supérieur */}
      <div className="border-b border-slate-800/80 bg-slate-900/60 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-400/20 text-amber-400 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-5 h-5 stroke-[2px]" />
            </div>
            <div>
              <h4 className="font-bold text-xs text-white">Produits Authentiques</h4>
              <p className="text-[11px] text-slate-400">Vérifiés par Malick Buss</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-400/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
              <Truck className="w-5 h-5 stroke-[2px]" />
            </div>
            <div>
              <h4 className="font-bold text-xs text-white">Livraison Express</h4>
              <p className="text-[11px] text-slate-400">Dakar en 24h & Régions</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-400/20 text-blue-400 flex items-center justify-center flex-shrink-0">
              <Headphones className="w-5 h-5 stroke-[2px]" />
            </div>
            <div>
              <h4 className="font-bold text-xs text-white">Service Client 7j/7</h4>
              <p className="text-[11px] text-slate-400">Assistance WhatsApp & Appel</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-400/20 text-purple-400 flex items-center justify-center flex-shrink-0">
              <CreditCard className="w-5 h-5 stroke-[2px]" />
            </div>
            <div>
              <h4 className="font-bold text-xs text-white">Paiement Mobile & Cash</h4>
              <p className="text-[11px] text-slate-400">Wave, Orange Money & Livraison</p>
            </div>
          </div>
        </div>
      </div>

      {/* Liens Principaux du Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Colonne 1 : À Propos */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <BrandLogo size="md" variant="light" />
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Malick Buss est la plateforme multi-boutiques de référence au Sénégal. Découvrez le meilleur de la mode, de la friperie de qualité, de l'électronique et de la maison au meilleur prix.
          </p>
          <div className="pt-2 text-xs space-y-1.5 text-slate-400">
            <p className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span>Dakar Plateau, Sénégal</span>
            </p>
            <p className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>+221 77 123 45 67 (WhatsApp / Appel)</span>
            </p>
            <p className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-blue-400 flex-shrink-0" />
              <span>contact@malickbuss.sn</span>
            </p>
          </div>
        </div>

        {/* Colonne 2 : Acheter sur Malick Buss */}
        <div className="space-y-3">
          <h4 className="font-bold text-sm text-white uppercase tracking-wider">Acheter</h4>
          <ul className="space-y-2 text-xs text-slate-400">
            <li>
              <Link href="/boutiques" className="hover:text-amber-400 transition">
                Toutes les boutiques
              </Link>
            </li>
            <li>
              <Link href="/categories" className="hover:text-amber-400 transition">
                Toutes les catégories
              </Link>
            </li>
            <li>
              <Link href="/boutiques/style-and-mode" className="hover:text-amber-400 transition">
                Mode & Friperie Dakar
              </Link>
            </li>
            <li>
              <Link href="/categories" className="hover:text-amber-400 transition">
                Électronique & High-Tech
              </Link>
            </li>
            <li>
              <Link href="/panier" className="hover:text-amber-400 transition">
                Mon Panier d'achat
              </Link>
            </li>
          </ul>
        </div>

        {/* Colonne 3 : Vendre & Espace Vendeur */}
        <div className="space-y-3">
          <h4 className="font-bold text-sm text-white uppercase tracking-wider">Boutiquiers</h4>
          <ul className="space-y-2 text-xs text-slate-400">
            <li>
              <Link href="/vendeur/accueil" className="hover:text-amber-400 transition font-semibold text-amber-300">
                Ouvrir ma boutique gratuitement
              </Link>
            </li>
            <li>
              <Link href="/vendeur/dashboard" className="hover:text-amber-400 transition">
                Tableau de bord Vendeur
              </Link>
            </li>
            <li>
              <Link href="/vendeur/produits/ajouter" className="hover:text-amber-400 transition">
                Ajouter des articles
              </Link>
            </li>
            <li>
              <Link href="/vendeur/commissions" className="hover:text-amber-400 transition">
                Commissions & Retraits Wave
              </Link>
            </li>
            <li>
              <Link href="/vendeur/galerie" className="hover:text-amber-400 transition">
                Maquette Mobile des 19 Écrans
              </Link>
            </li>
          </ul>
        </div>

        {/* Colonne 4 : Moyens de paiement & Newsletter */}
        <div className="space-y-4">
          <h4 className="font-bold text-sm text-white uppercase tracking-wider">Paiement Sécurisé</h4>
          <p className="text-xs text-slate-400">
            Réglez vos commandes facilement via les services préférés au Sénégal :
          </p>
          <div className="flex items-center gap-2">
            <span className="bg-sky-500/20 border border-sky-400/40 text-sky-300 font-bold text-xs px-2.5 py-1.5 rounded-lg">
              Wave 1%
            </span>
            <span className="bg-orange-500/20 border border-orange-400/40 text-orange-300 font-bold text-xs px-2.5 py-1.5 rounded-lg">
              Orange Money
            </span>
            <span className="bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 font-bold text-xs px-2.5 py-1.5 rounded-lg">
              À la livraison
            </span>
          </div>

          <div className="pt-2">
            <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-xs space-y-2">
              <span className="font-bold text-white block">Vous êtes commerçant ?</span>
              <p className="text-[11px] text-slate-400">
                Rejoignez les 500+ boutiquiers qui vendent déjà sur Malick Buss.
              </p>
              <Link
                href="/vendeur/accueil"
                className="inline-flex items-center gap-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs px-3 py-1.5 rounded-xl transition"
              >
                <span>Commencer à vendre</span>
                <ArrowRight className="w-3.5 h-3.5 stroke-[2.5px]" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Bas de Page */}
      <div className="border-t border-slate-800/80 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>© 2026 Malick Buss. Tous droits réservés. Conçu pour le Sénégal 🇸🇳</span>
          <div className="flex items-center gap-4 text-slate-400 text-[11px]">
            <Link href="/" className="hover:underline">Conditions d'utilisation</Link>
            <Link href="/" className="hover:underline">Politique de confidentialité</Link>
            <Link href="/vendeur/dashboard" className="text-amber-400 hover:underline">Espace Boutiquier</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
