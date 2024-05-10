import { onUnblock } from "@/actions/block";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { toast } from "sonner";

export default function UnblockButton({ userId }: { userId: string }) {
   const [isPending, startTransition] = useTransition();

   function handleUnblock() {
      startTransition(() => {
         onUnblock(userId)
            .then((data) => {
               toast.success(`Unblocked ${data.blocked.username}`);
            })
            .catch(() => {
               toast.error(`Failed to unblock`);
            });
      });
   }
   return (
      <Button
         onClick={handleUnblock}
         disabled={isPending}
         variant="link"
         size="sm"
         className=" text-blue-500 w-full"
      >
         Unblock
      </Button>
   );
}
