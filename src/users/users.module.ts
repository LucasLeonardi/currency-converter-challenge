import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { InMemoryDBModule } from '@nestjs-addons/in-memory-db';
import { AuthModule } from '../auth/auth.module';
import { UsersRepository } from './users.repository';

@Module({
  imports: [InMemoryDBModule, AuthModule],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository]
})
export class UsersModule {}
