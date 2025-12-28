import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { TenantService } from './tenant.service'
import { CreateTenantDto } from './dto/create-tenant.dto'
import { UpdateTenantDto } from './dto/update-tenant.dto'

@Controller('tenants')
export class TenantController {
  constructor(private readonly tenantService: TenantService) {}

  @Post()
  create(@Body() dto: CreateTenantDto) {
    return this.tenantService.create(dto)
  }

  @Get()
  getAll() {
    return this.tenantService.getAll()
  }

  @Get(':id')
  get(@Param('id') id: number) {
    return this.tenantService.get(id)
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() dto: UpdateTenantDto) {
    return this.tenantService.update(id, dto)
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.tenantService.remove(id)
  }
}
