"use client";

import { useNoteContext } from "@/app/NoteContext";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
import { NewNoteButton } from "@/components/NewNoteButton";

export const Sidebar = () => {
  return (
    <aside className="fixed left-0 top-0 flex h-full w-1/5 flex-col bg-slate-800 p-6">
      <UserInformation />
      <NotesList />
      <NewNoteButton />
    </aside>
  );
};

const UserInformation = () => {
  const session = useSession();

  const getDisplayFallback = (name: string) => {
    if (name)
      return name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase();
  };

  return (
    <div className="mb-6 flex items-center space-x-2">
      <Avatar>
        <AvatarFallback>
          {getDisplayFallback(session.data?.user.email)}
        </AvatarFallback>
      </Avatar>
      <span className="no-wrap truncate font-semibold text-white">
        {session.data?.user.email}
      </span>
    </div>
  );
};

const NotesList = () => {
  const { notes, currentNote, setCurrentNote, updateNote } = useNoteContext();

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

  return (
    <ul className="overflow-auto">
      {notes.map((note: Note) => (
        <li
          key={note.id}
          onClick={() => {
            setCurrentNote(note);
          }}
          className={` ${
            note.id === currentNote?.id
              ? "bg-slate-500 text-black"
              : "bg-slate-800 text-gray-300"
          } group flex w-full flex-row items-center justify-between rounded p-2 hover:bg-slate-600 hover:text-gray-50`}
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
          <NoteTooltip note={note} handleRename={handleRename} />
        </li>
      ))}
    </ul>
  );
};

interface NoteTooltipProps {
  note: Note;
  handleRename: (noteId: string, title: string) => void;
}

const NoteTooltip = ({ note, handleRename }: NoteTooltipProps) => {
  const { deleteNote } = useNoteContext();

  return (
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
  );
};
