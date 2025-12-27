import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsString, IsNotEmpty, Length, IsEmail } from "class-validator";

export class UpdateUserDto {
  @ApiProperty({ description: "名称", example: "张三" })
  @IsString()
  @IsNotEmpty()
  @Length(2, 20)
  name: string;

  @ApiProperty({ description: "用户名", example: "zhangsan" })
  @IsString()
  @IsNotEmpty()
  @Length(2, 20)
  username: string;

  @ApiProperty({ description: "邮箱", example: "zhangsan@example.com" })
  @IsString()
  @IsEmail()
  @Length(2, 60)
  email: string;

  @ApiProperty({ description: "手机号", example: "13800000000" })
  @IsNotEmpty()
  @Length(11, 11)
  phone: string;

  @ApiProperty({ description: "密码", example: "admin123" })
  @IsString()
  @IsNotEmpty()
  @Length(6, 32)
  password: string;
}
