import { PrismaClient, UserRole, ShopStatus, ProductCondition } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Début du peuplement de la base de données Malick Buss...');

  // Nettoyage préalable
  await prisma.commissionLedger.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.subOrder.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.shop.deleteMany();
  await prisma.user.deleteMany();

  // 1. Création des utilisateurs
  const admin = await prisma.user.create({
    data: {
      phoneNumber: '+221770000001',
      fullName: 'Super Admin Malick Buss',
      email: 'admin@malickbuss.sn',
      passwordHash: 'hash_securise_admin_2026',
      role: UserRole.SUPER_ADMIN,
    },
  });

  const vendor1 = await prisma.user.create({
    data: {
      phoneNumber: '+221771234567',
      fullName: 'Moussa Diop (Keur Friperie)',
      email: 'moussa@keurfriperie.sn',
      passwordHash: 'hash_securise_moussa',
      role: UserRole.VENDOR,
    },
  });

  const vendor2 = await prisma.user.create({
    data: {
      phoneNumber: '+221772345678',
      fullName: 'Aminata Ndiaye (Dakar Streetwear)',
      email: 'aminata@dakarstreet.sn',
      passwordHash: 'hash_securise_aminata',
      role: UserRole.VENDOR,
    },
  });

  const client = await prisma.user.create({
    data: {
      phoneNumber: '+221773456789',
      fullName: 'Fatou Sow',
      email: 'fatou.sow@gmail.com',
      passwordHash: 'hash_securise_client',
      role: UserRole.CLIENT,
    },
  });

  // 2. Création des boutiques
  const shop1 = await prisma.shop.create({
    data: {
      ownerId: vendor1.id,
      name: 'Keur Friperie Dakar',
      slug: 'keur-friperie-dakar',
      description: 'Le meilleur de la friperie européenne de qualité supérieure à Dakar (Sandaga / Plateau). Arrivages chaque semaine.',
      logoUrl: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=300&q=80',
      bannerUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80',
      status: ShopStatus.ACTIVE,
      wavePayoutNumber: '+221771234567',
      omPayoutNumber: '+221771234567',
    },
  });

  const shop2 = await prisma.shop.create({
    data: {
      ownerId: vendor2.id,
      name: 'Dakar Streetwear',
      slug: 'dakar-streetwear',
      description: 'Marques urbaines, hoodies, t-shirts oversize et sneakers tendance aux Almadies.',
      logoUrl: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=300&q=80',
      bannerUrl: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=1200&q=80',
      status: ShopStatus.ACTIVE,
      wavePayoutNumber: '+221772345678',
      omPayoutNumber: '+221772345678',
    },
  });

  // 3. Création des produits
  await prisma.product.createMany({
    data: [
      {
        shopId: shop1.id,
        title: 'Veste Vintage en Jean Levi’s',
        slug: 'veste-vintage-jean-levis',
        description: 'Veste en jean rétro authentique, taille L, parfait état.',
        basePrice: 15000,
        discountPrice: 12500,
        condition: ProductCondition.TRES_BON_ETAT,
        stockQuantity: 3,
        isPublished: true,
      },
      {
        shopId: shop1.id,
        title: 'Chemise Ralph Lauren Lin Blanche',
        slug: 'chemise-ralph-lauren-lin',
        description: 'Chemise en lin léger de première qualité, idéale pour le climat dakarois.',
        basePrice: 10000,
        discountPrice: 9000,
        condition: ProductCondition.BON_ETAT,
        stockQuantity: 5,
        isPublished: true,
      },
      {
        shopId: shop1.id,
        title: 'Pantalon Cargo Kaki Militaire',
        slug: 'pantalon-cargo-kaki',
        description: 'Cargo multipoches streetwear, coupe droite confortable.',
        basePrice: 8500,
        discountPrice: null,
        condition: ProductCondition.TRES_BON_ETAT,
        stockQuantity: 4,
        isPublished: true,
      },
      {
        shopId: shop2.id,
        title: 'Hoodie Oversize Dakar Club Noir',
        slug: 'hoodie-oversize-dakar-club',
        description: 'Sweat à capuche molletonné 450 GSM avec logo brodé édition Dakar.',
        basePrice: 22000,
        discountPrice: 19500,
        condition: ProductCondition.NEUF,
        stockQuantity: 12,
        isPublished: true,
      },
      {
        shopId: shop2.id,
        title: 'Sneakers Retro Low Dunk',
        slug: 'sneakers-retro-low-dunk',
        description: 'Baskets confortables cuir synthétique blanc et vert forêt.',
        basePrice: 35000,
        discountPrice: 30000,
        condition: ProductCondition.NEUF,
        stockQuantity: 7,
        isPublished: true,
      },
    ],
  });

  console.log('✅ Base de données peuplée avec succès avec des boutiques et produits sénégalais !');
}

main()
  .catch((e) => {
    console.error('Erreur lors du seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

