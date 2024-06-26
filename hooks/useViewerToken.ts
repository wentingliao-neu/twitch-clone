import { toast } from "sonner";
import { useEffect, useState } from "react";
import { createViewerToken } from "@/actions/token";
import { jwtDecode, JwtPayload } from "jwt-decode";

export function useViewerToken(hostIdentity: string) {
   const [token, setToken] = useState<string>("");
   const [name, setName] = useState<string>("");
   const [identity, setIdentity] = useState<string>("");
   useEffect(() => {
      const createToken = async () => {
         try {
            const viewerToken = await createViewerToken(hostIdentity);
            setToken(viewerToken);
            const decodedToken = jwtDecode(viewerToken) as JwtPayload & {
               name?: string;
            };

            const name = decodedToken?.name;
            const identity = decodedToken.sub;
            if (identity) setIdentity(identity);
            if (name) setName(name);
         } catch {
            toast.error("Failed to create token");
         }
      };
      createToken();
   }, [hostIdentity]);
   return { token, name, identity };
}
