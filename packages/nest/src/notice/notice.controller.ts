import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { NoticeService } from './notice.service'
import { CreateNoticeDto } from './dto/create-notice.dto'
import { UpdateNoticeDto } from './dto/update-notice.dto'
import { ApiTags, ApiHeader, ApiOperation } from '@nestjs/swagger'
import { Public } from 'src/shared/decorators/public.decorator'

@Public()
@ApiTags('通知')
@ApiHeader({ name: 'Authorization' })
@Controller('notices')
export class NoticeController {
  constructor(private readonly noticeService: NoticeService) {}

  @ApiOperation({ summary: '创建通知' })
  @Post()
  create(@Body() dto: CreateNoticeDto) {
    return this.noticeService.create(dto)
  }

  @ApiOperation({ summary: '查询所有通知' })
  @Get()
  getAll() {
    return this.noticeService.getAll()
  }

  @ApiOperation({ summary: '查询通知详情' })
  @Get(':id')
  get(@Param('id') id: number) {
    return this.noticeService.get(id)
  }

  @ApiOperation({ summary: '更新通知' })
  @Patch(':id')
  update(@Param('id') id: number, @Body() dto: UpdateNoticeDto) {
    return this.noticeService.update(id, dto)
  }

  @ApiOperation({ summary: '删除通知' })
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.noticeService.remove(id)
  }
}
