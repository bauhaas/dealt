"use client";

import { Sidebar } from "@/app/sidebar";
import { NoteProvider } from "@/app/NoteContext";
import Note from "@/app/note";

export default function Home() {
  return (
    <NoteProvider>
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <div className="ml-[20%] h-full flex-1 overflow-hidden">
          <Note />
        </div>
      </div>
    </NoteProvider>
  );
}
