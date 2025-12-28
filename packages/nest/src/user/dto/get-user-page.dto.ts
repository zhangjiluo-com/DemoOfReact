import { ApiProperty, PartialType } from '@nestjs/swagger'
import { IsString, IsOptional, IsNumber, IsInt, Min, Max } from 'class-validator'
import { PageQueryBaseDto } from 'src/shared/dto/page-query.dto'

export class GetUserPageDto extends PageQueryBaseDto {
  @ApiProperty({ description: 'ID', required: false })
  @IsNumber()
  @IsInt()
  @Min(1)
  @Max(10e10)
  @IsOptional()
  id?: number
}
