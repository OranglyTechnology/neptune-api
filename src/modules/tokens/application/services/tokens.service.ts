import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignOptions } from 'jsonwebtoken';

// entities
import { UserEntity } from 'src/modules/users/domain/entities/user.entity';

const BASE_OPTIONS: SignOptions = {
  issuer: process.env.ISSUER_URL,
  audience: process.env.AUDIENCE_URL,
};

@Injectable()
export class TokensService {
  constructor(private readonly jwtService: JwtService) {}

  private async generateToken(
    user: UserEntity,
    signOptions?: SignOptions,
  ): Promise<string> {
    const payload = {};

    const opts: SignOptions = {
      ...BASE_OPTIONS,
      subject: String(user.id),
      ...signOptions,
    };

    return this.jwtService.signAsync(payload, opts);
  }

  public async createAccessToken(user: UserEntity): Promise<string> {
    return this.generateToken(user);
  }
}
