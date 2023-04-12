import { HttpException, Injectable } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UsersRepository,
    private readonly authService: AuthService
  ){}

  async create(userData: CreateUserDto) {
    let user = await this.userRepository.getUserByName(userData);
    if(user){
      throw new HttpException("USER_ALREADY_EXISTS", 409);
    }
    userData.password = await this.authService.encryptPassword(userData.password);
    let registerUser = await this.userRepository.createUser(userData);
    return registerUser;
  }

  async login(loginData: CreateUserDto) {
    let user = await this.userRepository.getUserByName(loginData);
    if(!user){
      throw new HttpException("USER_NOT_FOUND", 404);
    } 
    let passwordMatch = await this.authService.validadePassword(loginData.password, user.password);
    if(!passwordMatch){
      throw new HttpException("WRONG_PASSWORD", 401);
    }
    let JwtToken = await this.authService.login(user);
    let finalData = {
      ...user,
      token: JwtToken.access_token
    }
    return finalData;
  }
}
