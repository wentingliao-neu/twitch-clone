import { getSelf } from "./auth-service";
import { db } from "./db";

export async function getSearch(term?: string) {
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
            OR: [
               { name: { contains: term } },
               { user: { username: { contains: term } } },
            ],
         },
         select: {
            user: true,
            id: true,
            name: true,
            thumbnailUrl: true,
            isLive: true,
            updateAt: true,
         },
         orderBy: [
            {
               isLive: "desc",
            },
            {
               updateAt: "desc",
            },
         ],
      });
   else
      streams = await db.stream.findMany({
         where: {
            OR: [
               { name: { contains: term } },
               { user: { username: { contains: term } } },
            ],
         },
         select: {
            user: true,
            id: true,
            name: true,
            thumbnailUrl: true,
            isLive: true,
            updateAt: true,
         },
         orderBy: [
            {
               isLive: "desc",
            },
            {
               updateAt: "desc",
            },
         ],
      });
   return streams;
}