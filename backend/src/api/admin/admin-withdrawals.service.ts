import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { WithdrawalStatus } from '@prisma/client';
import { PrismaService } from '../../database/prisma.service';
import { PaymentService } from '../../modules/payments/payments.service';

@Injectable()
export class AdminWithdrawalService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly payments: PaymentService,
  ) {}

  async listWithdrawals() {
    return this.prisma.withdrawalRequest.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        shop: { select: { id: true, name: true } },
        vendor: {
          select: { id: true, fullName: true, email: true, phoneNumber: true },
        },
        auditLogs: {
          orderBy: { createdAt: 'asc' },
          select: {
            id: true,
            action: true,
            statusFrom: true,
            statusTo: true,
            reason: true,
            metadata: true,
            createdAt: true,
          },
        },
      },
    });
  }

  async getWithdrawalAudit(id: string) {
    const request = await this.prisma.withdrawalRequest.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!request) {
      throw new NotFoundException('Demande de retrait introuvable.');
    }

    return this.prisma.withdrawalAuditLog.findMany({
      where: { withdrawalRequestId: id },
      orderBy: { createdAt: 'asc' },
      include: {
        actor: { select: { id: true, fullName: true, email: true, phoneNumber: true } },
      },
    });
  }

  async executeWithdrawalPayout(id: string, actorId?: string) {
    const request = await this.prisma.withdrawalRequest.findUnique({
      where: { id },
      include: {
        shop: {
          select: {
            id: true,
            name: true,
            wavePayoutNumber: true,
            omPayoutNumber: true,
          },
        },
        vendor: { select: { id: true, fullName: true, email: true, phoneNumber: true } },
      },
    });

    if (!request) {
      throw new NotFoundException('Demande de retrait introuvable.');
    }

    if (request.status === 'PAID' || request.status === 'REJECTED' || request.status === 'CANCELLED') {
      throw new BadRequestException('Cette demande de retrait ne peut plus être décaisser.');
    }

    const provider = request.paymentMethod as 'WAVE' | 'ORANGE_MONEY' | 'FREE_MONEY';
    const recipientIdentifier =
      provider === 'WAVE'
        ? request.shop.wavePayoutNumber
        : provider === 'ORANGE_MONEY'
          ? request.shop.omPayoutNumber
          : request.shop.wavePayoutNumber ?? request.vendor.phoneNumber;

    if (!recipientIdentifier) {
      throw new BadRequestException('Aucun numéro de paiement n’est configuré pour cette boutique.');
    }

    const paymentResult = await this.payments.initiatePayout({
      provider,
      amount: Number(request.amount),
      recipientIdentifier,
      reference: request.id,
      notes: request.notes ?? undefined,
    });

    if (!paymentResult.success) {
      throw new BadRequestException(paymentResult.message ?? 'Le décaissement n’a pas pu être initié.');
    }

    return this.prisma.$transaction(async (tx) => {
      const updated = await tx.withdrawalRequest.update({
        where: { id },
        data: {
          status: 'PROCESSING',
          providerReference: paymentResult.externalReference ?? request.providerReference ?? request.id,
          providerStatus: paymentResult.status,
          notes: request.notes ?? null,
        },
        include: {
          shop: { select: { id: true, name: true } },
          vendor: {
            select: { id: true, fullName: true, email: true, phoneNumber: true },
          },
          auditLogs: {
            orderBy: { createdAt: 'asc' },
            select: {
              id: true,
              action: true,
              statusFrom: true,
              statusTo: true,
              reason: true,
              metadata: true,
              createdAt: true,
            },
          },
        },
      });

      await tx.withdrawalAuditLog.create({
        data: {
          withdrawalRequestId: id,
          actorId: actorId ?? null,
          action: 'PAYOUT_INITIATED',
          statusFrom: request.status,
          statusTo: 'PROCESSING',
          reason: request.notes ?? 'Paiement initié vers le fournisseur externe.',
          metadata: {
            provider,
            externalReference: paymentResult.externalReference,
            payoutStatus: paymentResult.status,
            amount: Number(request.amount),
            recipientIdentifier,
            initiatedAt: new Date().toISOString(),
          },
        },
      });

      return {
        ...updated,
        providerStatus: paymentResult.status,
        externalReference: paymentResult.externalReference,
      };
    });
  }

  async confirmExternalPayout(id: string, actorId?: string) {
    const request = await this.prisma.withdrawalRequest.findUnique({
      where: { id },
      include: { shop: { select: { id: true, name: true } }, vendor: { select: { id: true, fullName: true, email: true, phoneNumber: true } } },
    });

    if (!request) {
      throw new NotFoundException('Demande de retrait introuvable.');
    }

    if (request.status === 'PAID' || request.status === 'REJECTED' || request.status === 'CANCELLED') {
      throw new BadRequestException('Cette demande ne peut plus être confirmée comme payée.');
    }

    const provider = request.paymentMethod as 'WAVE' | 'ORANGE_MONEY' | 'FREE_MONEY';
    const providerReference = request.providerReference ?? request.id;
    const payoutResult = await this.payments.getPayoutStatus(provider, providerReference);

    if (!payoutResult.success || !['SENT', 'CONFIRMED'].includes(payoutResult.status)) {
      return {
        ...request,
        providerStatus: payoutResult.status,
        externalReference: providerReference,
        confirmed: false,
      };
    }

    return this.prisma.$transaction(async (tx) => {
      const updated = await tx.withdrawalRequest.update({
        where: { id },
        data: {
          status: 'PAID',
          providerReference: providerReference,
          providerStatus: payoutResult.status,
          paidAt: new Date(),
        },
        include: {
          shop: { select: { id: true, name: true } },
          vendor: { select: { id: true, fullName: true, email: true, phoneNumber: true } },
          auditLogs: { orderBy: { createdAt: 'asc' }, select: { id: true, action: true, statusFrom: true, statusTo: true, reason: true, metadata: true, createdAt: true } },
        },
      });

      await tx.withdrawalAuditLog.create({
        data: {
          withdrawalRequestId: id,
          actorId: actorId ?? null,
          action: 'PAYOUT_CONFIRMED',
          statusFrom: request.status,
          statusTo: 'PAID',
          reason: 'Paiement externe confirmé par le fournisseur.',
          metadata: {
            provider,
            externalReference: providerReference,
            providerStatus: payoutResult.status,
            confirmedAt: new Date().toISOString(),
          },
        },
      });

      return {
        ...updated,
        providerStatus: payoutResult.status,
        confirmed: true,
      };
    });
  }

  async updateWithdrawalStatus(id: string, status: WithdrawalStatus, reason?: string, actorId?: string) {
    const request = await this.prisma.withdrawalRequest.findUnique({
      where: { id },
      include: {
        shop: { select: { id: true, name: true } },
        vendor: { select: { id: true, fullName: true, email: true, phoneNumber: true } },
      },
    });

    if (!request) {
      throw new NotFoundException('Demande de retrait introuvable.');
    }

    const current = request.status;
    const allowedTransitions: Record<WithdrawalStatus, WithdrawalStatus[]> = {
      PENDING: ['APPROVED', 'REJECTED', 'CANCELLED'],
      APPROVED: ['PROCESSING', 'REJECTED', 'CANCELLED'],
      PROCESSING: ['PAID', 'REJECTED', 'CANCELLED'],
      PAID: [],
      REJECTED: [],
      CANCELLED: [],
    };

    if (!allowedTransitions[current]?.includes(status)) {
      throw new BadRequestException(
        `Transition de statut invalide pour cette demande: ${current} -> ${status}.`,
      );
    }

    if ((status === WithdrawalStatus.REJECTED || status === WithdrawalStatus.CANCELLED) && !reason?.trim()) {
      throw new BadRequestException('Un motif est obligatoire pour rejeter ou annuler un retrait.');
    }

    const finalReason = reason?.trim() ?? request.notes ?? null;

    return this.prisma.$transaction(async (tx) => {
      const updated = await tx.withdrawalRequest.update({
        where: { id },
        data: {
          status,
          notes: finalReason,
        },
        include: {
          shop: { select: { id: true, name: true } },
          vendor: {
            select: { id: true, fullName: true, email: true, phoneNumber: true },
          },
          auditLogs: {
            orderBy: { createdAt: 'asc' },
            select: {
              id: true,
              action: true,
              statusFrom: true,
              statusTo: true,
              reason: true,
              metadata: true,
              createdAt: true,
            },
          },
        },
      });

      await tx.withdrawalAuditLog.create({
        data: {
          withdrawalRequestId: id,
          actorId: actorId ?? null,
          action: 'STATUS_UPDATE',
          statusFrom: current,
          statusTo: status,
          reason: finalReason,
          metadata: {
            previousStatus: current,
            nextStatus: status,
            updatedAt: new Date().toISOString(),
          },
        },
      });

      return updated;
    });
  }
}
