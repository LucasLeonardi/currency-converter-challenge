import { InMemoryDBService } from "@nestjs-addons/in-memory-db";
import { CreateUserDto } from "./dto/create-user.dto";
import { Users } from "./entities/user.entity";

export class UsersRepository extends InMemoryDBService<Users>{

  async getUserByName(userData: CreateUserDto){
    return this.query(record => record.name === userData.name)[0];
  }

  async createUser(userData: CreateUserDto){
    return this.create(userData)
  }
}