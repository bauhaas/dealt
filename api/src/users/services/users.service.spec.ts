import { Test, TestingModule } from '@nestjs/testing';
import { DeepMockProxy, mockClear, mockDeep } from 'jest-mock-extended';
import { CreateUserRequestDto } from 'src/users/dtos/createUserRequest.dto';
import { UsersRepository } from 'src/users/repositories/users.repository';
import { UsersService } from 'src/users/services/users.service';
import { UsersModule } from 'src/users/users.module';

const user = {
  id: 1,
  email: 'john.doe@dealt.fr',
  name: null,
  password: 'password',
  createdAt: new Date(),
};

const createUserRequest: CreateUserRequestDto = {
  email: 'john.doe@dealt.fr',
  password: 'password',
};

describe('UsersService', () => {
  let userService: UsersService;

  let usersRepository: DeepMockProxy<UsersRepository>;

  beforeEach(async () => {
    usersRepository = mockDeep<UsersRepository>();

    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [UsersModule],
    })
      .overrideProvider(UsersRepository)
      .useValue(usersRepository)
      .compile();

    userService = moduleRef.get(UsersService);
  });

  afterEach(() => {
    mockClear(usersRepository);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('POST', () => {
    it('should create a user', async () => {
      usersRepository.create.mockResolvedValue(user);
      usersRepository.excludePassword.mockResolvedValue({
        id: 1,
        email: 'john.doe@dealt.fr',
        name: null,
        createdAt: user.createdAt,
      });

      const result = await userService.createUser(createUserRequest);

      expect(result.isOk()).toBe(true);
      expect(result.unwrap()).toEqual({
        id: 1,
        email: 'john.doe@dealt.fr',
        name: null,
        createdAt: user.createdAt,
      });
    });
  });
});
