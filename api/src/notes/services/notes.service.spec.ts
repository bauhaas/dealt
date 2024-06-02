import { Test, TestingModule } from '@nestjs/testing';
import { NotesRepository } from 'src/notes/repositories/notes.repository';
import { NotesService } from './notes.service';
import { DeepMockProxy, mockClear, mockDeep } from 'jest-mock-extended';
import { NotesModule } from 'src/notes/notes.module';
import { UsersModule } from 'src/users/users.module';
import { UsersRepository } from 'src/users/repositories/users.repository';
import { UsersService } from 'src/users/services/users.service';

const user = {
  id: 1,
  email: 'john.doe@dealt.fr',
  name: null,
  password: 'password',
  createdAt: new Date(),
};

const note = {
  id: 1,
  title: 'title',
  content: 'content',
  authorId: 1,
  createdAt: new Date(),
};

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
    mockClear(usersService);
    mockClear(usersRepository);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(noteService).toBeDefined();
  });

  describe('POST', () => {
    it('should create a note', async () => {
      const data = {
        title: 'title',
        content: 'content',
      };

      usersService.findOneById.mockResolvedValueOnce(user);
      notesRepository.create.mockResolvedValueOnce(note);

      const result = await noteService.createNote(data, user.id);

      expect(result.isOk()).toBe(true);
      expect(result.unwrap()).toEqual({
        ...note,
        createdAt: expect.any(Date),
      });
      expect(notesRepository.create).toHaveBeenCalledWith({
        title: 'title',
        content: 'content',
        author: {
          connect: {
            id: 1,
          },
        },
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
  });

  describe('GET', () => {
    it('should get all notes from a user', async () => {
      usersService.findOneById.mockResolvedValueOnce(user);

      notesRepository.getAllNotesByUserId.mockResolvedValueOnce([
        {
          id: 1,
          title: 'title',
          content: 'content',
          authorId: 1,
          createdAt: new Date(),
        },
      ]);

      const result = await noteService.getAllNotes(1);
      expect(result.isOk()).toBe(true);
      expect(result.unwrap()).toEqual([
        {
          ...note,
          createdAt: expect.any(Date),
        },
      ]);
      expect(notesRepository.getAllNotesByUserId).toHaveBeenCalledWith(1);
    });

    it('should return USER_NOT_FOUND when getting all notes from a user', async () => {
      usersService.findOneById.mockResolvedValueOnce(null);

      const result = await noteService.getAllNotes(2);

      expect(result.isErr()).toBe(true);
      expect(result.unwrapErr()).toBe('USER_NOT_FOUND');
    });
  });

  describe('PATCH', () => {
    it('should patch a note', async () => {
      notesRepository.getNoteById.mockResolvedValueOnce(note);

      notesRepository.patchNoteById.mockResolvedValueOnce({
        ...note,
        content: 'update content',
      });

      const result = await noteService.patchNote(1, 1, {
        title: 'title',
        content: 'update content',
      });

      expect(result.isOk()).toBe(true);
      expect(result.unwrap()).toEqual({
        ...note,
        content: 'update content',
        createdAt: expect.any(Date),
      });
      expect(notesRepository.patchNoteById).toHaveBeenCalledWith(1, {
        title: 'title',
        content: 'update content',
      });
    });
    it('should return NOTE_NOT_FOUND when patching a non-existing note', async () => {
      notesRepository.getNoteById.mockResolvedValueOnce(null);

      const result = await noteService.patchNote(1, user.id, {
        title: 'title',
        content: 'update content',
      });

      expect(result.isErr()).toBe(true);
      expect(result.unwrapErr()).toBe('NOTE_NOT_FOUND');
    });

    it('should return NOTE_ACCESS_FORBIDDEN if user who patches is not the note author', async () => {
      notesRepository.getNoteById.mockResolvedValueOnce({
        ...note,
        authorId: 2,
      });

      const result = await noteService.patchNote(1, user.id, {
        title: 'title',
        content: 'update content',
      });

      expect(result.isErr()).toBe(true);
      expect(result.unwrapErr()).toBe('NOTE_ACCESS_FORBIDDEN');
    });
  });

  describe('DELETE', () => {
    it('should delete a note', async () => {
      notesRepository.getNoteById.mockResolvedValueOnce(note);
      notesRepository.deleteNoteById.mockResolvedValueOnce(note);

      const result = await noteService.deleteNote(1, user.id);

      expect(result.isOk()).toBe(true);
      expect(result.unwrap()).toEqual(undefined);
      expect(notesRepository.deleteNoteById).toHaveBeenCalledWith(1);
    });

    it('should return NOTE_ACCESS_FORBIDDEN if user who deletes is not the note author', async () => {
      notesRepository.getNoteById.mockResolvedValueOnce({
        ...note,
        authorId: 2,
      });

      const result = await noteService.deleteNote(1, user.id);

      expect(result.isErr()).toBe(true);
      expect(result.unwrapErr()).toBe('NOTE_ACCESS_FORBIDDEN');
    });
  });
});
