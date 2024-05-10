import { getBlockedUsers } from "@/lib/block-service";
import { DataTable } from "./_components/DataTable";
import { columns } from "./_components/columns";
import { format } from "date-fns";

export default async function CommunityPage() {
   const blockedUsers = await getBlockedUsers();
   const formattedData = blockedUsers.map((block) => ({
      ...block,
      userId: block.blocked.id,
      username: block.blocked.username,
      imageUrl: block.blocked.imageUrl,
      createAt: format(new Date(block.blocked.createAt), "dd/MM/yyyy"),
   }));
   return (
      <div className=" p-6 ">
         <div className=" mb-4">
            <h1 className="  text-2xl font-bold">Community Settings</h1>
         </div>
         <DataTable columns={columns} data={formattedData} />
      </div>
   );
}
