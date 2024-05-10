"use client";

import { Button } from "@/components/ui/button";
import { onFollow, onUnfollow } from "@/actions/follow";
import { useTransition } from "react";
import { toast } from "sonner";
import { onBlock, onUnblock } from "@/actions/block";

export default function Actions({
   isFollowing,
   userId,
   isBlocking,
}: {
   isFollowing: boolean;
   userId: string;
   isBlocking: boolean;
}) {
   const [isPending, startTransition] = useTransition();

   function handleFollow() {
      startTransition(() => {
         onFollow(userId)
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

   function handleUnfollow() {
      startTransition(() => {
         onUnfollow(userId)
            .then((data) => {
               toast.success(`You have unfollowed ${data.following.username}`);
            })
            .catch(() => {
               toast.error("Failed to unfollow");
            });
      });
   }

   function handleBlock() {
      startTransition(() => {
         onBlock(userId)
            .then((data) => {
               toast.success(`You have blocked ${data?.blocked.username}`);
            })
            .catch(() => {
               toast.error("Failed to block");
            });
      });
   }

   function handleUnblock() {
      startTransition(() => {
         onUnblock(userId)
            .then((data) => {
               toast.success(`You have unblocked ${data.blocked.username}`);
            })
            .catch(() => {
               toast.error("Failed to unblock");
            });
      });
   }
   return (
      <>
         <Button
            variant="primary"
            onClick={isFollowing ? handleUnfollow : handleFollow}
            disabled={isPending}
         >
            {isFollowing ? "Unfollow" : "Follow"}
         </Button>
         <Button
            onClick={isBlocking ? handleUnblock : handleBlock}
            disabled={isPending}
         >
            {isBlocking ? "Unblock" : "Block"}
         </Button>
      </>
   );
}
