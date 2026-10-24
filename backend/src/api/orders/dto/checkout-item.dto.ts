import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsUUID, Max, Min } from 'class-validator';

export class CheckoutItemDto {
  @ApiProperty({ example: '067fa986-1943-4851-b140-1aaed90e9c75', format: 'uuid' })
  @IsUUID('4')
  productId: string;

  @ApiProperty({ example: 1, minimum: 1, maximum: 100 })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  quantity: number;
}