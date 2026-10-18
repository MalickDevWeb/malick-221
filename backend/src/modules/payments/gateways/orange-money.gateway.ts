import { Injectable } from '@nestjs/common';
import { PayoutProviderGateway, PayoutProviderResult, PayoutRequest } from '../payment-provider.interface';

@Injectable()
export class OrangeMoneyGateway implements PayoutProviderGateway {
  readonly provider = 'ORANGE_MONEY' as const;

  async initiatePayout(request: PayoutRequest): Promise<PayoutProviderResult> {
    return {
      success: true,
      status: 'PENDING',
      externalReference: `OM-${request.reference ?? Date.now()}`,
      message: 'Paiement initié via Orange Money. Validation externe en cours.',
    };
  }

  async getStatus(reference: string): Promise<PayoutProviderResult> {
    return {
      success: true,
      status: 'PENDING',
      externalReference: reference,
      message: 'Orange Money ne retourne pas encore de confirmation finale.',
    };
  }
}
