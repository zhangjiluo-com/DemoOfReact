import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Logger } from "nestjs-pino";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly logger: Logger
  ) {}
  // private readonly logger = new Logger(AuthService.name);

  async login(username: string, password: string) {
    this.logger.log(`login: ${username} ${password}`);
    // const user = await this.usersService.findOne(username);
    // if (user?.password !== pass) {
    //   throw new UnauthorizedException();
    // }
    const payload = { username: username };

    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}
