"use client";

import { Participant, Track } from "livekit-client";
import { useState, useRef, useEffect } from "react";
import { useEventListener } from "usehooks-ts";
import { useTracks } from "@livekit/components-react";
import FullscreenControl from "./FullscreenControl";
import VolumeControl from "./VolumeControl";
import Hint from "@/components/Hint";
import { Slider } from "@/components/ui/slider";
import { Volume1, Volume2, VolumeX } from "lucide-react";
interface LiveVideoProps {
   participant: Participant;
}

export default function LiveVideo({ participant }: LiveVideoProps) {
   const videoRef = useRef<HTMLVideoElement>(null);
   const wrapperRef = useRef<HTMLDivElement>(null);
   const [isFullscreen, setIsFullscreen] = useState(false);
   const [volume, setVolume] = useState(0);
   const video = document.querySelector("video");

   function onVolumeChange(value: number) {
      setVolume(+value);
      if (videoRef?.current) {
         videoRef.current.volume = +value * 0.01;
         videoRef.current.muted = value === 0;
      }
   }
   function toggleMute() {
      const isMuted = volume === 0;
      console.log(isMuted);
      setVolume(isMuted ? 50 : 0);
      if (videoRef?.current) {
         videoRef.current.muted = !isMuted;
         videoRef.current.volume = isMuted ? 0.5 : 0;
      }
   }
   useEffect(() => {
      onVolumeChange(0);
      console.log(videoRef.current?.volume, videoRef.current?.muted);
   }, []);

   useEffect(() => {
      console.log(
         volume,
         videoRef.current?.volume,
         video?.volume,
         video?.muted
      );
   }, [volume]);

   function toggleFullscreen() {
      if (isFullscreen) document.exitFullscreen();
      else wrapperRef?.current?.requestFullscreen();
   }

   function handleFullscreenChange() {
      setIsFullscreen(document.fullscreenElement !== null);
   }
   useEventListener("fullscreenchange", handleFullscreenChange, wrapperRef);

   useTracks([Track.Source.Camera, Track.Source.Microphone])
      .filter((track) => track.participant.identity === participant.identity)
      .forEach((track) => {
         if (videoRef.current)
            track.publication.track?.attach(videoRef.current);
      });
   return (
      <div className="h-full flex relative" ref={wrapperRef}>
         <video ref={videoRef} width="100%" muted />
         <div className=" absolute top-0 h-full w-full opacity-0 hover:opacity-100 hover: transition-all">
            <div className=" absolute bottom-0 flex h-14 w-full items-center justify-between bg-gradient-to-r from-neutral-900 px-4">
               {/* <VolumeControl
                  onChange={onVolumeChange}
                  volume={volume}
                  onToggle={toggleMute}
               /> */}

               <div className="flex items-center gap-2">
                  <Hint label={volume === 0 ? "Unmute" : "Mute"} asChild>
                     <button
                        onClick={toggleMute}
                        className="text-white p-1.5 hover:bg-white/10 rounded-lg"
                     >
                        {volume === 0 ? (
                           <VolumeX className=" w-6 h-6" />
                        ) : volume > 50 ? (
                           <Volume2 className=" w-6 h-6" />
                        ) : (
                           <Volume1 className=" w-6 h-6" />
                        )}
                     </button>
                  </Hint>
                  <Slider
                     className="w-[8rem] cursor-pointer"
                     onValueChange={(value: number[]) =>
                        onVolumeChange(value[0])
                     }
                     value={[volume]}
                     max={100}
                     step={1}
                  />
               </div>

               <FullscreenControl
                  isFullscreen={isFullscreen}
                  onToggle={toggleFullscreen}
               />
            </div>
         </div>
      </div>
   );
}
