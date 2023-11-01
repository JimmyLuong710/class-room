import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginRequestDto, SignupRequestDto } from './dtos/request.dto';
import { UserRepository } from 'modules/shared/repositories/user.repository';

@Injectable()
export class AuthService {
  private logger: Logger = new Logger(AuthService.name);

  constructor(
    private jwtService: JwtService,
    private readonly userRepo: UserRepository,
  ) {}

  async generateTokens(username: string, role: string): Promise<string> {
    return await this.jwtService.signAsync({ username, role });
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  async checkPassword(password: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }

  async signup(credentials: SignupRequestDto) {
    const existedUser = await this.userRepo.getRepository().findOne({ where: { username: credentials.username } });
    if (existedUser) throw new BadRequestException('Email or phone number has been registered.');

    const hashedPw = await this.hashPassword(credentials.password);
    await this.userRepo.getRepository().save({ ...credentials, password: hashedPw });
  }

  async login(loginDto: LoginRequestDto) {
    const userE = await this.userRepo.getRepository().findOne({ where: { username: loginDto.username } });
    if (!userE) throw new BadRequestException('Username or password is incorrect.');

    const checkPw = await this.checkPassword(loginDto.password, userE.password);
    if (!checkPw) throw new BadRequestException('Username or password is incorrect.');

    const accessToken = await this.generateTokens(userE.username, userE.role);
    return { accessToken };
  }
}
