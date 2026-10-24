import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'fatou.sow@example.com',
    minLength: 3,
    description: 'Adresse e-mail ou numéro de téléphone du compte.',
  })
  @IsString()
  @MinLength(3)
  identity!: string;

  @ApiProperty({ example: 'ClientTest2026!', minLength: 8, writeOnly: true })
  @IsString()
  @MinLength(8)
  password!: string;
}
