import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { ArrayMaxSize, ArrayMinSize, IsArray, IsIn, ValidateNested } from 'class-validator';
import { PaymentMethod } from '../../../core/orders/order.types';
import { CheckoutItemDto } from './checkout-item.dto';
import { ShippingAddressDto } from './shipping-address.dto';

export class CreateCheckoutDto {
  @ApiProperty({ enum: ['WAVE', 'ORANGE_MONEY', 'FREE_MONEY', 'CASH_ON_DELIVERY'], example: 'CASH_ON_DELIVERY' })
  @IsIn(['WAVE', 'ORANGE_MONEY', 'FREE_MONEY', 'CASH_ON_DELIVERY'])
  paymentMethod: PaymentMethod;

  @ApiProperty({ type: ShippingAddressDto })
  @ValidateNested()
  @Type(() => ShippingAddressDto)
  shippingAddress: ShippingAddressDto;

  @ApiProperty({ type: [CheckoutItemDto], minItems: 1, maxItems: 100 })
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(100)
  @ValidateNested({ each: true })
  @Type(() => CheckoutItemDto)
  items: CheckoutItemDto[];
}