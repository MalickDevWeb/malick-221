import { IsIn, IsOptional, IsString, MaxLength } from 'class-validator';
import { VendorSubOrderStatus } from '../../../core/orders/order.types';

export class TransitionSubOrderDto {
  @IsIn(['ACCEPTED', 'PREPARING', 'SHIPPED', 'REJECTED'])
  status: VendorSubOrderStatus;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  reason?: string;
}