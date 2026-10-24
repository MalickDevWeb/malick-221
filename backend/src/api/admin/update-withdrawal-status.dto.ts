import { WithdrawalStatus } from '@prisma/client';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, Length } from 'class-validator';

export class UpdateWithdrawalStatusDto {
  @ApiProperty({ enum: WithdrawalStatus, example: WithdrawalStatus.APPROVED })
  @IsEnum(WithdrawalStatus)
  status!: WithdrawalStatus;

  @ApiPropertyOptional({ example: 'Dossier vérifié', minLength: 3, maxLength: 500 })
  @IsOptional()
  @Length(3, 500)
  reason?: string;
}
