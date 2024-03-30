import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';
import { RequiredNumber } from '../decorators/columns';

export class UpdateOrderDto {
  @RequiredNumber()
  id!: number;

  @RequiredNumber()
  order!: number;
}

export class UpdateOrdersDto {
  @ApiProperty({
    type: UpdateOrderDto,
    isArray: true,
  })
  @IsArray()
  orders!: UpdateOrderDto[];
}
