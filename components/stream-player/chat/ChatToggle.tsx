"use client";

import { useChatSidebar } from "@/store/use-chat-sidebar";
import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";
import Hint from "@/components/Hint";
import { Button } from "@/components/ui/button";

export default function ChatToggle() {
   const { collapsed, onExpand, onCollapse } = useChatSidebar();

   const Icon = collapsed ? ArrowLeftFromLine : ArrowRightFromLine;
   function onToggle() {
      if (collapsed) {
         onExpand();
      } else {
         onCollapse();
      }
   }
   const label = collapsed ? "Expand chat" : "Collapse chat";
   return (
      <Hint label={label} side="left" asChild>
         <Button
            onClick={onToggle}
            variant="ghost"
            className=" h-auto p-2 hover:bg-white/10 hover:text-primary bg-transparent"
         >
            <Icon className=" h-4 w-4" />
         </Button>
      </Hint>
   );
}
