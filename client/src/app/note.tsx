import { useNoteContext } from "@/app/NoteContext";
import { useEffect, useState } from "react";

const Note = () => {
  const { notes, setCurrentNote, currentNote, updateNote, addNote } =
    useNoteContext();
  const [note, setNote] = useState(currentNote);

  useEffect(() => {
    // If there's no current note but there are notes available, set the first note as the current note
    if (!currentNote && notes.length > 0) {
      setCurrentNote(notes[0]);
    }
    setNote(currentNote);
  }, [currentNote, notes]);

  if (!note) return <div className="w-3/4 p-4">Select a note to edit</div>;

  return (
    <div className="flex-1 p-6">
      <input
        type="text"
        value={note.title}
        onChange={(e) => {
          setNote({ ...note, title: e.target.value });
          updateNote(note);
        }}
        className="w-full p-2 text-2xl font-bold focus:outline-none focus:ring-0 focus:border-none"
      />
      <textarea
        value={note.content}
        onChange={(e) => {
          setNote({ ...note, content: e.target.value });
          updateNote(note);
        }}
        className="w-full h-full p-2 focus:outline-none focus:ring-0 focus:border-none"
      />
    </div>
  );
};

export default Note;
