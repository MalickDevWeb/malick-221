import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class PaymentWebhookResponseDto {
  @ApiProperty({ example: true })
  success!: boolean;

  @ApiProperty({ enum: ['CONFIRMED', 'PENDING', 'FAILED'], example: 'CONFIRMED' })
  status!: 'CONFIRMED' | 'PENDING' | 'FAILED';

  @ApiPropertyOptional({ example: 'WAVE-9dd13f' })
  externalReference?: string;

  @ApiPropertyOptional({ example: 'Paiement confirmé et retrait clôturé.' })
  message?: string;
}