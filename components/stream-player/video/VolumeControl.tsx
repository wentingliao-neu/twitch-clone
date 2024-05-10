"use client";
import { Volume1, Volume2, VolumeX } from "lucide-react";
import Hint from "@/components/Hint";
import { Slider } from "@/components/ui/slider";

interface VolumeControlProps {
   volume: number;
   onToggle: () => void;
   onChange: (volume: number) => void;
}
export default function VolumeControl({
   volume,
   onToggle,
   onChange,
}: VolumeControlProps) {
   const isMuted = volume === 0;
   const isAboveHalf = volume > 50;
   const Icon = isMuted ? VolumeX : isAboveHalf ? Volume2 : Volume1;
   const label = isMuted ? "Unmute" : "Mute";
   function handleChange(value: number[]) {
      onChange(value[0]);
   }
   return (
      <div className="flex items-center gap-2">
         <Hint label={label} asChild>
            <button
               onClick={onToggle}
               className="text-white p-1.5 hover:bg-white/10 rounded-lg"
            >
               <Icon className=" w-6 h-6" />
            </button>
         </Hint>
         <Slider
            className="w-[8rem] cursor-pointer"
            onValueChange={handleChange}
            value={[volume]}
            max={100}
            step={1}
         />
      </div>
   );
}
