import { ShopStatus } from '@prisma/client';
import { IsEnum } from 'class-validator';

export class UpdateShopStatusDto {
  @IsEnum(ShopStatus)
  status!: ShopStatus;
}
