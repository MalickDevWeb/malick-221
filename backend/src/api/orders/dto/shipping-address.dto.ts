import { IsOptional, IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ShippingAddressDto {
  @ApiProperty({ example: 'Fatou Sow', minLength: 2, maxLength: 120 })
  @IsString()
  @MinLength(2)
  @MaxLength(120)
  recipientName: string;

  @ApiProperty({ example: '+221773456789', description: 'Numéro mobile sénégalais.' })
  @IsString({ message: 'Le numéro de téléphone est obligatoire.' })
  @Matches(/^(\+221|00221|221)?[ .-]?(7[05678])[ .-]?\d{3}[ .-]?\d{2}[ .-]?\d{2}$/, {
    message: 'Le numéro de livraison doit être un numéro sénégalais valide (ex: 77 123 45 67 ou +221 77 123 45 67).',
  })
  phoneNumber: string;

  @ApiProperty({ example: 'Dakar', minLength: 2, maxLength: 100 })
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  region: string;

  @ApiProperty({ example: 'Dakar', minLength: 2, maxLength: 100 })
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  city: string;

  @ApiProperty({ example: 'Rue 10, Médina', minLength: 4, maxLength: 240 })
  @IsString()
  @MinLength(4)
  @MaxLength(240)
  addressLine: string;

  @ApiPropertyOptional({ example: 'Appeler à l’arrivée', maxLength: 500 })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  instructions?: string;
}