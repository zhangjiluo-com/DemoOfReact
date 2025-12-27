import { ApiProperty } from "@nestjs/swagger";

import {
  IS_ENUM,
  IsIn,
  IsInt,
  IsNumber,
  IsString,
  Length,
  Min,
} from "class-validator";

import { IsNotEmpty } from "class-validator";

export class CreateRoleDto {
  @ApiProperty({ description: "角色名称" })
  @IsString()
  @IsNotEmpty()
  @Length(2, 20)
  name: string;

  @ApiProperty({ description: "角色描述" })
  @IsString()
  @IsNotEmpty()
  @Length(2, 40)
  description: string;

  @ApiProperty({ description: "角色状态" })
  @IsInt()
  @Min(0)
  @IsIn([0, 1])
  @IsNotEmpty()
  status: number;
}
