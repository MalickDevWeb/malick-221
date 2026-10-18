import { WithdrawalStatus } from '@prisma/client';
import { IsEnum, IsOptional, Length } from 'class-validator';

export class UpdateWithdrawalStatusDto {
  @IsEnum(WithdrawalStatus)
  status!: WithdrawalStatus;

  @IsOptional()
  @Length(3, 500)
  reason?: string;
}
