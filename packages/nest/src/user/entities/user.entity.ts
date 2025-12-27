import { Role } from "src/role/entities/role.entity";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToMany,
  JoinTable,
} from "typeorm";

@Entity({ name: "users" })
export class User {
  // 单一自增主键（核心标识，不可变）
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", { length: 20 })
  name: string;

  // 用户名：唯一、非空
  @Column("varchar", {
    length: 20,
    unique: true,
    nullable: false,
  })
  username: string;

  // 邮箱：唯一、可空（长度调整为更合理的 60）
  @Column("varchar", {
    length: 60,
    unique: true,
    nullable: true,
  })
  email: string;

  // 手机号：唯一、可空
  @Column("varchar", {
    length: 11,
    unique: true,
    nullable: true,
  })
  phone: string;

  @Column("varchar", { length: 32 })
  password: string;

  @Column("int", { default: 0 })
  status: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  removedAt: Date;

  @ManyToMany(() => Role, (role) => role.users, {
    cascade: true,
  })
  @JoinTable({
    name: "user_roles", // 此关系的联结表的表名
    joinColumn: {
      name: "user",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "role",
      referencedColumnName: "id",
    },
  })
  roles: Role[];
}
