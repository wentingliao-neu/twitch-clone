"use client";

import { Separator } from "@/components/ui/separator";
import { Pencil } from "lucide-react";
import Image from "next/image";
import InfoModal from "./InfoModal";

interface InfoCardProps {
   hostIdentity: string;
   viewerIdentity: string;
   name: string;
   thumbnailUrl: string | null;
}
export default function InfoCard({
   hostIdentity,
   viewerIdentity,
   name,
   thumbnailUrl,
}: InfoCardProps) {
   const isHost = `host-${hostIdentity}` === viewerIdentity;
   if (!isHost) return null;
   return (
      <div className="px-4">
         <div className=" rounded-xl bg-background">
            <div className=" flex items-center  p-4  justify-between ">
               <div className=" flex items-center  gap-x-2.5">
                  <div className="rounded-md bg-blue-600 p-2 h-auto w-auto ">
                     <Pencil className="h-5 w-5" />
                  </div>
                  <div>
                     <h2 className="text-sm lg:text-lg font-semibold capitalize">
                        Edit your stream info
                     </h2>
                     <p className=" text-muted-foreground text-xs lg:text-sm ">
                        Maxmize your visibility
                     </p>
                  </div>
               </div>
               <InfoModal
                  initialName={name}
                  initialThumbnailUrl={thumbnailUrl}
               />
            </div>

            <Separator />
            <div className=" p-4 lg:p-6 space-y-4">
               <div>
                  <h3 className="text-sm text-muted-foreground mb-2">Name</h3>
                  <p className=" text-sm font-semibold">{name}</p>
               </div>
               <div>
                  <h3 className=" text-sm text-muted-foreground mb-2">
                     Thumbnail
                  </h3>
                  {thumbnailUrl && (
                     <div className=" relative aspect-video rounded-md overflow-hidden w-[200px] border border-white/10">
                        <Image
                           fill
                           src={thumbnailUrl}
                           alt={name}
                           className=" object-cover"
                        />
                     </div>
                  )}
               </div>
            </div>
         </div>
      </div>
   );
}
