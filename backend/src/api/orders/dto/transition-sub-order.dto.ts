import { IsIn, IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { VendorSubOrderStatus } from '../../../core/orders/order.types';

export class TransitionSubOrderDto {
  @ApiProperty({ enum: ['ACCEPTED', 'PREPARING', 'SHIPPED', 'REJECTED'], example: 'ACCEPTED' })
  @IsIn(['ACCEPTED', 'PREPARING', 'SHIPPED', 'REJECTED'])
  status: VendorSubOrderStatus;

  @ApiPropertyOptional({ example: 'Article indisponible', maxLength: 500 })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  reason?: string;
}