import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let userController: UsersController;
  let userService: UsersService;

  const userInfo: CreateUserDto = {
    name: 'teste',
    password: '12345'
  }

  const cretedUser = {
    id: '1',
    name: userInfo.name,
    password: userInfo.password,
  }

  const loginUser = {
    id: '1',
    name: userInfo.name,
    password: userInfo.password,
    token: 'tokenjwt',
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            create: jest.fn().mockResolvedValue(cretedUser),
            login: jest.fn().mockResolvedValue(loginUser)
          }, 
        },
      ],
    }).compile();

    userController = module.get<UsersController>(UsersController);
    userService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
    expect(userService).toBeDefined();
  });

  describe('create', ()=> {
    it('should return a created user successfully', async () => {
      const result = await userController.create(userInfo);

      expect(result).toEqual(cretedUser);
      expect(typeof result).toEqual('object');
      expect(result.name).toEqual(userInfo.name);
      expect(userService.create).toHaveBeenCalledTimes(1);
    });

    it('should return error if user already exists', () => {
      jest.spyOn(userService, 'create').mockRejectedValueOnce(new Error());
      expect(userController.create(userInfo)).rejects.toThrowError();
    });
  });

  describe('login', ()=> {
    it('should return a created user successfully', async () => {
      const result = await userController.login(userInfo);

      expect(result).toEqual(loginUser);
      expect(typeof result).toEqual('object');
      expect(typeof result.token).toEqual('string');
      expect(userService.login).toHaveBeenCalledTimes(1);
    });

    it('should return error if password is no correct', () => {
      jest.spyOn(userService, 'login').mockRejectedValueOnce(new Error());
      expect(userController.login(userInfo)).rejects.toThrowError();
    });
  });


});
