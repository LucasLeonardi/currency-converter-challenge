import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService
  ) {}

  async login(user: any) {
    const payload = { userId: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async encryptPassword(password: string){
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
  }

  async validadePassword(password: string, hash: string){
    return await bcrypt.compare(password, hash);
  }
}