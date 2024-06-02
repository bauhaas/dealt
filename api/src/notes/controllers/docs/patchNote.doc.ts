import { PatchNoteRequestDto } from 'src/notes/dtos/patchNoteRequest.dto';

export const PatchNoteApiOperation = {
  summary: "Edit a note by it's ID",
};

export const PatchNoteApiBody = {
  type: PatchNoteRequestDto,
  examples: {
    'Edit a notes': {
      value: {
        title: 'New title',
        content: 'This is an edited note',
      },
    },
    'Edit title only': {
      value: {
        title: 'New title',
      },
    },
    'Edit content only': {
      value: {
        content: 'This is an edited note',
      },
    },
  },
};

export const PatchNoteApiOkResponse = {
  status: 200,
  description: 'Note edited successfully',
  content: {
    'application/json': {
      example: {
        id: 1,
        title: 'New title',
        content: 'This is an edited note',
      },
    },
  },
};

export const PatchNoteApiNotFoundResponse = {
  status: 404,
  description: 'Note not found',
  content: {
    'application/json': {
      example: {
        statusCode: 404,
        message: 'NOTE_NOT_FOUND',
        error: 'Not Found',
      },
    },
  },
};

export const PathNoteApiForbiddenResponse = {
  status: 403,
  description: 'Forbidden',
  content: {
    'application/json': {
      example: {
        statusCode: 403,
        message: 'NOTE_ACCESS_FORBIDDEN',
        error: 'Forbidden',
      },
    },
  },
};
