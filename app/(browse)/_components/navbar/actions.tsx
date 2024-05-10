import Link from "next/link";
import { Clapperboard, Loader } from "lucide-react";

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

export const Actions = async () => {
   const user = await currentUser();
   return (
      <div className="flex items-center justify-end gap-x-2 ml-4 lg:ml-0">
         <ClerkLoading>
            <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
         </ClerkLoading>
         <ClerkLoaded>
            <SignedOut>
               <SignInButton>
                  <Button size="sm" variant="primary">
                     Login
                  </Button>
               </SignInButton>
            </SignedOut>
            <SignedIn>
               <div className="flex items-center gap-x-4">
                  <Button
                     size="sm"
                     variant="ghost"
                     className=" text-muted-foreground hover:text-primary"
                  >
                     <Link href={`/u/${user?.username}`} className="flex">
                        <Clapperboard className="h-5 w-5 lg:mr-2" />
                        <span className="hidden lg:block">Dashboard</span>
                     </Link>
                  </Button>
                  <UserButton afterSignOutUrl="/" />
               </div>
            </SignedIn>
         </ClerkLoaded>
      </div>
   );
};
