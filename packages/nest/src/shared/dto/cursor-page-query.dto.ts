// src/common/dto/cursor-pagination.dto.ts
import { IsInt, IsOptional, Min, IsString, IsNumber, Max, IsNotEmpty } from 'class-validator'
import { Type } from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger'

// 游标分页查询 DTO
export class CursorPageQueryDto {
  /**
   * 游标, base64 编码后的字符串，用于分页查询下一页数据，包含上一页最后一条数据的 ID以及查询条件
   * demo: {}
   */
  @ApiProperty({ description: '游标', required: false })
  @IsOptional()
  @IsString()
  cursor?: string

  @ApiProperty({ description: '步长', required: false })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(100)
  size: number = 10
}
