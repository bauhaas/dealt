"use client";

import { useNoteContext } from "@/app/NoteContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Ellipsis, Pen, PlusIcon, Trash2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRef, useState } from "react";
import { Note } from "@/app/types/note";
import { useSession } from "next-auth/react";

export const Sidebar = () => {
  const {
    notes,
    setCurrentNote,
    currentNote,
    addNote,
    deleteNote,
    updateNote,
  } = useNoteContext();

  const session = useSession();
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

  const getDisplayFallback = (name: string) => {
    if (name)
      return name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase();
  };

  console.log("render sidebar");
  console.log(session);
  return (
    <aside className="w-1/5 bg-slate-800 p-6 min-h-full">
      <div className="flex items-center space-x-2 mb-6">
        <Avatar>
          <AvatarFallback>
            {getDisplayFallback(session.data?.user.email)}
          </AvatarFallback>
        </Avatar>
        <span className="font-semibold text-white no-wrap">
          {session.data?.user.email}
        </span>
      </div>
      <ul>
        {notes.map((note: Note) => (
          <li
            key={note.id}
            onClick={() => {
              setCurrentNote(note);
            }}
            className={` ${
              note.id === currentNote?.id
                ? "bg-slate-500 text-black"
                : "text-gray-300"
            } group flex flex-row justify-between items-center  hover:text-gray-50 hover:bg-slate-600 rounded p-2 w-full  bg-slate-800`}
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
                className="w-full  bg-slate-800 text-white px-1"
              />
            ) : (
              <p className="truncate">{note.title}</p>
            )}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="invisible group-hover:visible">
                      <Ellipsis />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRename(note.id, note.title);
                        }}
                        className="text-md"
                      >
                        <Pen /> Rename
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation();
                          if (note.id) {
                            deleteNote(note.id);
                          }
                        }}
                        className="text-red-500 text-md focus:text-red-500"
                      >
                        <Trash2 /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Options</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
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
