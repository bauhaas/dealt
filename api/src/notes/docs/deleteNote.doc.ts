export const DeleteNoteApiOperation = {
  summary: "Delete a note by it's ID",
};

export const DeleteNoteApiNoContentResponse = {
  status: 204,
  description: 'Note deleted',
};
export const DeleteNoteApiForbiddenResponse = {
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
