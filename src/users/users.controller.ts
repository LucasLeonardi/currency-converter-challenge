import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ErrorHandling } from '../../config/error-handling';
import { ApiBody, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({ type: CreateUserDto })
  @Post()
  create(@Body() createUser: CreateUserDto) {
    try{
      return this.usersService.create(createUser);
    }catch (error) {
      new ErrorHandling(error);
    } 
  }

  @ApiOperation({ summary: 'Login the user and return Token JWT' })
  @Get('login')
  login(@Query() query: CreateUserDto){
    try{
      return this.usersService.login(query);
    }catch (error) {
      new ErrorHandling(error);
    } 
  }


}
