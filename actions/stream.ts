"use server";

import { getSelf } from "@/lib/auth-service";
import { db } from "@/lib/db";
import { getStreamByUserId } from "@/lib/stream-service";
import { Stream } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function updateStream(values: Partial<Stream>) {
   try {
      const self = await getSelf();
      const selfStream = await getStreamByUserId(self.id);
      if (!selfStream) throw new Error("Stream not found");

      const validData = {
         name: values.name,
         isChatEnabled: values.isChatEnabled,
         isChatDelayed: values.isChatDelayed,
         isChatFollowersOnly: values.isChatFollowersOnly,
         thumbnailUrl: values.thumbnailUrl,
      };
      const stream = await db.stream.update({
         where: { id: selfStream.id },
         data: validData,
      });
      revalidatePath(`/u/${self.username}/chat`);
      revalidatePath(`/u/${self.username}`);
      revalidatePath(`/${self.username}`);
      return stream;
   } catch {
      throw new Error("Unauthorized");
   }
}
