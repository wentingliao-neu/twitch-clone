"use client";

import { useViewerToken } from "@/hooks/useViewerToken";
import { Stream, User } from "@prisma/client";
import { LiveKitRoom } from "@livekit/components-react";
import Video, { VideoSkeleton } from "./video/Video";
import { useChatSidebar } from "@/store/use-chat-sidebar";
import { cn } from "@/lib/utils";
import Chat, { ChatSkeleton } from "./chat/Chat";
import ChatToggle from "./chat/ChatToggle";
import Header, { HeaderSkeleton } from "./Header";
import InfoCard from "./InfoCard";
import AboutCard from "./AboutCard";

type CustomStream = {
   id: string;
   name: string;
   thumbnailUrl: string | null;
   isChatEnabled: boolean;
   isChatDelayed: boolean;
   isChatFollowersOnly: boolean;
   isLive: boolean;
};

type CustomUser = {
   id: string;
   username: string;
   bio: string | null;
   stream: CustomStream | null;
   imageUrl: string;
   externalUserId: string;
   _count: {
      followedBy: number;
   };
};
interface StreamPlayerProps {
   user: CustomUser;
   stream: CustomStream;
   isFollowing: boolean;
}

export default function StreamPlayer({
   user,
   stream,
   isFollowing,
}: StreamPlayerProps) {
   const { token, name, identity } = useViewerToken(user.id);
   const { collapsed } = useChatSidebar((state) => state);
   if (!token || !name || !identity) return <StreamPlayerSkeleton />;
   return (
      <>
         {collapsed && (
            <div className="hidden lg:block fixed top-[100px] right-2 z-50">
               <ChatToggle />
            </div>
         )}
         <LiveKitRoom
            token={token}
            serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_WS_URL}
            className={cn(
               "grid grid-cols-1 lg:gap-y-0 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 h-full",
               collapsed && " lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2"
            )}
         >
            <div className="space-y-4 col-span-1 lg:col-span-2 xl:col-span-2 2xl:col-span-5 lg:overflow-y-auto hidden-scrollbar pb-10">
               <Video hostName={user.username} hostIdentity={user.id} />
               <Header
                  hostName={user.username}
                  hostIdentity={user.id}
                  viewerIdentity={identity}
                  imageUrl={user.imageUrl}
                  isFollowing={isFollowing}
                  name={stream.name}
               />

               <InfoCard
                  hostIdentity={user.id}
                  viewerIdentity={identity}
                  name={stream.name}
                  thumbnailUrl={stream.thumbnailUrl}
               />
               <AboutCard
                  hostIdentity={user.id}
                  viewerIdentity={identity}
                  hostName={user.username}
                  bio={user.bio}
                  followerByCount={user._count.followedBy}
               />
            </div>
            <div className={cn("col-span-1", collapsed && "hidden")}>
               <Chat
                  viewerName={name}
                  hostName={user.username}
                  hostIdentity={user.id}
                  isFollowing={isFollowing}
                  isChatEnabled={stream.isChatEnabled}
                  isChatDelayed={stream.isChatDelayed}
                  isChatFollowersOnly={stream.isChatFollowersOnly}
               />
            </div>
         </LiveKitRoom>
      </>
   );
}

export function StreamPlayerSkeleton() {
   return (
      <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 h-full">
         <div className="space-y-4 col-span-1 lg:col-span-2 xl:col-span-2 2xl:col-span-5 lg:overflow-y-auto hidden-scrollbar pb-10">
            <VideoSkeleton />
            <HeaderSkeleton />
         </div>
         <div className="col-span-1 bg-background">
            <ChatSkeleton />
         </div>
      </div>
   );
}
