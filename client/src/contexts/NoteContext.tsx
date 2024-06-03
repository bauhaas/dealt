"use client";

import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { Note } from "@/types/note";
import NotesApiClient from "@/app/api/NotesApiClient";

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

  const { fetchNotes, createNote, updateNoteA, deleteNoteA } = NotesApiClient;

  useEffect(() => {
    const loadNotes = async () => {
      try {
        const notesData = await fetchNotes();
        if (notesData.length > 0) {
          setCurrentNote(notesData[0]);
        }
        setNotes(notesData);
      } catch (error) {} // could add notifications here
    };
    loadNotes();
  }, [fetchNotes]);

  const addNote = async (note: Note) => {
    try {
      const newNote = await createNote(note);
      if (notes) setNotes([...notes, newNote]);
      setCurrentNote(newNote);
    } catch (error) {}
  };

  const updateNote = async (note: Note) => {
    try {
      const updatedNote = await updateNoteA(note);
      setNotes(notes.map((n) => (n.id === note.id ? updatedNote : n)));
      if (currentNote && updatedNote.id === currentNote.id) {
        setCurrentNote(updatedNote);
      }
    } catch (error) {}
  };

  const deleteNote = async (id: string) => {
    try {
      await deleteNoteA(id);
      setNotes(notes.filter((n) => n.id !== id));

      // update currentNote if deletedOne was the one displayed.
      if (currentNote?.id === id) {
        const index = notes.findIndex((n) => n.id === id);
        if (index > 0) {
          setCurrentNote(notes[index - 1]);
        } else {
          setCurrentNote(null);
        }
      }
    } catch (error) {}
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
