import { Body, Controller, Post } from '@nestjs/common'
import { AllowWithoutSystemReady } from './allow-without-system-ready.decorator'
import { SetupDto } from './dto/setup.dto'
import { SetupService } from './setup.service'
import { Public } from 'src/shared/decorators/public.decorator'

@AllowWithoutSystemReady()
@Public()
@Controller('setup')
export class SetupController {
  constructor(private readonly setupService: SetupService) {}
  @Post()
  setup(@Body() dto: SetupDto) {
    return this.setupService.setup(dto)
  }

  @Post('check')
  check() {
    return 'check'
  }
}
