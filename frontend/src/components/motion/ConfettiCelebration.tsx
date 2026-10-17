'use client';

import { useEffect } from 'react';
import confetti from 'canvas-confetti';

export function ConfettiCelebration() {
  useEffect(() => {
    // Tir de confettis dorés et émeraudes aux couleurs de Malick Buss
    const duration = 2.5 * 1000;
    const end = Date.now() + duration;

    const colors = ['#f59e0b', '#10b981', '#fbbf24', '#059669', '#ffffff'];

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  }, []);

  return null;
}

