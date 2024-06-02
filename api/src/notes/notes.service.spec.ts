import { Test, TestingModule } from '@nestjs/testing';
import { NotesRepository } from 'src/notes/notes.repository';
import { NotesService } from './notes.service';
import { DeepMockProxy, mockClear, mockDeep } from 'jest-mock-extended';
import { NotesModule } from 'src/notes/notes.module';
import { UsersModule } from 'src/users/users.module';
import { UsersRepository } from 'src/users/users.repository';
import { UsersService } from 'src/users/users.service';

describe('NotesService', () => {
  let noteService: NotesService;

  let notesRepository: DeepMockProxy<NotesRepository>;
  let usersService: DeepMockProxy<UsersService>;
  let usersRepository: DeepMockProxy<UsersRepository>;

  beforeEach(async () => {
    notesRepository = mockDeep<NotesRepository>();
    usersService = mockDeep<UsersService>();
    usersRepository = mockDeep<UsersRepository>();

    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [NotesModule, UsersModule],
    })
      .overrideProvider(NotesRepository)
      .useValue(notesRepository)
      .overrideProvider(UsersService)
      .useValue(usersService)
      .overrideProvider(UsersRepository)
      .useValue(usersRepository)
      .compile();

    noteService = moduleRef.get(NotesService);
  });

  afterEach(() => {
    mockClear(notesRepository);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(noteService).toBeDefined();
  });

  it('should create a note', async () => {
    const data = {
      title: 'title',
      content: 'content',
    };

    const user = {
      id: 1,
      email: 'john.doe@delt.fr',
      name: null,
      password: 'password',
      createdAt: new Date(),
    };

    usersService.findOneById.mockResolvedValueOnce(user);

    notesRepository.create.mockResolvedValueOnce({
      id: 1,
      title: 'title',
      content: 'content',
      authorId: 1,
      createdAt: new Date(),
    });

    const result = await noteService.createNote(data, user.id);

    expect(result.isOk()).toBe(true);
    expect(result.unwrap()).toEqual({
      id: 1,
      title: 'title',
      content: 'content',
      authorId: 1,
      createdAt: expect.any(Date),
    });
  });

  it('should return USER_NOT_FOUND when creating a note', async () => {
    const data = {
      title: 'title',
      content: 'content',
    };

    usersService.findOneById.mockResolvedValueOnce(null);

    const result = await noteService.createNote(data, 2);

    expect(result.isErr()).toBe(true);
    expect(result.unwrapErr()).toBe('USER_NOT_FOUND');
  });

  it('should get all notes from a user', async () => {});

  it('should patch a note', async () => {});

  it('should delete a note', async () => {});
});
