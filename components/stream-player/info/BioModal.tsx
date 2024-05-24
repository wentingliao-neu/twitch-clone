"use client";

import {
   Dialog,
   DialogClose,
   DialogContent,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useRef, useState, useTransition } from "react";

import { updateUser } from "@/actions/user";
import { toast } from "sonner";

interface BioModalProps {
   initialValue: string | null;
}
export default function BioModal({ initialValue }: BioModalProps) {
   const [value, setValue] = useState(initialValue || "");
   const [isPending, startTransition] = useTransition();
   const closeRef = useRef<HTMLButtonElement>(null);

   function onSubmit(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault();
      startTransition(() => {
         updateUser({ bio: value })
            .then(() => {
               toast.success("User bio updated");
               closeRef.current?.click();
            })
            .catch(() => {
               toast.error("Failed to update user bio");
            });
      });
   }
   return (
      <Dialog>
         <DialogTrigger asChild>
            <Button variant="link" size="sm" className=" ml-auto">
               Edit
            </Button>
         </DialogTrigger>
         <DialogContent>
            <DialogHeader>
               <DialogTitle>Edit user bio</DialogTitle>
            </DialogHeader>
            <form onSubmit={onSubmit} className=" space-y-4">
               <Textarea
                  placeholder="user bio"
                  onChange={(e) => {
                     setValue(e.target.value);
                  }}
                  value={value}
                  disabled={isPending}
                  className=" resize-none"
               />
               <div className=" flex justify-between">
                  <DialogClose ref={closeRef}>
                     <Button type="button" variant="ghost">
                        Close
                     </Button>
                  </DialogClose>
                  <Button type="submit" disabled={isPending} variant="primary">
                     Save
                  </Button>
               </div>
            </form>
         </DialogContent>
      </Dialog>
   );
}
