"use client";

import NewNoteButton from "@/components/NewNoteButton";
import UserInformation from "@/app/components/UserInformation";
import NotesList from "@/app/components/NotesList";

const Sidebar = () => {
  return (
    <aside className="fixed left-0 top-0 flex h-full w-1/5 flex-col bg-slate-800 p-6">
      <UserInformation />
      <NotesList />
      <NewNoteButton />
    </aside>
  );
};

export default Sidebar;
