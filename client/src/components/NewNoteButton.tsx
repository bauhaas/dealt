"use client";

import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useNoteContext } from "@/contexts/NoteContext";

const NewNoteButton = () => {
  const { addNote, notes } = useNoteContext();

  const handleOnClick = () => {
    addNote({
      title: "Untitled",
      content: "",
    });
  };

  return (
    <Button
      className={` ${notes.length === 0 ? "animate-pulse bg-slate-600" : "bg-slate-800"} mt-2 w-full justify-start rounded p-2 text-center font-bold text-gray-300 hover:bg-slate-600 hover:text-gray-50`}
      onClick={handleOnClick}
    >
      <PlusIcon className="mr-2 h-6 w-6" />
      New Note
    </Button>
  );
};

export default NewNoteButton;
