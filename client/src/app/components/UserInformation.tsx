"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";

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

export default UserInformation;
