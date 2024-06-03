import { useEffect, useMemo, useState } from "react";
import { debounce } from "lodash";
import withAuth from "@/hoc/withAuth";
import NewNoteButton from "@/components/NewNoteButton";
import { Note } from "@/types/note";
import { useNoteContext } from "@/contexts/NoteContext";

const Note = () => {
  const { currentNote, updateNote } = useNoteContext();
  const [note, setNote] = useState(currentNote);

  useEffect(() => {
    setNote(currentNote);
  }, [currentNote]);

  const debouncedUpdateNote = useMemo(
    () =>
      debounce((updatedNote: Note) => {
        updateNote(updatedNote);
      }, 300),
    [updateNote],
  );

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!note) return;
    const updatedNote = { ...note, title: e.target.value };
    setNote(updatedNote);
    debouncedUpdateNote(updatedNote);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!note) return;
    const updatedNote = { ...note, content: e.target.value };
    setNote(updatedNote);
    debouncedUpdateNote(updatedNote);
  };

  if (!note)
    return (
      <div className="h-full content-center">
        <div className="flex flex-col items-center space-y-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50">
            No notes yet
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            Click the &quot;New Note&quot; button to create your first note.
          </p>
          <div className="w-fit">
            <NewNoteButton />
          </div>
        </div>
      </div>
    );

  return (
    <div className="h-full flex-1 pl-6">
      <input
        type="text"
        value={note.title}
        onChange={handleTitleChange}
        className="w-full p-2 text-2xl font-bold focus:border-none focus:outline-none focus:ring-0"
      />
      <textarea
        value={note.content}
        onChange={handleContentChange}
        className="h-full w-full p-2 focus:border-none focus:outline-none focus:ring-0"
      />
    </div>
  );
};

export default withAuth(Note);
