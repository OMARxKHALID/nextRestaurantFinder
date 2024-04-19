import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import Logout from "./logout";

export default function Profile({ user }) {
  return (
    <>
      <Popover>
        <PopoverTrigger asChild id="close-popover">
          <Image
            src={user?.image || "/avatar.jpeg"}
            width={50}
            height={50}
            alt={user?.name}
            className="rounded-full ring-green-500 ring cursor-pointer hover:scale-105 transition-all animate-fade"
          />
        </PopoverTrigger>
        <PopoverContent className="w-48" align="end">
          <Logout />
        </PopoverContent>
      </Popover>
    </>
  );
}
