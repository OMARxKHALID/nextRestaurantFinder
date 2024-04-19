"use client";

import React, { useTransition } from "react";
import { IoLogoGoogle } from "react-icons/io";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { cn } from "@/lib/utils";

export default function LoginForm() {
  const [isPending, startTransition] = useTransition();
  const handleSignIn = async () => {
    startTransition(async () => {
      await signIn("google");
    });
  };
  return (
    <Button
      variant="outline"
      className="flex items-center gap-2 border p-2 rounded-md border-zinc-400 hover:border-green-500 transition-all px-8 animate-fade"
      onClick={handleSignIn}
    >
      <IoLogoGoogle className={cn({ "animate-spin": isPending })} />
      Login
    </Button>
  );
}
