import { ShopStatus } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';

export class UpdateShopStatusDto {
  @ApiProperty({ enum: ShopStatus, example: ShopStatus.ACTIVE })
  @IsEnum(ShopStatus)
  status!: ShopStatus;
}
