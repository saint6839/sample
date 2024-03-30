import {
  IsArray,
  IsNumber,
  IsObject,
  IsString,
  IsBoolean,
  MinLength,
  IsOptional,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";
import { applyDecorators } from "@nestjs/common";
import { ApiPropertyOptional } from "@nestjs/swagger";

export function NotRequiredArray(type: Function) {
  return applyDecorators(
    ApiPropertyOptional({ type: [type] }),
    IsArray(),
    Type(() => type),
    ValidateNested({ each: true }),
    IsOptional(),
  );
}

export function NotRequiredSimpleArray(type: Function) {
  return applyDecorators(
    ApiPropertyOptional({ type: [type] }),
    IsArray(),
    IsOptional(),
  );
}

export function NotRequiredString() {
  return applyDecorators(
    ApiPropertyOptional(),
    IsString(),
    IsOptional(),
    MinLength(1),
  );
}

export function NotRequiredObject(type: Function) {
  return applyDecorators(
    ApiPropertyOptional({ type: type }),
    IsObject(),
    IsOptional(),
  );
}

export function NotRequiredNumber() {
  return applyDecorators(ApiPropertyOptional(), IsNumber(), IsOptional());
}

export function NotRequiredBoolean() {
  return applyDecorators(ApiPropertyOptional(), IsBoolean(), IsOptional());
}
