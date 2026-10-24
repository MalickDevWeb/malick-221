import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsIn, IsNumber, IsOptional, IsString, IsUUID, MaxLength, Min } from 'class-validator';

export class CreateVendorWithdrawalDto {
  @ApiProperty({ example: '4bfe654e-9022-4d4b-bfd4-a100ab026ea7', format: 'uuid' })
  @IsUUID('4')
  shopId!: string;

  @ApiProperty({ example: 5000, minimum: 1, description: 'Montant demandé en FCFA.' })
  @IsNumber()
  @Min(1)
  amount!: number;

  @ApiProperty({ enum: ['WAVE', 'ORANGE_MONEY', 'FREE_MONEY'], example: 'WAVE' })
  @IsIn(['WAVE', 'ORANGE_MONEY', 'FREE_MONEY'])
  paymentMethod!: string;

  @ApiPropertyOptional({ example: 'Retrait de la semaine', maxLength: 500 })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  notes?: string;
}