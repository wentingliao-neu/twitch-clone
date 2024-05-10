"use client";

import { onFollow, onUnfollow } from "@/actions/follow";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@clerk/nextjs";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

interface ActionsProps {
   isFollowing: boolean;
   isHost: boolean;
   hostIdentity: string;
}
export default function Actions({
   isFollowing,
   isHost,
   hostIdentity,
}: ActionsProps) {
   const { userId } = useAuth();

   const router = useRouter();
   const [isPending, startTransition] = useTransition();
   function toggleFollow() {
      if (!userId) return router.push("/sign-in");
      if (isHost) return;
      if (isFollowing)
         startTransition(() => {
            onUnfollow(hostIdentity)
               .then((data) => {
                  toast.success(
                     `You have unfollowed ${data.following.username}`
                  );
               })
               .catch(() => {
                  toast.error("Failed to unfollow");
               });
         });
      else
         startTransition(() => {
            onFollow(hostIdentity)
               .then((data) => {
                  toast.success(
                     `You are now following ${data.following.username}`
                  );
               })
               .catch(() => {
                  toast.error("Failed to follow");
               });
         });
   }
   return (
      <Button
         onClick={toggleFollow}
         disabled={isPending || isHost}
         variant="primary"
         size="sm"
         className=" w-full lg:w-auto"
      >
         <Heart
            className={cn(
               " h-4 w-4 mr-2",
               isFollowing ? "fill-white" : "fill-none"
            )}
         />
         {isFollowing ? "Unfollow" : "Follow"}
      </Button>
   );
}

export function ActionsSkeleton() {
   return <Skeleton className=" w-full h-10 lg:w-24" />;
}
