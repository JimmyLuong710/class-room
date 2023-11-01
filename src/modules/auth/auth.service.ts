import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private logger: Logger = new Logger(AuthService.name);

  constructor(private jwtService: JwtService) {}

  async generateTokens(email: string, role: string): Promise<string> {
    return await this.jwtService.signAsync({ email, role });
  }
}
