import { Note } from "@/types/note";
import axios, { AxiosRequestConfig } from "axios";
import { getSession } from "next-auth/react";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

const withAuth = async (
  config: AxiosRequestConfig = {},
): Promise<AxiosRequestConfig> => {
  const session = await getSession();
  if (!session) {
    throw new Error("No session found");
  }
  return {
    ...config,
    headers: {
      ...config.headers,
      Authorization: `Bearer ${session.user.token}`,
    },
  };
};
const fetchNotes = async (): Promise<Note[]> => {
  const config = await withAuth();
  const response = await apiClient.get("/notes", config);
  return response.data;
};

const createNote = async (note: Note): Promise<Note> => {
  const config = await withAuth();
  const response = await apiClient.post("/notes", note, config);
  return response.data;
};

const updateNoteA = async (note: Note): Promise<Note> => {
  const config = await withAuth();
  const response = await apiClient.patch(`/notes/${note.id}`, note, config);
  return response.data;
};

const deleteNoteA = async (id: string): Promise<void> => {
  const config = await withAuth();
  await apiClient.delete(`/notes/${id}`, config);
};

const NotesApiClient = {
  fetchNotes,
  createNote,
  updateNoteA,
  deleteNoteA,
};

export default NotesApiClient;
