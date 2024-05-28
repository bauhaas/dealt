"use client";

import { useNoteContext } from "@/app/NoteContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

export const Sidebar = () => {
  const { notes, setCurrentNote, currentNote, addNote } = useNoteContext();

  return (
    <aside className="w-1/4 bg-slate-800 p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Avatar>
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
        <span className="font-semibold text-white">dusername</span>
      </div>
      <ul>
        {notes.map((note) => (
          <li
            key={note.id}
            onClick={() => setCurrentNote(note)}
            className={` ${
              note.id === currentNote?.id ? "bg-slate-500 text-black" : null
            } text-gray-300 hover:text-gray-50 hover:bg-slate-600 rounded p-2 w-full justify-start bg-slate-800`}
          >
            {note.title}
          </li>
        ))}
        <Button
          className=" text-gray-300 font-bold text-center hover:text-gray-50 hover:bg-slate-600 rounded p-2 w-full justify-start bg-slate-800"
          onClick={() => addNote({ title: "Untitled", content: "" })}
        >
          <PlusIcon className="w-6 h-6 mr-2" />
          New Note
        </Button>
      </ul>
    </aside>
  );
};
