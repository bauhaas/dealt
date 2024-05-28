import { Note } from "@/app/types/note";
import axios from "axios";
import { getSession } from "next-auth/react";

const useNotesApi = () => {
  const fetchNotes = async (): Promise<Note[]> => {
    console.log("fetchNotes");
    const session = await getSession();
    if (!session) {
      throw new Error("Session or access token is missing");
    }
    const response = await axios.get("http://localhost:3001/notes", {
      headers: {
        Authorization: `Bearer ${session.user.token}`,
      },
    });
    return response.data;
  };

  const createNote = async (note: Note): Promise<Note> => {
    console.log("createNote");
    const session = await getSession();
    if (!session) {
      throw new Error("Session or access token is missing");
    }
    const response = await axios.post("http://localhost:3001/notes", note, {
      headers: {
        Authorization: `Bearer ${session.user.token}`,
      },
    });
    return response.data;
  };

  const updateNoted = async (note: Note): Promise<Note> => {
    const session = await getSession();
    if (!session) {
      throw new Error("Session or access token is missing");
    }
    const response = await axios.put(
      `http://localhost:3001/notes/${note.id}`,
      note,
      {
        headers: {
          Authorization: `Bearer ${session.user.token}`,
        },
      }
    );
    return response.data;
  };

  const deleteNoted = async (id: string): Promise<void> => {
    const session = await getSession();
    if (!session) {
      throw new Error("Session or access token is missing");
    }
    await axios.delete(`http://localhost:3001/notes/${id}`, {
      headers: {
        Authorization: `Bearer ${session.user.token}`,
      },
    });
  };

  return { fetchNotes, createNote, updateNoted, deleteNoted };
};

export default useNotesApi;
