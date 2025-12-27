import { Injectable } from "@nestjs/common";
import { CreateRoleDto } from "./dto/create-role.dto";
import { UpdateRoleDto } from "./dto/update-role.dto";
import { Repository } from "typeorm";
import { Role } from "./entities/role.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>
  ) {}

  async create(createRoleDto: CreateRoleDto) {
    const role = this.roleRepository.create({
      name: createRoleDto.name,
      description: createRoleDto.description,
      status: createRoleDto.status,
    });

    await this.roleRepository.save(role);

    return role.id;
  }

  async findAll() {
    return await this.roleRepository.find({
      select: ["id", "name", "description", "status", "createdAt", "updatedAt"],
    });
  }

  async findOne(id: number) {
    return await this.roleRepository.findOne({
      where: { id },
      select: ["id", "name", "description", "status", "createdAt", "updatedAt"],
    });
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    await this.roleRepository.update(id, {
      name: updateRoleDto.name,
      description: updateRoleDto.description,
      status: updateRoleDto.status,
    });

    return id;
  }

  async remove(id: number) {
    await this.roleRepository.softDelete(id);
    return id;
  }
}
