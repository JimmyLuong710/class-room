import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginRequestDto, SignupRequestDto } from './dtos/request.dto';
import { UserModel } from 'modules/shared/models/user.model';

@Injectable()
export class AuthService {
  private logger: Logger = new Logger(AuthService.name);

  constructor(
    private readonly jwtService: JwtService,
    private readonly userModel: UserModel,
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
    const existedUser = await this.userModel.model.findOne({ username: credentials.username });
    if (existedUser) throw new BadRequestException('Email or phone number has been registered.');

    const hashedPw = await this.hashPassword(credentials.password);
    await this.userModel.save({ ...credentials, password: hashedPw });
  }

  async login(loginDto: LoginRequestDto) {
    const user = await this.userModel.model.findOne({ username: loginDto.username });
    if (!user) throw new BadRequestException('Username or password is incorrect.');

    const checkPw = await this.checkPassword(loginDto.password, user.password);
    if (!checkPw) throw new BadRequestException('Username or password is incorrect.');

    const accessToken = await this.generateTokens(user.username, user.role);
    return { accessToken };
  }
}
