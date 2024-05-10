"use client";

import { Participant, Track } from "livekit-client";
import { useState, useRef, useEffect } from "react";
import { useEventListener } from "usehooks-ts";
import { useTracks } from "@livekit/components-react";
import FullscreenControl from "./FullscreenControl";
import VolumeControl from "./VolumeControl";

interface LiveVideoProps {
   participant: Participant;
}

export default function LiveVideo({ participant }: LiveVideoProps) {
   const videoRef = useRef<HTMLVideoElement>(null);
   const wrapperRef = useRef<HTMLDivElement>(null);
   const [isFullscreen, setIsFullscreen] = useState(false);
   const [volume, setVolume] = useState(0);

   function onVolumeChange(volume: number) {
      setVolume(+volume);
      if (videoRef.current) {
         videoRef.current.volume = +volume * 0.01;
         videoRef.current.muted = volume === 0;
      }
   }
   function toggleMute() {
      const isMuted = volume === 0;
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
      console.log(volume, videoRef.current?.volume, videoRef.current?.muted);
   }, [volume]);
   function toggleFullscreen() {
      if (isFullscreen) document.exitFullscreen();
      else wrapperRef.current?.requestFullscreen();
   }

   function handleFullscreenChange() {
      const isCurrentlyFullscreen = document.fullscreenElement !== null;
      setIsFullscreen(isCurrentlyFullscreen);
   }
   useEventListener("fullscreenchange", handleFullscreenChange, wrapperRef);

   useTracks([Track.Source.Camera, Track.Source.Microphone])
      .filter((track) => track.participant.identity === participant.identity)
      .forEach((track) => {
         if (videoRef.current)
            track.publication.track?.attach(videoRef.current);
      });
   return (
      <div className=" h-full flex relative" ref={wrapperRef}>
         <video ref={videoRef} width="100%" />
         <div className=" absolute top-0 h-full w-full opacity-0 hover:opacity-100 hover: transition-all">
            <div className=" absolute bottom-0 flex h-14 w-full items-center justify-between bg-gradient-to-r from-neutral-900 px-4">
               <VolumeControl
                  onChange={onVolumeChange}
                  volume={volume}
                  onToggle={toggleMute}
               />
               <FullscreenControl
                  isFullscreen={isFullscreen}
                  onToggle={toggleFullscreen}
               />
            </div>
         </div>
      </div>
   );
}
