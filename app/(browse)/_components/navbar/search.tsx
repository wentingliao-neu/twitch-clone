"use client";
import qs from "querystring";
import { useState } from "react";
import { SearchIcon, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const Search = () => {
   const router = useRouter();
   const [value, setValue] = useState<string>("");
   function onSubmit(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault();
      if (!value) return;
      const params = new URLSearchParams({ term: value });
      router.push(`/search?${params.toString()}`);
   }

   return (
      <form
         onSubmit={onSubmit}
         className="relative w-full lg:w-[400px] flex items-center"
      >
         <Input
            onChange={(e) => setValue(e.target.value)}
            value={value}
            placeholder="Search"
            className="rounded-r-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
         />

         <X
            className="absolute top-2.5 right-14 h-5 w-5 text-muted-foreground cursor-pointer hover:opacity-75 transition"
            onClick={() => setValue("")}
         />

         <Button
            type="submit"
            size="sm"
            variant="secondary"
            className="rounded-l-none"
         >
            <SearchIcon className="h-5 w-5 to-muted-foreground" />
         </Button>
      </form>
   );
};
