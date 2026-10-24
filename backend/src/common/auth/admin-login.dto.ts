import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class AdminLoginDto {
  @ApiProperty({
    example: 'qa.admin@malickbuss.sn',
    minLength: 3,
    maxLength: 254,
    description: 'E-mail ou numéro de téléphone du compte Super Admin.',
  })
  @IsString()
  @MinLength(3)
  @MaxLength(254)
  identity!: string;

  @ApiProperty({ example: 'AdminTest2026!', minLength: 1, maxLength: 128, writeOnly: true })
  @IsString()
  @MinLength(1)
  @MaxLength(128)
  password!: string;
}