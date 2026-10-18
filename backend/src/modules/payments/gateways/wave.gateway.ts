import { Injectable } from '@nestjs/common';
import { PayoutProviderGateway, PayoutProviderResult, PayoutRequest } from '../payment-provider.interface';

@Injectable()
export class WaveGateway implements PayoutProviderGateway {
  readonly provider = 'WAVE' as const;

  async initiatePayout(request: PayoutRequest): Promise<PayoutProviderResult> {
    return {
      success: true,
      status: 'PENDING',
      externalReference: `WAVE-${request.reference ?? Date.now()}`,
      message: 'Paiement initié via Wave. Le rapprochement est en attente de confirmation.',
    };
  }

  async getStatus(reference: string): Promise<PayoutProviderResult> {
    return {
      success: true,
      status: 'PENDING',
      externalReference: reference,
      message: 'Le statut est encore en cours de synchronisation.',
    };
  }
}
