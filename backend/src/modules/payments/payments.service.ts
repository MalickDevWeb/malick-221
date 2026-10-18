import { Injectable } from '@nestjs/common';
import { createHash } from 'crypto';
import { PrismaService } from '../../database/prisma.service';
import { WaveGateway } from './gateways/wave.gateway';
import { OrangeMoneyGateway } from './gateways/orange-money.gateway';
import { FreeMoneyGateway } from './gateways/free-money.gateway';
import { PayoutProviderGateway, PayoutProviderResult, PayoutRequest } from './payment-provider.interface';

@Injectable()
export class PaymentService {
  private readonly gateways = new Map<string, PayoutProviderGateway>([
    ['WAVE', this.waveGateway],
    ['ORANGE_MONEY', this.orangeMoneyGateway],
    ['FREE_MONEY', this.freeMoneyGateway],
  ]);

  constructor(
    private readonly prisma: PrismaService,
    private readonly waveGateway: WaveGateway,
    private readonly orangeMoneyGateway: OrangeMoneyGateway,
    private readonly freeMoneyGateway: FreeMoneyGateway,
  ) {}

  async initiatePayout(request: PayoutRequest): Promise<PayoutProviderResult> {
    const gateway = this.gateways.get(request.provider);
    if (!gateway) {
      return {
        success: false,
        status: 'FAILED',
        message: `Fournisseur de paiement non supporté: ${request.provider}`,
      };
    }

    return gateway.initiatePayout(request);
  }

  async getPayoutStatus(provider: string, reference: string): Promise<PayoutProviderResult> {
    const gateway = this.gateways.get(provider);
    if (!gateway) {
      return {
        success: false,
        status: 'FAILED',
        message: `Fournisseur de paiement non supporté: ${provider}`,
      };
    }

    return gateway.getStatus(reference);
  }

  async handleProviderWebhook(
    provider: string,
    payload: Record<string, unknown>,
    signature?: string,
    event?: string,
  ) {
    const expectedSecret = process.env[`${provider.toUpperCase()}_WEBHOOK_SECRET`];
    if (expectedSecret && signature) {
      const hash = createHash('sha256').update(JSON.stringify(payload)).update(expectedSecret).digest('hex');
      if (hash !== signature) {
        return { success: false, status: 'FAILED', message: 'Signature webhook invalide.' };
      }
    }

    const reference = String(payload.reference ?? payload.id ?? payload.transactionId ?? '');
    if (!reference) {
      return { success: false, status: 'FAILED', message: 'Référence fournisseur absente.' };
    }

    const withdrawal = await this.prisma.withdrawalRequest.findFirst({
      where: { providerReference: reference },
      include: { vendor: { select: { id: true, fullName: true, email: true } } },
    });

    if (!withdrawal) {
      return { success: false, status: 'FAILED', message: 'Retrait non trouvé pour cette référence fournisseur.' };
    }

    const providerStatus = String(payload.status ?? event ?? 'CONFIRMED');
    const confirmed = ['CONFIRMED', 'SUCCESS', 'PAID', 'SENT'].includes(providerStatus.toUpperCase());

    if (!confirmed) {
      return {
        success: true,
        status: 'PENDING',
        message: 'Webhook reçu mais le paiement n’est pas encore confirmé.',
      };
    }

    await this.prisma.$transaction(async (tx) => {
      await tx.withdrawalRequest.update({
        where: { id: withdrawal.id },
        data: {
          status: 'PAID',
          providerStatus,
          paidAt: new Date(),
        },
      });

      await tx.withdrawalAuditLog.create({
        data: {
          withdrawalRequestId: withdrawal.id,
          actorId: withdrawal.vendorId,
          action: 'WEBHOOK_PAID',
          statusFrom: withdrawal.status,
          statusTo: 'PAID',
          reason: `Confirmation fournisseur ${provider.toUpperCase()} via webhook.`,
          metadata: {
            provider,
            event,
            payload: JSON.parse(JSON.stringify(payload)),
            providerStatus,
            receivedAt: new Date().toISOString(),
          },
        },
      });
    });

    return {
      success: true,
      status: 'CONFIRMED',
      externalReference: reference,
      message: 'Paiement confirmé et retrait clôturé.',
    };
  }
}
