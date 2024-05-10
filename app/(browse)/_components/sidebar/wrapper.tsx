"use client";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/store/use-sidebar";
import { ToggleSkeleton } from "./Toggle";
import { RecommendedSkeleton } from "./Recommended";
import { useIsClient } from "usehooks-ts";
import { FollowingSkeleton } from "./Following";

export default function Wrapper({ children }: { children: React.ReactNode }) {
   const { collapsed } = useSidebar((state) => state);

   //    const [isClient, setIsClient] = useState(false);
   //    useEffect(() => {
   //       setIsClient(true);
   //    }, []);
   const isClient = useIsClient();
   if (!isClient)
      return (
         <aside className="fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-background border-r border-[#2d2e35] z-50">
            <ToggleSkeleton />
            <FollowingSkeleton />
            <RecommendedSkeleton />
         </aside>
      );

   return (
      <aside
         className={cn(
            "fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-background border-r border-[#2d2e35] z-50",
            collapsed && "lg:w-[70px]"
         )}
      >
         {children}
      </aside>
   );
}
