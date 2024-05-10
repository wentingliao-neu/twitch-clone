"use client";

import { ChatVariant, useChatSidebar } from "@/store/use-chat-sidebar";
import { MessageSquare, Users } from "lucide-react";
import Hint from "@/components/Hint";
import { Button } from "@/components/ui/button";

export default function VariantToggle() {
   const { variant, onChangeVariant } = useChatSidebar();
   const isChat = variant === ChatVariant.CHAT;
   const Icon = isChat ? Users : MessageSquare;
   function onToggle() {
      const newVariant = isChat ? ChatVariant.COMMUNITY : ChatVariant.CHAT;
      onChangeVariant(newVariant);
   }
   const label = isChat ? "Community" : "Chat";
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
