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
import { Label } from "@/components/ui/label";
import {
   useState,
   useTransition,
   useRef,
   ElementRef,
   SetStateAction,
} from "react";
import { Input } from "@/components/ui/input";

import { UploadDropzone } from "@/lib/uploadthing";

import { updateStream } from "@/actions/stream";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Hint from "../../Hint";
import { Trash } from "lucide-react";
import Image from "next/image";

interface InfoModalProps {
   initialName: string;
   initialThumbnailUrl: string | null;
}
export default function InfoModal({
   initialName,
   initialThumbnailUrl,
}: InfoModalProps) {
   const [name, setName] = useState(initialName);
   const [thumbnailUrl, setThumbnailUrl] = useState(initialThumbnailUrl);
   const [isPending, startTransition] = useTransition();
   const router = useRouter();
   const closeRef = useRef<HTMLButtonElement>(null);

   function onSubmit(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault();
      startTransition(() => {
         updateStream({ name })
            .then(() => {
               toast.success("Stream info updated");
               closeRef.current?.click();
            })
            .catch(() => {
               toast.error("Failed to update stream info");
            });
      });
   }

   function onRemoveThumbnail() {
      startTransition(() => {
         updateStream({ thumbnailUrl: null })
            .then(() => {
               toast.success("Thumbnail removed");
               setThumbnailUrl("");
               closeRef.current?.click();
            })
            .catch(() => {
               toast.error("Failed to remove thumbnail");
            });
      });
   }

   return (
      <Dialog>
         <DialogTrigger>
            <Button variant="link" size="sm" className="ml-auto  mr-6">
               Edit
            </Button>
         </DialogTrigger>
         <DialogContent>
            <DialogHeader>
               <DialogTitle>Edit stream info</DialogTitle>
            </DialogHeader>
            <form className=" space-y-14" onSubmit={onSubmit}>
               <div className=" space-y-2">
                  <Label>Name</Label>
                  <Input
                     placeholder="Stream name"
                     onChange={(e) => setName(e.target.value)}
                     value={name}
                     disabled={isPending}
                  />
               </div>
               <div className="space-y-2">
                  <Label>Thumbnail</Label>
                  {thumbnailUrl ? (
                     <div className=" relative aspect-video rounded-xl overflow-hidden border-white/10">
                        <div className=" absolute top-2 ring-2 z-[10]">
                           <Hint label="Remove thumbnail" asChild side="right">
                              <Button
                                 type="button"
                                 disabled={isPending}
                                 className=" h-auto w-auto p-1.5"
                                 onClick={onRemoveThumbnail}
                              >
                                 <Trash className="h-4 w-4" />
                              </Button>
                           </Hint>
                        </div>
                        <Image
                           src={thumbnailUrl}
                           alt="thumbnail"
                           fill
                           className=" object-cover"
                        />
                     </div>
                  ) : (
                     <div className=" rounded-xl border outline-dashed outline-muted">
                        <UploadDropzone
                           endpoint="thumbnailUploader"
                           appearance={{
                              label: { color: "#fff" },
                              allowedContent: { color: "#fff" },
                           }}
                           onClientUploadComplete={(res) => {
                              setThumbnailUrl(res?.[0]?.url);
                              router.refresh();
                              closeRef.current?.click();
                           }}
                        />
                     </div>
                  )}
               </div>
               <div className=" flex justify-between">
                  <DialogClose asChild ref={closeRef}>
                     <Button variant="ghost" type="button">
                        Cancel
                     </Button>
                  </DialogClose>
                  <Button variant="primary" type="submit" disabled={isPending}>
                     Save
                  </Button>
               </div>
            </form>
         </DialogContent>
      </Dialog>
   );
}
