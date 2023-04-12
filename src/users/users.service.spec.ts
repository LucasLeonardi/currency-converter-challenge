import { InMemoryDBService } from '@nestjs-addons/in-memory-db';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth/auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Users } from './entities/user.entity';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let userService: UsersService;
  let usersRepository: UsersRepository;
  let authService: AuthService;
  
  const createUser = {
    id: '1',
    name: 'teste',
    password: '12345',
  }

  const userInfo: CreateUserDto = {
    name: 'teste',
    password: '12345'
  }

  const tokenReturn = {
    access_token: 'jwtToken'
  }

  const userLoginInfo = {
    id: '1',
    name: 'teste',
    password: '12345',
    token: 'jwtToken'
  }


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: UsersRepository,
          useValue: {
            getUserByName: jest.fn().mockResolvedValue(createUser),
            createUser: jest.fn().mockResolvedValue(createUser),
          }, 
        },
        {
          provide: AuthService,
          useValue: {
            encryptPassword: jest.fn().mockResolvedValue('passwordencrypted'),
            validadePassword: jest.fn().mockResolvedValue(true),
            login: jest.fn().mockResolvedValue(tokenReturn),
          }, 
        },
      ],
    }).compile();

    userService = module.get<UsersService>(UsersService);
    authService = module.get<AuthService>(AuthService);
    usersRepository = module.get<UsersRepository>(UsersRepository)
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
    expect(usersRepository).toBeDefined();
    expect(authService).toBeDefined();
  });

  describe('create', ()=> {
    it('should return a error if user already exists', async () => {
      jest.spyOn(usersRepository, 'getUserByName').mockRejectedValueOnce(new Error());
      expect(userService.create(userInfo)).rejects.toThrowError();
    });
  });

  describe('login', ()=> {
    it('should return the info of user if password is correct', async () => {
      const result = await userService.login(userInfo);

      expect(result).toEqual(userLoginInfo);
      expect(typeof result).toEqual('object');
      expect(result.name).toEqual(userLoginInfo.name);
      expect(authService.validadePassword).toHaveBeenCalledTimes(1);
      expect(usersRepository.getUserByName).toHaveBeenCalledTimes(1);
      expect(authService.login).toHaveBeenCalledTimes(1);
    });
  });
});
