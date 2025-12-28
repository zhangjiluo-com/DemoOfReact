import { Injectable, MethodNotAllowedException, ForbiddenException } from '@nestjs/common'
import { UserService } from 'src/user/user.service'
import { SetupDto } from './dto/setup.dto'

const enum SystemReadyState {
  Unknown = 0,
  Uninitialized = 1,
  Initializing = 2,
  Ready = 3,
}

@Injectable()
export class SetupService {
  constructor(private readonly userService: UserService) {}

  // 0: 未知
  // 1: 未初始化
  // 2: 初始化中
  // 3: 已就绪
  private readyState = SystemReadyState.Unknown

  isReady() {
    return this.readyState === SystemReadyState.Ready
  }

  async check() {
    if (this.readyState !== SystemReadyState.Unknown) return this.readyState === SystemReadyState.Ready
    // 检查是否完成安装并且系统组件是否正常
    // 1. 系统是否存在系统超级管理员
    const systemSuperAdmin = await this.userService.getSystemSuperAdmin()
    if (!systemSuperAdmin) {
      console.error('系统超级管理员不存在')
      this.readyState = SystemReadyState.Uninitialized
      return false
    }
    this.readyState = SystemReadyState.Ready
    return true
  }

  async setup(dto: SetupDto) {
    if (this.readyState === SystemReadyState.Unknown) throw new MethodNotAllowedException('系统未初始化')
    if (this.readyState === SystemReadyState.Initializing) throw new MethodNotAllowedException('系统初始化中')
    if (this.readyState === SystemReadyState.Ready) throw new MethodNotAllowedException('系统已就绪')
    if (this.readyState === SystemReadyState.Uninitialized) {
      if (dto.code !== '123456') throw new ForbiddenException('安装码错误')
      this.readyState = SystemReadyState.Initializing
      try {
        this.userService.createSystemSuperAdmin()
        this.readyState = SystemReadyState.Ready
        return {
          message: '系统初始化成功',
        }
      } catch (error) {
        this.readyState = SystemReadyState.Uninitialized
      }
    }
  }
}
