"use client";

import Hint from "@/components/Hint";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useSidebar } from "@/store/use-sidebar";
import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";

export default function Toggle() {
   const { collapsed, onCollapse, onExpand } = useSidebar((state) => state);
   return (
      <>
         {collapsed ? (
            <div className="hidden lg:flex w-full items-center justify-center mb-4 pt-4">
               <Hint label="Expand" side="right" asChild>
                  <Button
                     className="h-auto p-2 ml-auto"
                     variant="ghost"
                     onClick={onExpand}
                  >
                     <ArrowRightFromLine className="h-4 w-4" />
                  </Button>
               </Hint>
            </div>
         ) : (
            <div className="p-3 pl-6 mb-2 flex items-center w-full">
               <p className="font-semibold text-primary">For you</p>

               <Hint label="collapse" side="right" asChild>
                  <Button
                     className="h-auto p-2 ml-auto"
                     variant="ghost"
                     onClick={onCollapse}
                  >
                     <ArrowLeftFromLine className="h-4 w-4" />
                  </Button>
               </Hint>
            </div>
         )}
      </>
   );
}

export function ToggleSkeleton() {
   return (
      <div className="p-3 pl-6 mb-2 hidden lg:flex items-center justify-between w-full">
         <Skeleton className=" h-6 w-[100px]" />
         <Skeleton className=" h-6 w-6" />
      </div>
   );
}
