"use client";

import HelloWorld from "@/app/helloworld";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Sidebar } from "@/app/sidebar";
import { NoteProvider } from "@/app/NoteContext";
import Note from "@/app/note";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <NoteProvider>
        <div className="flex h-screen">
          <Sidebar />
          <Note />
        </div>
      </NoteProvider>
    </QueryClientProvider>
  );
}
