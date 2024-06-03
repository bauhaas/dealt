"use client";

import { useNoteContext } from "@/contexts/NoteContext";
import { useRef, useState } from "react";
import { Note } from "@/types/note";
import NoteTooltip from "@/app/components/NoteToolTip";

const NotesList = () => {
  const { notes, currentNote, setCurrentNote, updateNote } = useNoteContext();

  const [editNoteId, setEditNoteId] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState("");

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleRename = (noteId: string, title: string) => {
    setEditNoteId(noteId);
    setNewTitle(title);

    setTimeout(() => {
      inputRef.current?.focus();
      const len = inputRef.current?.value.length;
      inputRef.current?.setSelectionRange(len || 0, len || 0);
    }, 0);
  };

  const handleRenameSubmit = (noteId: string) => {
    updateNote({
      ...notes.find((note) => note.id === noteId)!,
      title: newTitle,
    });
    setEditNoteId(null);
  };

  return (
    <ul className="overflow-auto">
      {notes.map((note: Note) => (
        <li
          key={note.id}
          onClick={() => {
            setCurrentNote(note);
          }}
          className={` ${
            note.id === currentNote?.id
              ? "bg-slate-500 text-black"
              : "bg-slate-800 text-gray-300"
          } group flex w-full cursor-pointer flex-row items-center justify-between rounded p-2 hover:bg-slate-600 hover:text-gray-50`}
        >
          {editNoteId === note.id ? (
            <input
              ref={inputRef}
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              onBlur={() => handleRenameSubmit(note.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleRenameSubmit(note.id);
                }
              }}
              className="w-full bg-slate-800 px-1 text-white"
            />
          ) : (
            <p className="truncate">{note.title}</p>
          )}
          <NoteTooltip note={note} handleRename={handleRename} />
        </li>
      ))}
    </ul>
  );
};

export default NotesList;
