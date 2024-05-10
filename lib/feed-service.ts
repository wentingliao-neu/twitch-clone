import { getSelf } from "./auth-service";
import { db } from "./db";

export async function getStreams() {
   let userId;
   try {
      const self = await getSelf();
      userId = self.id;
   } catch {
      userId = null;
   }

   let streams = [];
   if (userId)
      streams = await db.stream.findMany({
         where: {
            user: {
               NOT: {
                  blocking: {
                     some: {
                        blockedId: userId,
                     },
                  },
               },
            },
         },
         select: {
            id: true,
            user: true,
            isLive: true,
            name: true,
            thumbnailUrl: true,
         },
         orderBy: [{ isLive: "desc" }, { updateAt: "desc" }],
      });
   else
      streams = await db.stream.findMany({
         select: {
            id: true,
            user: true,
            isLive: true,
            name: true,
            thumbnailUrl: true,
         },
         orderBy: [{ isLive: "desc" }, { updateAt: "desc" }],
      });
   return streams;
}