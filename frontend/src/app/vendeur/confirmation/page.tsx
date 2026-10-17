'use client';

import Link from 'next/link';
import { Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { ConfettiCelebration } from '../../../components/motion/ConfettiCelebration';

export default function VendorProductConfirmationScreen20() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between p-6">
      {/* Tir de confettis dorés et émeraudes */}
      <ConfettiCelebration />

      <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4 max-w-xs mx-auto">
        {/* Grande Icône Verte Circulaire Écran 20 avec Animation Ressort */}
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.1 }}
          className="w-20 h-20 rounded-full border-4 border-emerald-500 flex items-center justify-center text-emerald-500 shadow-lg bg-emerald-50/60"
        >
          <Check className="w-10 h-10 stroke-[3px]" />
        </motion.div>

        {/* Titre & Message avec Fondu */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="space-y-1.5 pt-2"
        >
          <h1 className="text-xl font-black text-slate-900 tracking-tight">
            Produit ajouté avec succès !
          </h1>
          <p className="text-xs text-slate-500 leading-relaxed">
            Votre produit a été publié sur votre boutique et est désormais visible par tous les clients.
          </p>
        </motion.div>
      </div>

      {/* 2 Boutons d'Action Inférieurs Écran 20 avec Micro-interactions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="space-y-2.5 max-w-sm mx-auto w-full pb-4"
      >
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
          <Link
            href="/vendeur/produits"
            className="block w-full bg-amber-500 hover:bg-amber-600 active:scale-[0.99] text-white font-bold py-3.5 px-4 rounded-xl text-center shadow-md text-xs transition"
          >
            Voir mon produit
          </Link>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
          <Link
            href="/vendeur/boutique"
            className="block w-full bg-white hover:bg-slate-50 active:scale-[0.99] border border-slate-200 text-slate-800 font-bold py-3.5 px-4 rounded-xl text-center text-xs transition shadow-2xs"
          >
            Retour à la boutique
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
