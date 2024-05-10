"use client";
import { Button } from "@/components/ui/button";
import {
   Dialog,
   DialogClose,
   DialogContent,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import { IngressInput } from "livekit-server-sdk";
import { ElementRef, useRef, useState, useTransition } from "react";
import { createIngress } from "@/actions/ingress";
import { toast } from "sonner";

const RTMP = String(IngressInput.RTMP_INPUT);
const WHIP = String(IngressInput.WHIP_INPUT);
type IngressType = typeof RTMP | typeof WHIP;

export default function ConnectModal() {
   const closeRef = useRef<HTMLButtonElement>(null);
   const [ingressType, setIngressType] = useState<IngressType>(RTMP);
   const [isPending, startTransition] = useTransition();

   function onSubmit() {
      startTransition(() => {
         createIngress(parseInt(ingressType))
            .then(() => {
               toast.success("Connection generated successfully");
               closeRef.current?.click();
            })
            .catch(() => {
               toast.error("Failed to generate connection");
            });
      });
   }
   return (
      <Dialog>
         <DialogTrigger asChild>
            <Button variant="primary">Generate connection</Button>
         </DialogTrigger>
         <DialogContent>
            <DialogHeader>
               <DialogTitle>Generate Connection</DialogTitle>
            </DialogHeader>
            <Select
               value={ingressType}
               onValueChange={(v) => setIngressType(v)}
            >
               <SelectTrigger className=" w-full">
                  <SelectValue placeholder="Ingress Type" />
               </SelectTrigger>
               <SelectContent>
                  <SelectItem value={RTMP}>RTMP</SelectItem>
                  <SelectItem value={WHIP}>WHIP</SelectItem>
               </SelectContent>
            </Select>
            <Alert>
               <AlertTriangle className=" w-4 h-4" />
               <AlertTitle>Warning</AlertTitle>
               <AlertDescription>
                  This action will reset all active streams using the current
                  connection
               </AlertDescription>
            </Alert>
            <div className="flex justify-between ">
               <DialogClose ref={closeRef} asChild>
                  <Button variant="ghost">Cancel</Button>
               </DialogClose>
               <Button
                  onClick={onSubmit}
                  variant="primary"
                  disabled={isPending}
               >
                  Generate
               </Button>
            </div>
         </DialogContent>
      </Dialog>
   );
}
