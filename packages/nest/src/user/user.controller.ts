import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { Public } from "src/shared/decorators/public.decorator";
import { ApiHeader, ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags("用户")
@ApiHeader({ name: "Authorization" })
@Controller("users")
@Public()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: "创建用户" })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @ApiOperation({ summary: "查询所有用户" })
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @ApiOperation({ summary: "查询用户详情" })
  @Get(":id")
  findOne(@Param("id") id: number) {
    return this.userService.findOne(id);
  }

  @ApiOperation({ summary: "更新用户" })
  @Patch(":id")
  update(@Param("id") id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @ApiOperation({ summary: "删除用户" })
  @Delete(":id")
  remove(@Param("id") id: number) {
    return this.userService.remove(id);
  }
}
