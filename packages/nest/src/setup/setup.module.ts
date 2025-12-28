import { Module } from '@nestjs/common'
import { SetupController } from './setup.controller'
import { SetupService } from './setup.service'
import { UserModule } from 'src/user/user.module'

@Module({
  imports: [UserModule],
  controllers: [SetupController],
  providers: [SetupService],
  exports: [SetupService],
})
export class SetupModule {}
