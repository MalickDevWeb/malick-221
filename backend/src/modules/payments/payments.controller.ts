import { Body, Controller, Headers, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PaymentService } from './payments.service';

@ApiTags('Paiements')
@Controller('payments')
export class PaymentsController {
  constructor(private readonly payments: PaymentService) {}

  @Post('webhooks/:provider')
  @ApiOperation({ summary: 'Recevoir un webhook de confirmation de paiement d’un provider' })
  async handleWebhook(
    @Param('provider') provider: string,
    @Headers('x-webhook-signature') signature: string | undefined,
    @Headers('x-provider-event') event: string | undefined,
    @Body() payload: Record<string, unknown>,
  ) {
    return this.payments.handleProviderWebhook(provider, payload, signature, event);
  }
}
