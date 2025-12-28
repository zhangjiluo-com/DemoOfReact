import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { SetupService } from './setup.service'
import { ALLOW_WITHOUT_SYSTEM_READY_KEY } from './allow-without-system-ready.decorator'

@Injectable()
export class SystemReadyGuard implements CanActivate {
  constructor(
    private readonly setupService: SetupService,
    private readonly reflector: Reflector, // 用于获取路由/控制器元数据
  ) {}

  canActivate(context: ExecutionContext): boolean {
    // 1. 获取当前ready状态，若已就绪，直接放行所有接口
    if (this.setupService.isReady()) return true

    const isRouteAllowed = this.reflector.get<boolean>(
      ALLOW_WITHOUT_SYSTEM_READY_KEY,
      context.getHandler(), // 获取当前路由的处理方法（如controller中的某个接口方法）
    )

    // 2. 若路由未标记，读取 控制器 上的元数据（批量生效）
    const isControllerAllowed = this.reflector.get<boolean>(
      ALLOW_WITHOUT_SYSTEM_READY_KEY,
      context.getClass(), // 获取当前路由所属的控制器类
    )

    // 3. 只要路由或控制器有一个标记了允许放行，直接返回true（放行）
    if (isRouteAllowed || isControllerAllowed) return true

    throw new ForbiddenException('系统尚未安装完成，请先完成初始化')
  }
}
