'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageCircle,
  Phone,
  HelpCircle,
  X,
  ChevronRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import Link from 'next/link';

export function InAppSupportWidget() {
  const [isOpen, setIsOpen] = useState(false);

  const officialPhone = '+221 77 171 90 13';
  const whatsappNumber = '221771719013';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Bonjour Malick Buss, j'ai une question concernant un achat sur la marketplace."
  )}`;

  return (
    <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="mb-3 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden"
          >
            {/* Header du Widget */}
            <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-4 sm:p-5">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center font-black text-sm">
                    MB
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">Assistance Malick Buss</h4>
                    <p className="text-xs text-emerald-400 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Support en ligne (Dakar)
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                  aria-label="Fermer l'assistance"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-xs text-slate-300 mt-2">
                Une question sur un produit, une commande ou un virement Wave / Orange Money ?
              </p>
            </div>

            {/* Corps du Widget */}
            <div className="p-4 space-y-3 bg-slate-50/50">
              {/* Option 1: WhatsApp Direct */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-xs">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 flex items-center gap-1">
                      <span>WhatsApp Direct</span>
                      <ExternalLink className="w-3 h-3 text-emerald-600" />
                    </div>
                    <p className="text-[11px] text-slate-600">Réponse sous 5 min • +221 77 171 90 13</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-emerald-600 group-hover:translate-x-0.5 transition-transform" />
              </a>

              {/* Option 2: Appel Téléphonique */}
              <a
                href={`tel:${whatsappNumber}`}
                className="flex items-center justify-between p-3 rounded-xl bg-amber-50 hover:bg-amber-100/80 border border-amber-200 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center shadow-xs">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">Appel Téléphonique</div>
                    <p className="text-[11px] text-slate-600">Lun-Sam 8h-20h • {officialPhone}</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-amber-600 group-hover:translate-x-0.5 transition-transform" />
              </a>

              {/* Option 3: Centre d'Aide & FAQ */}
              <Link
                href="/aide"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between p-3 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-xs">
                    <HelpCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">Centre d’Aide & FAQ</div>
                    <p className="text-[11px] text-slate-600">Livraisons, retours 7 jours, remboursements</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-600 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            {/* Footer de Réassurance */}
            <div className="p-3 bg-white border-t border-slate-100 flex items-center justify-around text-[10px] text-slate-500 font-medium">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Paiement Sécurisé
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Truck className="w-3.5 h-3.5 text-amber-500" />
                Dakar 24h
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <RotateCcw className="w-3.5 h-3.5 text-blue-500" />
                Retour 7 jours
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bouton Flottant Déclencheur */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2.5 px-4 py-3 rounded-full shadow-xl transition-all duration-300 ${
          isOpen
            ? 'bg-slate-900 text-white ring-4 ring-slate-900/10'
            : 'bg-emerald-500 hover:bg-emerald-600 text-white ring-4 ring-emerald-500/20'
        }`}
        aria-label="Ouvrir l'aide et le support"
      >
        {isOpen ? (
          <X className="w-5 h-5" />
        ) : (
          <MessageCircle className="w-5 h-5" />
        )}
        <span className="text-xs font-bold hidden sm:inline">
          {isOpen ? 'Fermer' : 'Besoin d’aide ?'}
        </span>
      </motion.button>
    </div>
  );
}
