"use client";

import { Sidebar } from "@/app/sidebar";
import { NoteProvider } from "@/app/NoteContext";
import Note from "@/app/note";

export default function Home() {
  return (
    <NoteProvider>
      <div className="flex h-screen">
        <Sidebar />
        <Note />
      </div>
    </NoteProvider>
  );
}
