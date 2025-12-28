import { ApiProperty, PartialType } from '@nestjs/swagger'
import { IsString, IsOptional, IsNumber, IsInt, Min, Max } from 'class-validator'
import { CursorPageQueryDto } from 'src/shared/dto/cursor-page-query.dto'
import { PageQueryBaseDto } from 'src/shared/dto/page-query.dto'

export class GetUserCursorPageDto extends CursorPageQueryDto {
  //   @ApiProperty({ description: 'ID', required: false })
  //   @IsNumber()
  //   @IsInt()
  //   @Min(1)
  //   @Max(10e10)
  //   @IsOptional()
  //   id?: number
}
