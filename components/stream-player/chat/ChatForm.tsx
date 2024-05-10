"use client";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import ChatInfo from "./ChatInfo";

interface ChatFormProps {
   onSubmit: () => void;
   onChange: (value: string) => void;
   value: string;
   isHidden: boolean;
   isFollowing: boolean;
   isFollowersOnly: boolean;
   isDelayed: boolean;
}
export default function ChatForm({
   onSubmit,
   onChange,
   value,
   isDelayed,
   isFollowersOnly,
   isFollowing,
   isHidden,
}: ChatFormProps) {
   const [isDelayBlocked, setIsDelayBlocked] = useState(false);

   const isFollowersOnlyAndNotFollowing = isFollowersOnly && !isFollowing;
   const isDisabled =
      isHidden || isFollowersOnlyAndNotFollowing || isDelayBlocked;

   function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault();
      e.stopPropagation();
      if (!value || isDisabled) return;
      if (isDelayed && !isDelayBlocked) {
         setIsDelayBlocked(true);
         setTimeout(() => {
            setIsDelayBlocked(false);
            onSubmit();
         }, 3000);
      } else onSubmit();
   }
   if (isHidden) return null;

   return (
      <form
         className=" flex flex-col items-center gap-y-4 p-3"
         onSubmit={handleSubmit}
      >
         <div className=" w-full">
            <ChatInfo isDelayed={isDelayed} isFollowersOnly={isFollowersOnly} />
            <Input
               onChange={(e) => onChange(e.target.value)}
               disabled={isDisabled}
               value={value}
               placeholder="send a message"
               className={cn(
                  " border-white/10",
                  (isFollowersOnly || isDelayed) && " rounded-t-none border-t-0"
               )}
            />
         </div>
         <div className=" ml-auto">
            <Button
               type="submit"
               variant="primary"
               size="sm"
               disabled={isDisabled}
            >
               Chat
            </Button>
         </div>
      </form>
   );
}

export function ChatFormSkeleton() {
   return (
      <div className=" flex flex-col items-center gap-y-4 p-3">
         <Skeleton className=" w-full h-10" />
         <div className=" flex items-center gap-x-2 ml-auto">
            <Skeleton className=" h-7 w-7" />
            <Skeleton className=" h-7 w-12" />
         </div>
      </div>
   );
}
