"use client";
import React, { useTransition } from "react";
import { LockOpen1Icon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function Logout() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleLogout = async () => {
    startTransition(async () => {
      await signOut();
      router.refresh();
    });
  };

  return (
    <Button
      className="w-full flex items-center justify-between rounded-none "
      variant="ghost"
      onClick={handleLogout}
    >
      Logout <LockOpen1Icon className={cn({ "animate-spin": isPending })} />
    </Button>
  );
}
