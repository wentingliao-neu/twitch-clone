"use client";

import VerifiedMark from "../../VerifiedMark";
import BioModal from "./BioModal";

interface AboutCardProps {
   hostIdentity: string;
   viewerIdentity: string;
   hostName: string;
   bio: string | null;
   followerByCount: number;
}

export default function AboutCard({
   hostIdentity,
   viewerIdentity,
   hostName,
   bio,
   followerByCount,
}: AboutCardProps) {
   const isHost = `host-${hostIdentity}` === viewerIdentity;
   const followedByLabel = followerByCount === 1 ? "follower" : "followers";

   return (
      <div className=" px-4">
         <div className=" group rounded-xl bg-background p-6 lg:p-10 flex flex-col gap-y-3">
            <div className=" flex items-center justify-between">
               <div className=" flex items-center gap-x-2 font-semibold text-lg lg:text-2xl">
                  About {hostName}
                  <VerifiedMark />
               </div>
               {isHost && <BioModal initialValue={bio} />}
            </div>
            <div className=" text-sm text-muted-foreground ">
               <span className=" font-semibold text-primary">
                  {followerByCount}
               </span>{" "}
               {followedByLabel}
            </div>
            <p className=" text-sm"> {bio || "Nothing about the user"}</p>
         </div>
      </div>
   );
}
