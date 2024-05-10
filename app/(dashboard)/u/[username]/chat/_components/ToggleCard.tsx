"use client";

import { updateStream } from "@/actions/stream";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { useTransition } from "react";
import { toast } from "sonner";

interface ToggleCardProps {
   label: string;
   value: boolean;
   field: "isChatEnabled" | "isChatDelayed" | "isChatFollowersOnly";
}

export default function ToggleCard({
   label,
   value = false,
   field,
}: ToggleCardProps) {
   const [isPending, startTransition] = useTransition();
   function onChange() {
      startTransition(() => {
         updateStream({ [field]: !value })
            .then(() => {
               toast.success("Chat settings updated");
            })
            .catch(() => {
               toast.error("Failed to update chat settings");
            });
      });
   }
   return (
      <div className=" rounded-xl bg-muted p-6">
         <div className=" flex items-center justify-between">
            <p className=" font-semibold shrink-0">{label}</p>
            <div className=" space-y-2">
               <Switch
                  checked={value}
                  onCheckedChange={onChange}
                  disabled={isPending}
               >
                  {value ? "Enabled" : "Disabled"}
               </Switch>
            </div>
         </div>
      </div>
   );
}

export function ToggleCardSkeleton() {
   return <Skeleton className=" rounded-xl p-10 w-full" />;
}
