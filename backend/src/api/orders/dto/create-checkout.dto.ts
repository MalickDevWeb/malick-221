import { Type } from 'class-transformer';
import { ArrayMaxSize, ArrayMinSize, IsArray, IsIn, ValidateNested } from 'class-validator';
import { PaymentMethod } from '../../../core/orders/order.types';
import { CheckoutItemDto } from './checkout-item.dto';
import { ShippingAddressDto } from './shipping-address.dto';

export class CreateCheckoutDto {
  @IsIn(['WAVE', 'ORANGE_MONEY', 'FREE_MONEY', 'CASH_ON_DELIVERY'])
  paymentMethod: PaymentMethod;

  @ValidateNested()
  @Type(() => ShippingAddressDto)
  shippingAddress: ShippingAddressDto;

  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(100)
  @ValidateNested({ each: true })
  @Type(() => CheckoutItemDto)
  items: CheckoutItemDto[];
}