import { useEffect, useState } from "react";
import { usePlaybackState } from "./PlaybackStateProvider";

interface AnimationFrameSetProps {
    frameStart: string;
    frameCount: number;
    start: number;
    duration: number;
}

export default function AnimationFrameSet({
    frameStart,
    frameCount,
    start,
    duration,
}:AnimationFrameSetProps) {

    const playbackState = usePlaybackState()

    const splitFrames = frameStart.split('.')
    const frameNamespace = splitFrames[0].slice(0, splitFrames[0].length-1)

    let frames = []

    const [isShown, setIsShown] = useState(-1)

    useEffect(() => {
        if(playbackState.currentPlaybackSecond >= start && playbackState.currentPlaybackSecond <= start + duration) {
            const frameIndex = Math.ceil(((playbackState.currentPlaybackSecond - start) / duration) * frameCount)
            setIsShown(frameIndex)
        }
    }, [duration, frameCount, playbackState.currentPlaybackSecond, start])

    for(let i = 1; i <= frameCount; i++) {
        frames.push(<img key={i} src={`${frameNamespace}${i}.${splitFrames[1]}`} height={405} width={720} alt="frame" className="h-full w-full object-cover" style={isShown === i ? {display: 'block'} : {display: 'none'}} />)
    }
    return (
        <picture>
            {frames}
        </picture>
    )
}