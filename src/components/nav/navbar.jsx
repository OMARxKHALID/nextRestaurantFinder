"use client";

import Link from "next/link";
import Profile from "./profile";
import { useSession } from "next-auth/react";
import Image from "next/image";
import LoginForm from "./login";
import { Input } from "@/components/ui/input";

export default function Navbar() {
  return (
    <nav className="w-full flex items-center justify-between">
      <Link
        href="/"
        className="flex items-center font-semibold text-xl space-x-6"
        passHref
      >
        <Image src="/logo.png" alt="logo" width={60} height={60} />
        <h1 className="cursor-pointer">Favourite</h1>
      </Link>
      <div className="hidden md:flex w-full max-w-sm items-center space-x-2">
        <div className="relative w-full">
          <Input placeholder="Search" type="text" />
          <div className="absolute inset-y-0 right-0 flex items-center px-2.5 cursor-pointer">
            <SearchIcon className="h-5 w-5 opacity-60" />
          </div>
        </div>
      </div>
      <div>
        <RenderProfile />
      </div>
    </nav>
  );
}

function RenderProfile() {
  const { data: session, status } = useSession();

  if (typeof window !== "undefined" && status === "loading") return null;

  return session?.user ? <Profile user={session.user} /> : <LoginForm />;
}

function SearchIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
