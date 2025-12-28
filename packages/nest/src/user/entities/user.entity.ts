import { Role } from 'src/role/entities/role.entity'
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm'

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column('varchar', { length: 255, unique: true })
  name: string

  @Column('varchar', { length: 255, unique: true })
  username: string

  @Column('varchar', { length: 255, unique: true, nullable: true })
  email: string | null = null

  @Column('varchar', { length: 11, unique: true, nullable: true })
  phone: string | null = null

  @Column('varchar', { length: 255 })
  password: string

  @Column('int', { default: 0 })
  status: number

  /**
   * 用户类型
   * 1: 普通用户
   * 2: 管理员
   * 3: 超级管理员
   * 4: 平台中心管理员
   * 5: 平台中心超级管理员
   * 6: 系统用户
   * 7: 系统外部API用户
   * 8: 系统超级管理员
   */
  @Column('int', { default: 0 })
  type: number

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @DeleteDateColumn()
  removedAt: Date

  // createdBy: User

  // updatedBy: User

  // removedBy: User

  @ManyToMany(() => Role, role => role.users, { onDelete: 'CASCADE' })
  @JoinTable({
    name: 'userRoles',
    joinColumn: { name: 'userId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'roleId', referencedColumnName: 'id' },
  })
  roles: Role[]
}
