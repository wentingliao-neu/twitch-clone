import { db } from "@/lib/db";

export async function getUserByUsername(username: string) {
   const user = await db.user.findUnique({
      where: { username },
      select: {
         id: true,
         username: true,
         bio: true,
         imageUrl: true,
         externalUserId: true,
         stream: {
            select: {
               id: true,
               name: true,
               isLive: true,
               thumbnailUrl: true,
               isChatDelayed: true,
               isChatEnabled: true,
               isChatFollowersOnly: true,
            },
         },
         _count: {
            select: {
               followedBy: true,
            },
         },
      },
   });
   return user;
}

export async function getUserByid(id: string) {
   const user = await db.user.findUnique({
      where: { id },
      include: {
         stream: true,
      },
   });
   return user;
}
