"use client";

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
import { Note } from "@/types/note";
import { Ellipsis, Pen, Trash2 } from "lucide-react";
import { useNoteContext } from "@/contexts/NoteContext";

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

export default NoteTooltip;
