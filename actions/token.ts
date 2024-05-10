"use server";
import { v4 } from "uuid";
import { AccessToken } from "livekit-server-sdk";
import { getUserByid } from "@/lib/user-service";
import { getSelf } from "@/lib/auth-service";
import { isBlockedByUser } from "@/lib/block-service";

export async function createViewerToken(hostIdentity: string) {
   let self;
   try {
      self = await getSelf();
   } catch {
      const id = v4();
      const username = `guest#${Math.floor(Math.random() * 1000)}`;
      self = { id, username };
   }
   const host = await getUserByid(hostIdentity);
   if (!host) throw new Error("Host not found");
   const isBlocked = await isBlockedByUser(host.id);
   if (isBlocked) throw new Error("User is blocked");

   const isHost = self.id === host.id;

   const token = new AccessToken(
      process.env.LIVEKIT_API_KEY,
      process.env.LIVEKIT_API_SECRET,
      { identity: isHost ? `host-${self.id}` : self.id, name: self.username }
   );
   token.addGrant({
      room: host.id,
      canPublish: false,
      roomJoin: true,
      canPublishData: true,
   });

   return await Promise.resolve(token.toJwt());
}
