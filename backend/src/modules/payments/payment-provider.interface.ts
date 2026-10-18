export type PayoutProviderName = 'WAVE' | 'ORANGE_MONEY' | 'FREE_MONEY';

export interface PayoutRequest {
  provider: PayoutProviderName;
  amount: number;
  recipientIdentifier: string;
  reference?: string;
  notes?: string;
}

export interface PayoutProviderResult {
  success: boolean;
  status: 'PENDING' | 'SENT' | 'CONFIRMED' | 'FAILED';
  externalReference?: string;
  message?: string;
}

export interface PayoutProviderGateway {
  readonly provider: PayoutProviderName;
  initiatePayout(request: PayoutRequest): Promise<PayoutProviderResult>;
  getStatus(reference: string): Promise<PayoutProviderResult>;
}
