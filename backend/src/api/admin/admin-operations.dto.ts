import { AdminCaseStatus } from '@prisma/client';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsEnum, IsNumber, IsOptional, IsString, Length, Max, Min } from 'class-validator';

export class UpdateModerationDto {
  @ApiProperty()
  @IsBoolean()
  isActive!: boolean;

  @ApiProperty({ example: 'Documents de vérification incomplets', minLength: 3, maxLength: 500 })
  @IsString()
  @Length(3, 500)
  reason!: string;
}

export class UpdateProductVisibilityDto {
  @ApiProperty()
  @IsBoolean()
  isPublished!: boolean;

  @ApiProperty({ example: 'Produit non conforme à la politique catalogue', minLength: 3, maxLength: 500 })
  @IsString()
  @Length(3, 500)
  reason!: string;
}

export class UpdateAdminCaseDto {
  @ApiProperty({ enum: AdminCaseStatus })
  @IsEnum(AdminCaseStatus)
  status!: AdminCaseStatus;

  @ApiProperty({ example: 'Remboursement partiel validé après examen des preuves', minLength: 3, maxLength: 1000 })
  @IsString()
  @Length(3, 1000)
  decisionReason!: string;

  @ApiPropertyOptional({ minimum: 0, example: 15000 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  decidedAmount?: number;
}

export class UpdatePlatformSettingsDto {
  @ApiPropertyOptional({ minimum: 0, maximum: 100, example: 10 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @Max(100)
  commissionRatePercent?: number;

  @ApiPropertyOptional({ minimum: 0, example: 3000 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  shippingFeePerShop?: number;

  @ApiPropertyOptional({ minimum: 1, example: 5000 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(1)
  minimumWithdrawalAmount?: number;

  @ApiPropertyOptional({ minimum: 0, maximum: 365, example: 7 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @Max(365)
  returnPolicyDays?: number;

  @ApiPropertyOptional({ maxLength: 2000 })
  @IsOptional()
  @IsString()
  @Length(0, 2000)
  returnPolicyDescription?: string;
}

export class CreateAdminCaseDto {
  @ApiProperty({ enum: ['DISPUTE', 'REFUND'] })
  @IsEnum(['DISPUTE', 'REFUND'])
  type!: 'DISPUTE' | 'REFUND';

  @ApiProperty({ example: 'Produit reçu endommagé', minLength: 5, maxLength: 1000 })
  @IsString()
  @Length(5, 1000)
  reason!: string;

  @ApiPropertyOptional({ minimum: 0, example: 15000 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  requestedAmount?: number;
}