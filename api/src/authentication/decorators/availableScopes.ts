export const Scopes = {
  notes_read: 'Retrieve notes',
  notes_write: 'Create notes',
  notes_delete: 'Delete notes',
};

export type AvailableScope = keyof typeof Scopes;
