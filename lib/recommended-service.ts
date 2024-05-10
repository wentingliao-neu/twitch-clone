import { db } from "./db";
import { getSelf } from "./auth-service";

export async function getRecommended() {
   let userId;
   try {
      const self = await getSelf();
      userId = self.id;
   } catch (e) {
      userId = null;
   }
   let users;
   if (userId)
      users = await db.user.findMany({
         where: {
            AND: [
               { NOT: { id: userId } },
               { NOT: { followedBy: { some: { followerId: userId } } } },
               { NOT: { blocking: { some: { blockedId: userId } } } },
            ],
         },
         orderBy: { createAt: "desc" },
         include: {
            stream: {
               select: {
                  isLive: true,
               },
            },
         },
      });
   else
      users = await db.user.findMany({
         orderBy: { createAt: "desc" },
         include: {
            stream: {
               select: {
                  isLive: true,
               },
            },
         },
      });

   return users;
}
