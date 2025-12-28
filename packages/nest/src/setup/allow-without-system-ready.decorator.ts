import { SetMetadata, CustomDecorator } from '@nestjs/common'

export const ALLOW_WITHOUT_SYSTEM_READY_KEY = 'ALLOW_WITHOUT_SYSTEM_READY_KEY'

export const AllowWithoutSystemReady = (): CustomDecorator<string> => {
  return SetMetadata(ALLOW_WITHOUT_SYSTEM_READY_KEY, true)
}
