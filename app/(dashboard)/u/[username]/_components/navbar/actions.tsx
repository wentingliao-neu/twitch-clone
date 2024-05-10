import Link from "next/link";
import { Clapperboard, Loader, LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";
import { auth, currentUser } from "@clerk/nextjs/server";
import {
   ClerkLoaded,
   ClerkLoading,
   SignInButton,
   SignedIn,
   SignedOut,
   UserButton,
} from "@clerk/nextjs";

export const Actions = () => {
   return (
      <div className="flex items-center justify-end gap-x-2 ">
         <Button
            size="sm"
            variant="ghost"
            className=" text-muted-foreground hover:text-primary "
            asChild
         >
            <Link href="/">
               <LogOut className=" h-5 w-5 mr-2" />
               Exit
            </Link>
         </Button>
         <UserButton afterSignOutUrl="/" />
      </div>
   );
};
