import {
  Max,
  Min,
  IsInt,
  IsDate,
  IsArray,
  IsString,
  IsBoolean,
  IsOptional,
} from "class-validator";
import { Transform, Type } from "class-transformer";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { BadRequestException, applyDecorators } from "@nestjs/common";

export function GetOptionString() {
  return applyDecorators(
    ApiPropertyOptional(),
    IsString(),
    IsOptional(),
    Type(() => String),
  );
}

export function GetOptionNumber() {
  return applyDecorators(
    Type(() => Number),
    IsOptional(),
    ApiPropertyOptional(),
  );
}

export function GetOptionInt() {
  return applyDecorators(
    Type(() => Number),
    IsOptional(),
    IsInt(),
    ApiPropertyOptional(),
  );
}

export function GetOptionIntRange(min: number, max: number) {
  return applyDecorators(
    Type(() => Number),
    IsOptional(),
    IsInt(),
    Min(min),
    Max(max),
    ApiPropertyOptional(),
  );
}

export function GetOptionNumberArray() {
  return applyDecorators(
    ApiPropertyOptional({
      type: [Number],
      format: "form",
    }),
    IsOptional(),
    IsArray(),
    Type(() => String),
    Transform(({ value }) =>
      value
        .split(",")
        .filter((e: string) => e != "")
        .map((e: string) => +e),
    ),
  );
}

export function GetOptionStringArray() {
  return applyDecorators(
    ApiPropertyOptional({
      type: [String],
      format: "form",
    }),
    IsOptional(),
    IsArray(),
    Type(() => String),
    Transform(({ value }) => value.split(",").filter((e: string) => e != "")),
  );
}

export function GetOptionDate() {
  return applyDecorators(
    ApiPropertyOptional(),
    Transform(({ value }) => new Date(value)),
    IsDate(),
    IsOptional(),
  );
}

export function GetOptionBoolean() {
  return applyDecorators(
    ApiPropertyOptional(),
    Transform(({ value }) => {
      if (typeof value === "string")
        if (value === "true" || value === "1") {
          return true;
        }

      if (value === "false" || value === "0") {
        return false;
      }

      throw new BadRequestException("Invalid boolean value");
    }),
    IsBoolean(),
    IsOptional(),
  );
}
