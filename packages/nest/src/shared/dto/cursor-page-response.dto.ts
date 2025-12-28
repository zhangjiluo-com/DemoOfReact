import { ApiProperty } from '@nestjs/swagger'

export class CursorPageResponseDto<T> {
  @ApiProperty({ description: '数据列表' })
  list: T[]

  @ApiProperty({ description: '下页游标', required: false })
  next?: string
}
