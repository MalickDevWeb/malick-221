import { Injectable } from '@nestjs/common';
import { PayoutProviderGateway, PayoutProviderResult, PayoutRequest } from '../payment-provider.interface';

@Injectable()
export class FreeMoneyGateway implements PayoutProviderGateway {
  readonly provider = 'FREE_MONEY' as const;

  async initiatePayout(request: PayoutRequest): Promise<PayoutProviderResult> {
    return {
      success: true,
      status: 'PENDING',
      externalReference: `FM-${request.reference ?? Date.now()}`,
      message: 'Paiement initié via Free Money. Rapprochement manuel requis.',
    };
  }

  async getStatus(reference: string): Promise<PayoutProviderResult> {
    return {
      success: true,
      status: 'PENDING',
      externalReference: reference,
      message: 'Statut Free Money toujours non validé.',
    };
  }
}
