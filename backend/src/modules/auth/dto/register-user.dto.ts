import { UserRole } from '@prisma/client';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsIn, IsOptional, IsString, Matches, MinLength } from 'class-validator';

export class RegisterUserDto {
  @ApiProperty({ example: 'Fatou Sow', minLength: 2, description: 'Nom complet du titulaire du compte.' })
  @IsString({ message: 'Le nom complet est obligatoire.' })
  @MinLength(2, { message: 'Le nom complet doit comporter au moins 2 caractères.' })
  fullName!: string;

  @ApiProperty({ example: '+221773456789', description: 'Numéro de téléphone sénégalais ou international.' })
  @Matches(/^\+?[0-9\s-]{8,20}$/, {
    message: 'Le numéro de téléphone doit être valide (ex: 77 123 45 67 ou +221 77 123 45 67).',
  })
  phoneNumber!: string;

  @ApiPropertyOptional({ example: 'fatou.sow@example.com', format: 'email' })
  @IsOptional()
  @IsEmail({}, { message: 'Veuillez saisir une adresse e-mail valide.' })
  email?: string;

  @ApiProperty({ example: 'ClientTest2026!', minLength: 8, writeOnly: true })
  @IsString({ message: 'Le mot de passe est obligatoire.' })
  @MinLength(8, { message: 'Le mot de passe doit comporter au moins 8 caractères.' })
  password!: string;

  @ApiPropertyOptional({ enum: [UserRole.CLIENT, UserRole.VENDOR], example: UserRole.CLIENT })
  @IsOptional()
  @IsIn([UserRole.CLIENT, UserRole.VENDOR])
  role?: 'CLIENT' | 'VENDOR';
}
