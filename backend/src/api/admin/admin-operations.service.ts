import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { AdminCaseStatus, AdminCaseType, Prisma, UserRole } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../database/prisma.service';
import { UpdateAdminCaseDto, UpdatePlatformSettingsDto } from './admin-operations.dto';

const DEFAULT_SETTINGS = {
  commissionRatePercent: 'DEFAULT_COMMISSION_PERCENTAGE',
  shippingFeePerShop: 'DEFAULT_SHIPPING_FEE_PER_SHOP',
  minimumWithdrawalAmount: null,
  returnPolicyDays: null,
  returnPolicyDescription: null,
} as const;

@Injectable()
export class AdminOperationsService {
  constructor(private readonly prisma: PrismaService, private readonly config: ConfigService) {}

  listVendors() {
    return this.prisma.user.findMany({
      where: { role: UserRole.VENDOR },
      select: {
        id: true, fullName: true, email: true, phoneNumber: true, isActive: true, createdAt: true,
        shops: { select: { id: true, name: true, status: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  listProducts() {
    return this.prisma.product.findMany({
      include: { shop: { select: { id: true, name: true, status: true, owner: { select: { fullName: true } } } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  async updateVendorStatus(id: string, isActive: boolean, reason: string, actorId: string) {
    const vendor = await this.prisma.user.findFirst({ where: { id, role: UserRole.VENDOR } });
    if (!vendor) throw new NotFoundException('Vendeur introuvable.');
    return this.prisma.$transaction(async (tx) => {
      const updated = await tx.user.update({ where: { id }, data: { isActive } });
      await tx.adminAuditLog.create({
        data: { actorId, action: isActive ? 'VENDOR_REACTIVATED' : 'VENDOR_SUSPENDED', entityType: 'USER', entityId: id, reason },
      });
      return updated;
    });
  }

  async updateProductVisibility(id: string, isPublished: boolean, reason: string, actorId: string) {
    const product = await this.prisma.product.findUnique({ where: { id }, select: { id: true } });
    if (!product) throw new NotFoundException('Produit introuvable.');
    return this.prisma.$transaction(async (tx) => {
      const updated = await tx.product.update({
        where: { id },
        data: { isPublished },
        include: {
          shop: {
            select: { id: true, name: true, status: true, owner: { select: { fullName: true } } },
          },
        },
      });
      await tx.adminAuditLog.create({
        data: { actorId, action: isPublished ? 'PRODUCT_PUBLISHED' : 'PRODUCT_UNPUBLISHED', entityType: 'PRODUCT', entityId: id, reason },
      });
      return updated;
    });
  }

  listOrders() {
    return this.prisma.order.findMany({
      take: 200,
      orderBy: { createdAt: 'desc' },
      include: {
        client: { select: { id: true, fullName: true, email: true, phoneNumber: true } },
        subOrders: { include: { shop: { select: { id: true, name: true } } } },
      },
    });
  }

  listCommissions() {
    return this.prisma.commissionLedger.findMany({
      take: 200,
      orderBy: { createdAt: 'desc' },
      include: { subOrder: { include: { order: { select: { orderNumber: true } }, shop: { select: { id: true, name: true } } } } },
    });
  }

  listCases() {
    return this.prisma.adminCase.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        order: { select: { id: true, orderNumber: true, grandTotal: true, paymentStatus: true, status: true } },
        requester: { select: { id: true, fullName: true, email: true, phoneNumber: true } },
      },
    });
  }

  async updateCase(id: string, input: UpdateAdminCaseDto, actorId: string) {
    const existing = await this.prisma.adminCase.findUnique({ where: { id }, include: { order: true } });
    if (!existing) throw new NotFoundException('Dossier introuvable.');
    if (['APPROVED', 'REJECTED', 'RESOLVED'].includes(existing.status)) {
      throw new BadRequestException('Ce dossier est déjà clôturé.');
    }
    if (input.status === AdminCaseStatus.APPROVED && existing.type === AdminCaseType.REFUND) {
      const amount = input.decidedAmount ?? Number(existing.requestedAmount ?? existing.order.grandTotal);
      if (amount <= 0 || amount > Number(existing.order.grandTotal)) {
        throw new BadRequestException('Le montant approuvé doit être positif et ne pas dépasser la commande.');
      }
    }
    const decidedAmount = input.status === AdminCaseStatus.APPROVED && existing.type === AdminCaseType.REFUND
      ? input.decidedAmount ?? Number(existing.requestedAmount ?? existing.order.grandTotal)
      : null;
    return this.prisma.$transaction(async (tx) => {
      const updated = await tx.adminCase.update({
        where: { id },
        data: { status: input.status, decisionReason: input.decisionReason, decidedAmount, decidedById: actorId },
      });
      await tx.adminAuditLog.create({
        data: {
          actorId, action: `CASE_${input.status}`, entityType: 'ADMIN_CASE', entityId: id,
          reason: input.decisionReason,
          metadata: { type: existing.type, decidedAmount } as Prisma.InputJsonValue,
        },
      });
      return updated;
    });
  }

  async getSettings() {
    const rows = await this.prisma.platformSetting.findMany();
    const settings: Record<string, unknown> = {
      commissionRatePercent: Number(this.config.get('DEFAULT_COMMISSION_PERCENTAGE', 10)),
      shippingFeePerShop: Number(this.config.get('DEFAULT_SHIPPING_FEE_PER_SHOP', 3000)),
      minimumWithdrawalAmount: 1,
      returnPolicyDays: 7,
      returnPolicyDescription: '',
    };
    for (const row of rows) settings[row.key] = row.value;
    return settings;
  }

  async updateSettings(input: UpdatePlatformSettingsDto, actorId: string) {
    const entries = Object.entries(input).filter(([, value]) => value !== undefined);
    if (!entries.length) throw new BadRequestException('Aucun paramètre à modifier.');
    await this.prisma.$transaction(async (tx) => {
      for (const [key, value] of entries) {
        if (!(key in DEFAULT_SETTINGS)) throw new BadRequestException(`Paramètre non autorisé: ${key}`);
        await tx.platformSetting.upsert({
          where: { key },
          create: { key, value: value as Prisma.InputJsonValue, updatedById: actorId },
          update: { value: value as Prisma.InputJsonValue, updatedById: actorId },
        });
        await tx.adminAuditLog.create({
          data: { actorId, action: 'PLATFORM_SETTING_UPDATED', entityType: 'PLATFORM_SETTING', entityId: key, metadata: { value } as Prisma.InputJsonValue },
        });
      }
    });
    return this.getSettings();
  }

  getAuditLog() {
    return this.prisma.adminAuditLog.findMany({
      take: 200,
      orderBy: { createdAt: 'desc' },
      include: { actor: { select: { id: true, fullName: true, email: true } } },
    });
  }
}