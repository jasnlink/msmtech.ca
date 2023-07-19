import { PlaybackState } from "@/app/_components/DiscoveryAnimation";
import { HTMLAttributes, forwardRef, useEffect, useRef } from "react";

interface VideoProps extends HTMLAttributes<HTMLVideoElement> {
    sources: Array<Sources>;
    start: number;
    duration: number;
    playbackState: PlaybackState;
}

interface Sources {
    src: string;
    type: string;
}

export default function Video({sources, start, duration, playbackState, ...props}:VideoProps) {

    const videoRef = useRef<HTMLVideoElement>(null)

    if(videoRef !== null && videoRef.current !== null) {
        videoRef.current.pause()
        let videoDuration = videoRef.current.duration
        if(playbackState.currentPlaybackSecond >= start && playbackState.currentPlaybackSecond <= (start+duration)) {
            let cursor = (playbackState.currentPlaybackSecond - start) / duration
            if(cursor >= 0 && videoDuration) {
                videoRef.current.currentTime = cursor * videoDuration
            } else {
                videoRef.current.currentTime = 0
            }
        }
    }

    return (
        <video preload="auto" autoPlay muted playsInline ref={videoRef} {...props}>
            {sources.map((source, index) => (
                <source key={index} src={source.src} type={source.type} />
            ))}
        </video>
    )
}