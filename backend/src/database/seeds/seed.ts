import 'dotenv/config';
import { PrismaClient, UserRole, ShopStatus, ProductCondition } from '@prisma/client';
import { randomBytes, scryptSync } from 'crypto';

const prisma = new PrismaClient();
const testPassword = process.env.SEED_TEST_PASSWORD ?? 'TestOnly-Malick-2026!';

function hashPassword(password: string): string {
  const salt = randomBytes(16);
  return `scrypt$${salt.toString('hex')}$${scryptSync(password, salt, 64).toString('hex')}`;
}

async function upsertTestUser(email: string, phoneNumber: string, fullName: string, role: UserRole) {
  const passwordHash = hashPassword(testPassword);
  return prisma.user.upsert({
    where: { email },
    create: { email, phoneNumber, fullName, passwordHash, role },
    update: { phoneNumber, fullName, passwordHash, role, isActive: true },
  });
}

async function main() {
  if (process.env.NODE_ENV === 'production') {
    throw new Error('Le seed de test est interdit en production.');
  }

  const [admin, vendor, client] = await Promise.all([
    upsertTestUser('qa.admin@malickbuss.sn', '+221770009901', 'Admin QA', UserRole.SUPER_ADMIN),
    upsertTestUser('qa.vendor@malickbuss.sn', '+221770009902', 'Vendeur QA', UserRole.VENDOR),
    upsertTestUser('qa.client@malickbuss.sn', '+221770009903', 'Client QA', UserRole.CLIENT),
  ]);

  const shop = await prisma.shop.upsert({
    where: { slug: 'qa-boutique-test' },
    create: {
      ownerId: vendor.id,
      name: 'Boutique QA Malick Buss',
      slug: 'qa-boutique-test',
      description: 'Boutique réservée aux tests locaux des API.',
      status: ShopStatus.ACTIVE,
      wavePayoutNumber: vendor.phoneNumber,
      omPayoutNumber: vendor.phoneNumber,
    },
    update: {
      ownerId: vendor.id,
      status: ShopStatus.ACTIVE,
      wavePayoutNumber: vendor.phoneNumber,
      omPayoutNumber: vendor.phoneNumber,
    },
  });

  const productData = {
    title: 'Article de test API',
    description: 'Produit stable pour les tests locaux des endpoints.',
    basePrice: 10000,
    discountPrice: null,
    condition: ProductCondition.NEUF,
    isPublished: true,
    stockQuantity: 50,
    reservedQuantity: 0,
  };
  const existingProduct = await prisma.product.findFirst({
    where: { shopId: shop.id, slug: 'article-test-api' },
    select: { id: true },
  });
  const product = existingProduct
    ? await prisma.product.update({ where: { id: existingProduct.id }, data: productData })
    : await prisma.product.create({
        data: { ...productData, shopId: shop.id, slug: 'article-test-api' },
      });

  console.log(JSON.stringify({
    admin: admin.email,
    vendor: vendor.email,
    client: client.email,
    password: testPassword,
    shopSlug: shop.slug,
    productId: product.id,
  }));
}

main()
  .catch((e) => {
    console.error('Erreur lors du seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

