import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';

export class AuthUserResponseDto {
  @ApiProperty({ example: '6d48045e-918c-42a5-b819-e74131747b6c' })
  id!: string;

  @ApiProperty({ example: 'Fatou Sow' })
  fullName!: string;

  @ApiProperty({ example: 'fatou.sow@example.com', nullable: true })
  email!: string | null;

  @ApiProperty({ example: '+221773456789' })
  phoneNumber!: string;

  @ApiProperty({ enum: UserRole, example: UserRole.CLIENT })
  role!: UserRole;
}

export class AuthResponseDto {
  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
  accessToken!: string;

  @ApiProperty({ type: AuthUserResponseDto })
  user!: AuthUserResponseDto;
}

export class CurrentUserResponseDto {
  @ApiProperty({ example: '6d48045e-918c-42a5-b819-e74131747b6c' })
  id!: string;

  @ApiProperty({ enum: UserRole, example: UserRole.CLIENT })
  role!: UserRole;
}

export class AdminAuthUserResponseDto {
  @ApiProperty({ example: '6d48045e-918c-42a5-b819-e74131747b6c' })
  id!: string;

  @ApiProperty({ example: 'Super Admin Malick Buss' })
  fullName!: string;

  @ApiProperty({ example: 'admin@malickbuss.sn', nullable: true })
  email!: string | null;

  @ApiProperty({ example: '+221770000001' })
  phoneNumber!: string;
}

export class AdminAuthResponseDto {
  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
  accessToken!: string;

  @ApiProperty({ type: AdminAuthUserResponseDto })
  user!: AdminAuthUserResponseDto;
}