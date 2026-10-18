import { IsOptional, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class ShippingAddressDto {
  @IsString()
  @MinLength(2)
  @MaxLength(120)
  recipientName: string;

  @IsString()
  @Matches(/^\+221[ .-]?(7[05678])[ .-]?\d{3}[ .-]?\d{2}[ .-]?\d{2}$/)
  phoneNumber: string;

  @IsString()
  @MinLength(2)
  @MaxLength(100)
  region: string;

  @IsString()
  @MinLength(2)
  @MaxLength(100)
  city: string;

  @IsString()
  @MinLength(4)
  @MaxLength(240)
  addressLine: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  instructions?: string;
}