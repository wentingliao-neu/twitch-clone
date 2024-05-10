import { getSearch } from "@/lib/search-service";
import ResultCard, { ResultCardSkeleton } from "./ResultCard";
import { Skeleton } from "@/components/ui/skeleton";

export default async function Results({ term }: { term?: string }) {
   const data = await getSearch(term);
   return (
      <div>
         <h2 className=" text-lg font-semibold mb-4">
            Results for term &quot;{term}&quot;
         </h2>
         {data.length === 0 ? (
            <p className=" text-sm text-muted-foreground">
               No results found, Try searching for something else.
            </p>
         ) : (
            <div className=" flex flex-col gap-y-4">
               {data.map((result) => (
                  <ResultCard data={result} key={result.id} />
               ))}
            </div>
         )}
      </div>
   );
}

export function ResultsSkeleton() {
   return (
      <div>
         <Skeleton className=" h-8 w-[290px] mb-4" />
         <div className=" flex flex-col gap-y-4">
            {[1, 2, 3, 4].map((key) => (
               <ResultCardSkeleton key={key} />
            ))}
         </div>
      </div>
   );
}
