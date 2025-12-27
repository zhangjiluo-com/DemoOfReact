import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { Role } from "src/role/entities/role.entity";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>
  ) {}

  async create(createUserDto: CreateUserDto) {
    const roleIds = createUserDto.roleIds;

    const roles = await this.roleRepository.findBy({
      id: In(roleIds),
    });

    if (roles.length !== roleIds.length) {
      console.warn("有角色不存在", roleIds);
    }

    const user = this.userRepository.create({
      name: createUserDto.name,
      username: createUserDto.username,
      email: createUserDto.email,
      password: createUserDto.password,
      roles: roles,
    });

    await this.userRepository.save(user);

    return user.id;
  }

  findAll() {
    return this.userRepository.find({
      select: ["id", "name", "username", "email", "phone"],
    });
  }

  async findOne(id: number) {
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
          description: true,
          status: true,
        },
      },
      relations: ["roles"],
    });

    if (!user) {
      throw new HttpException("用户不存在", HttpStatus.NOT_FOUND);
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);

    if (!user) {
      throw new HttpException("用户不存在", HttpStatus.NOT_FOUND);
    }

    await this.userRepository.update(id, {
      name: updateUserDto.name,
      username: updateUserDto.username,
      email: updateUserDto.email,
      phone: updateUserDto.phone,
    });

    return id;
  }

  async remove(id: number) {
    const user = await this.findOne(id);

    if (!user) {
      throw new HttpException("用户不存在", HttpStatus.NOT_FOUND);
    }

    await this.userRepository.softDelete(id);

    return id;
  }
}
