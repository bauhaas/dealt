import { useNoteContext } from "@/app/NoteContext";
import { useEffect, useMemo, useState } from "react";
import { debounce } from "lodash";
import withAuth from "@/hoc/withAuth";

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

  if (!note) return <div className="w-3/4 p-4">Select a note to edit</div>;

  console.log("rerender");
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
