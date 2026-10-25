import { ProductCondition } from '@prisma/client';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsArray,
  IsString,
  IsUrl,
  IsUUID,
  Length,
  ArrayMaxSize,
  Max,
  Min,
} from 'class-validator';

export class CreateVendorProductDto {
  @ApiProperty({ format: 'uuid' })
  @IsUUID()
  shopId!: string;

  @ApiProperty({ minLength: 3, maxLength: 160 })
  @IsString()
  @Length(3, 160)
  title!: string;

  @ApiProperty({ minLength: 1, maxLength: 80 })
  @IsString()
  @Length(1, 80)
  category!: string;

  @ApiPropertyOptional({ description: 'URL ou data URI de l’image' })
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @ApiPropertyOptional({ type: [String], maxItems: 4 })
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(4)
  @IsString({ each: true })
  additionalImageUrls?: string[];

  @ApiPropertyOptional({ maxLength: 2000 })
  @IsOptional()
  @IsString()
  @Length(0, 2000)
  description?: string;

  @ApiProperty({ minimum: 1, example: 12500 })
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(1)
  @Max(999999999)
  basePrice!: number;

  @ApiPropertyOptional({ minimum: 1, example: 10000 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(1)
  @Max(999999999)
  discountPrice?: number;

  @ApiPropertyOptional({ enum: ProductCondition })
  @IsOptional()
  @IsEnum(ProductCondition)
  condition?: ProductCondition;

  @ApiProperty({ minimum: 0, maximum: 1000000 })
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @Max(1000000)
  stockQuantity!: number;
}