import { Column, CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

export class Order {
  @PrimaryGeneratedColumn()
  id: number

  @Column('varchar', { length: 255 })
  no: string

  @Column('int', { default: 0 })
  amount: number

  @Column('int', { default: 0 })
  type: number

  @Column('int', { default: 0 })
  state: number

  @Column('int', { default: 0 })
  status: number

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @DeleteDateColumn()
  removedAt: Date

  @Column('varchar', { length: 255 })
  note: string

  //   goods: OrderGoods -> Product + type + quantity

  //   comments: OrderComment

  //   orderPayment: OrderPayment

  //   createdBy: User

  //   updatedBy: User

  //   removedBy: User
}
