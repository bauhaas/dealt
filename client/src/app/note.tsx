import { useNoteContext } from "@/app/NoteContext";
import { useCallback, useEffect, useState } from "react";
import { debounce } from "lodash";
import withAuth from "@/hoc/withAuth";

const Note = () => {
  const { notes, setCurrentNote, currentNote, updateNote, addNote } =
    useNoteContext();
  const [note, setNote] = useState(currentNote);

  useEffect(() => {
    console.log("useffect");
    console.log("currentNote", currentNote);
    setNote(currentNote);
  }, [currentNote]);

  const debouncedUpdateNote = useCallback(
    debounce((updatedNote) => {
      updateNote(updatedNote);
    }, 300), // Adjust the debounce delay as needed
    []
  );

  if (!note) return <div className="w-3/4 p-4">Select a note to edit</div>;

  console.log("rerender");
  return (
    <div className="flex-1 p-6">
      <input
        type="text"
        value={note.title}
        onChange={(e) => {
          const updatedNote = { ...note, title: e.target.value };
          setNote(updatedNote);
          // debouncedUpdateNote(updatedNote);
          updateNote(updatedNote);
        }}
        className="w-full p-2 text-2xl font-bold focus:outline-none focus:ring-0 focus:border-none"
      />
      <textarea
        value={note.content}
        onChange={(e) => {
          const updatedNote = { ...note, content: e.target.value };
          setNote(updatedNote);
          debouncedUpdateNote(updatedNote);
          // updateNote(updatedNote);
        }}
        className="w-full h-full p-2 focus:outline-none focus:ring-0 focus:border-none"
      />
    </div>
  );
};

export default withAuth(Note);
