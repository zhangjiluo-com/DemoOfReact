import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './entities/user.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { FindOptionsOrder, FindOptionsWhere, In, Like, MoreThan, Repository } from 'typeorm'
import { Role } from 'src/role/entities/role.entity'
import { GetUserPageDto } from './dto/get-user-page.dto'
import { getQueryOrder } from 'src/shared/utils/getQueryOrder'
import { GetUserCursorPageDto } from './dto/get-user-cursor-page.dto'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
  ) {}

  async create(dto: CreateUserDto) {
    const roleIds = dto.roleIds

    const roles = await this.roleRepository.findBy({
      id: In(roleIds),
    })

    if (roles.length !== roleIds.length) {
      console.warn('有角色不存在', roleIds)
    }

    const user = this.userRepository.create({
      name: dto.name,
      username: dto.username,
      email: dto.email,
      password: dto.password,
      roles: roles,
    })

    await this.userRepository.save(user)

    return user.id
  }

  getAll() {
    return this.userRepository.find({
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        phone: true,
        status: true,
      },
    })
  }

  async getPage(dto: GetUserPageDto) {
    const keywordList = dto.keyword
      .split(' ')
      .map(word => word.trim())
      .filter(Boolean)
    const searchConditions = keywordList.slice(0, 4).map(word => {
      // 单个关键字的模糊匹配格式
      const fuzzyWord = `%${word}%`
      return [
        { name: Like(fuzzyWord) },
        { username: Like(fuzzyWord) },
        { email: Like(fuzzyWord) },
        { phone: Like(fuzzyWord) },
      ]
    })
    const where: FindOptionsWhere<User>[] = searchConditions.flat()

    where.push({ id: dto.id })

    const [list, total] = await this.userRepository.findAndCount({
      where: where,
      order: getQueryOrder(
        ['id', 'name', 'username', 'email', 'phone', 'status', 'createdAt', 'updatedAt', 'removedAt'],
        dto.asc,
        dto.desc,
      ),
      skip: (dto.current - 1) * dto.size,
      take: dto.size,
    })

    return {
      list,
      total,
      current: dto.current,
      size: dto.size,
    }
  }

  /**6
   * 游标分页中的条件要求是稳定排序的字段，比如 数值类型，日期时间类型、部分字符串类型（遵循字符编码规则）
   * 游标中尽量有个唯一字段，比如ID
   * 频繁更新的字段，不建议放在游标中，比如实时更新的积分
   * 二进制、json、几何 / 空间类型等不建议放在游标中
   * 这里示例：支持创建时间降序、用户名升序、ID（默认降序） 这3个字段
   */
  async getCusorPage(dto: GetUserCursorPageDto) {
    function getCusorPageParams(cursor?: string) {
      const paramStrDemo = {
        condition: {
          id: {
            value: 1,
            sort: 1,
          },
          createdAt: {
            value: '2023-01-01T00:00:00.000Z',
            sort: 1,
          },
          username: {
            value: 'a',
            sort: 1,
          },
        },
        id: 1, // 唯一值
        order: {
          id: 1,
          createdAt: 1,
          username: -1,
        } satisfies FindOptionsOrder<User>,
      } as const
      return paramStrDemo
      // const defaultParams = paramStrDemo
      // if (!cursor) return defaultParams

      // // where orders
      // try {
      //   const paramStr = JSON.parse(atob(cursor))
      //   return {
      //     where: {},
      //     order: {},
      //     // id: paramStr.id ? Number(paramStr.id) : undefined,
      //     // createdAt: paramStr.createdAt ? new Date(paramStr.createdAt) : undefined,
      //     // username: paramStr.username ? paramStr.username : undefined,
      //   }
      // } catch (error) {
      //   return defaultParams
      // }
    }
    const cursor = dto.cursor
    const conditionParams = getCusorPageParams(cursor)
    const conditions = {
      where: {
        id: MoreThan(conditionParams.condition.id.value),
        createdAt: MoreThan(new Date(conditionParams.condition.createdAt.value)),
        username: MoreThan(conditionParams.condition.username.value),
      } satisfies FindOptionsWhere<User>,
      order: {
        id: conditionParams.condition.id.sort,
        createdAt: conditionParams.condition.createdAt.sort,
        username: conditionParams.condition.username.sort,
      } satisfies FindOptionsOrder<User>,
    }
    const size = dto.size

    const list = await this.userRepository.find({
      where: conditions.where,
      order: conditions.order,
      skip: cursor ? 1 : 0,
      take: size,
    })

    return {
      list,
      next: list.length === size ? list[list.length - 1].id.toString() : undefined,
    }
  }

  async get(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        phone: true,
        status: true,
        roles: {
          id: true,
          name: true,
          note: true,
          status: true,
        },
      },
      relations: {
        roles: true,
      },
    })

    if (!user) {
      throw new HttpException('用户不存在', HttpStatus.NOT_FOUND)
    }

    return user
  }

  async update(id: number, dto: UpdateUserDto) {
    const user = await this.get(id)

    if (!user) {
      throw new HttpException('用户不存在', HttpStatus.NOT_FOUND)
    }

    await this.userRepository.update(id, {
      name: dto.name,
      username: dto.username,
      email: dto.email,
      phone: dto.phone,
    })

    return id
  }

  async remove(id: number) {
    await this.userRepository.softDelete(id)
    return id
  }

  async delete(id: number) {
    await this.userRepository.delete(id)
    return id
  }

  async getSystemSuperAdmin() {
    const result = await this.userRepository.findOne({
      where: { type: 0b11111111 },
    })
    return result
  }

  async createSystemSuperAdmin() {
    const result = await this.userRepository.save({
      name: '系统超级管理员',
      username: 'system',
      password: '123456',
      type: 0b11111111,
    })
    return result
  }
}
