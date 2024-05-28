export const DeleteNoteApiOperation = {
  summary: "Delete a note by it's ID",
};

export const DeleteNoteApiNoContentResponse = {
  status: 204,
  description: 'Note deleted',
  content: {
    'application/json': {
      example: [],
    },
  },
};
