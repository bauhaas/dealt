"use client";

import axios from "axios";
import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { getSession } from "next-auth/react";
import { Note } from "./types/note";
import useNotesApi from "@/app/useNotesApi";

interface NoteContextType {
  notes: Note[];
  currentNote: Note | null;
  setCurrentNote: (note: Note | null) => void;
  addNote: (note: Note) => void;
  updateNote: (note: Note) => void;
  deleteNote: (id: string) => void;
}

const NoteContext = createContext<NoteContextType | null>(null);

export const NoteProvider = ({ children }: { children: ReactNode }) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [currentNote, setCurrentNote] = useState<Note | null>(null);
  const { fetchNotes, createNote, updateNoted, deleteNoted } = useNotesApi();

  useEffect(() => {
    const loadNotes = async () => {
      const notesData = await fetchNotes();
      if (notesData.length > 0) {
        setCurrentNote(notesData[0]);
      }
      setNotes(notesData);
    };
    console.log("fectnotes");
    loadNotes();
  }, []);

  const addNote = async (note: Note) => {
    const newNote = await createNote(note);
    setNotes([...notes, newNote]);
    setCurrentNote(newNote);
  };

  const updateNote = async (note: Note) => {
    console.log("update note", note);
    const updatedNote = await updateNoted(note);
    setNotes(notes.map((n) => (n.id === note.id ? updatedNote : n)));
    if (currentNote && updatedNote.id === currentNote.id) {
      console.log(updatedNote);
      setCurrentNote(updatedNote);
    }
  };

  const deleteNote = async (id: string) => {
    await deleteNoted(id);
    setNotes(notes.filter((n) => n.id !== id));
    if (currentNote?.id === id) {
      const index = notes.findIndex((n) => n.id === id);
      if (index > 0) {
        setCurrentNote(notes[index - 1]);
      } else {
        setCurrentNote(null);
      }
    }
  };

  return (
    <NoteContext.Provider
      value={{
        notes,
        currentNote,
        setCurrentNote,
        addNote,
        updateNote,
        deleteNote,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};

export const useNoteContext = () => {
  const context = useContext(NoteContext);
  if (!context) {
    throw new Error("useNoteContext must be used within a NoteProvider");
  }
  return context;
};
