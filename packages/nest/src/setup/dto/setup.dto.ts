import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class SetupDto {
  @ApiProperty({ description: '安装码' })
  @IsString()
  @IsNotEmpty()
  code: string
}
