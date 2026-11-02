#!/usr/bin/env bash
set -euo pipefail

capture() {
  local src="$1"
  local start="$2"
  local end="$3"
  local out="$4"
  local lang="$5"
  local title="$6"
  mkdir -p "$(dirname "$out")"
  sed -n "${start},${end}p" "$src" | silicon \
    --language "$lang" \
    --theme "Dracula" \
    --background "#0f172a" \
    --window-title "$title" \
    --output "$out"
  echo "[OK] Generated $out"
}

mkdir -p docs/assets/captures
capture "backend/src/main.ts" 8 42 "docs/assets/captures/code-security-cors.png" "ts" "main.ts — Sécurité HTTP & CORS Dynamique"
capture "backend/src/api/health/health.controller.ts" 1 18 "docs/assets/captures/code-health-probes.png" "ts" "health.controller.ts — Sondes de Santé Liveness & Readiness"
capture "backend/src/modules/products/products.service.ts" 24 49 "docs/assets/captures/code-products-service.png" "ts" "products.service.ts — Publication Sécurisée des Produits"
capture "backend/src/infrastructure/orders/prisma-orders.repository.ts" 370 395 "docs/assets/captures/code-vendor-balance.png" "ts" "prisma-orders.repository.ts — Calcul des Soldes & Retraits Vendeur"
