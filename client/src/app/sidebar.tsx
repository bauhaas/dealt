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

  return (
    <aside className="min-h-full w-1/5 bg-slate-800 p-6">
      <div className="mb-6 flex items-center space-x-2">
        <Avatar>
          <AvatarFallback>
            {getDisplayFallback(session.data?.user.email)}
          </AvatarFallback>
        </Avatar>
        <span className="no-wrap font-semibold text-white">
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
            } group flex w-full flex-row items-center justify-between rounded bg-slate-800 p-2 hover:bg-slate-600 hover:text-gray-50`}
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
                className="w-full bg-slate-800 px-1 text-white"
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
                        className="text-md text-red-500 focus:text-red-500"
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
          className="w-full justify-start rounded bg-slate-800 p-2 text-center font-bold text-gray-300 hover:bg-slate-600 hover:text-gray-50"
          onClick={() => addNote({ title: "Untitled", content: "" })}
        >
          <PlusIcon className="mr-2 h-6 w-6" />
          New Note
        </Button>
      </ul>
    </aside>
  );
};
