"use client";

import { cn } from "@/lib/utils";
import { useCreatorSidebar } from "@/store/use-creator-sidebar";
import { useIsClient } from "usehooks-ts";
import { ToggleSkeleton } from "./Toggle";
import Navigation, { NavigationSkeleton } from "./Navigation";

interface WrapperProps {
   children: React.ReactNode;
}
export default function Wrapper({ children }: WrapperProps) {
   const { collapsed } = useCreatorSidebar((state) => state);

   const isClient = useIsClient();
   if (!isClient)
      return (
         <aside className="fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-background border-r border-[#2d2e35] z-50">
            <ToggleSkeleton />
            <NavigationSkeleton />
         </aside>
      );

   return (
      <aside
         className={cn(
            "fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-background border-r border-[#2d2e35] z-50",
            collapsed && "lg:w-[70px]"
         )}
      >
         {children}
      </aside>
   );
}
