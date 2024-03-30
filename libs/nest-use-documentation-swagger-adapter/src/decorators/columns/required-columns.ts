import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
  Matches,
  IsObject,
  ValidateNested,
} from 'class-validator';

export function RequiredArray(type: Function) {
  return applyDecorators(
    ApiProperty({ type: [type] }),
    IsArray(),
    ValidateNested({ each: true }),
    Type(() => type)
  );
}

export function RequiredSimpleArray(type: Function) {
  return applyDecorators(ApiProperty({ type: [type] }), IsArray());
}

export function RequiredObject(type: Function) {
  return applyDecorators(ApiProperty({ type: type }), IsObject());
}

export function RequiredString() {
  return applyDecorators(ApiProperty(), IsString(), MinLength(1));
}

export function RequiredNumber() {
  return applyDecorators(ApiProperty(), IsNumber());
}

export function RequiredBoolean() {
  return applyDecorators(ApiProperty(), IsBoolean());
}

export function RequiredPassword() {
  return applyDecorators(
    ApiProperty(),
    IsString(),
    MinLength(6),
    MaxLength(20),
    Matches(/[A-Z]/, {
      message: 'At least one lower case English letter',
    }),
    Matches(/[a-z]/, {
      message: 'At least one lower case English letter',
    }),
    Matches(/[0-9]/, {
      message: 'At least one digit',
    }),
    Matches(/[\W]/, {
      message: 'At least one special character',
    })
  );
}
