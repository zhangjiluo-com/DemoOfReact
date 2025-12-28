import { User } from 'src/user/entities/user.entity'
import { Column, CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

export class Notice {
  @PrimaryGeneratedColumn()
  id: number

  @Column('varchar', { length: 255 })
  title: string

  @Column('varchar', { length: 255 })
  content: string

  @Column('int', { default: 0 })
  type: number

  @Column('int', { default: 0 })
  status: number

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @DeleteDateColumn()
  removedAt: Date

  //   sender: User

  //   receiver: User
}
