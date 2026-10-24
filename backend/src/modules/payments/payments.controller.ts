import { Body, Controller, Headers, Param, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiHeader,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { PaymentService } from './payments.service';
import { PaymentWebhookResponseDto } from './payment-webhook-response.dto';

@ApiTags('Paiements')
@Controller('payments')
export class PaymentsController {
  constructor(private readonly payments: PaymentService) {}

  @Post('webhooks/:provider')
  @ApiOperation({ summary: 'Recevoir un webhook de confirmation de paiement d’un provider' })
  @ApiParam({ name: 'provider', enum: ['wave', 'orange-money', 'free-money'], example: 'wave' })
  @ApiHeader({ name: 'x-webhook-signature', required: false, description: 'Signature de vérification configurée pour le provider.' })
  @ApiHeader({ name: 'x-provider-event', required: false, description: 'Type d’événement envoyé par le provider.' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        reference: { type: 'string', example: 'WAVE-9dd13f' },
        status: { type: 'string', example: 'CONFIRMED' },
        transactionId: { type: 'string', example: 'txn_12345' },
      },
      additionalProperties: true,
      example: { reference: 'WAVE-9dd13f', status: 'CONFIRMED' },
    },
  })
  @ApiCreatedResponse({
    description: 'Webhook traité. `success` et `status` indiquent si le paiement est confirmé, en attente ou refusé.',
    type: PaymentWebhookResponseDto,
  })
  async handleWebhook(
    @Param('provider') provider: string,
    @Headers('x-webhook-signature') signature: string | undefined,
    @Headers('x-provider-event') event: string | undefined,
    @Body() payload: Record<string, unknown>,
  ) {
    return this.payments.handleProviderWebhook(provider, payload, signature, event);
  }
}
