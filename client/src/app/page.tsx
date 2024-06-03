"use client";

import Sidebar from "@/app/components/Sidebar";
import Note from "@/app/components/Note";
import { NoteProvider } from "@/contexts/NoteContext";

const Home = () => {
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
};

export default Home;
