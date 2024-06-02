import { CreateNoteRequestDto } from 'src/notes/dtos/createNoteRequest.dto';

export const CreateNoteApiOperation = {
  summary: 'Create a new note',
};

export const CreateNoteApiBody = {
  type: CreateNoteRequestDto,
  examples: {
    'Create a note': {
      value: {
        title: 'Title',
        content: 'This is a note',
      },
    },
  },
};

export const CreateNoteApiOkResponse = {
  status: 200,
  description: 'Note created successfully',
  content: {
    'application/json': {
      example: {
        id: 1,
        title: 'Title',
        content: 'This is a note',
      },
    },
  },
};
