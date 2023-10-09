import { Fragment, PropsWithChildren, useEffect, useState } from "react";
import { Transition } from "@headlessui/react";
import { usePlaybackState } from "./PlaybackStateProvider";

interface AnimationBlockProps {
    start: number;
    duration: number;
    variant?: string;
}

export default function AnimationBlock({
    start,
    duration,
    variant='default',
    children
}:PropsWithChildren<AnimationBlockProps>) {

    const playbackState = usePlaybackState()

    const [isMounted, setIsMounted] = useState<boolean>(false)
    useEffect(() => {
        if(playbackState.currentPlaybackSecond >= start && playbackState.currentPlaybackSecond <= start+duration) {
            setIsMounted(true)
        } else {
            setIsMounted(false)
        }
        return(() => {
            setIsMounted(false)
        })
    }, [playbackState.currentPlaybackSecond, duration, start])

    return (
        <Transition
            as={Fragment}
            show={isMounted}
            enter="transition-opacity duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            unmount={false}
        >
            {(ref) => (
                <div ref={ref} className="h-full w-full">
                    {children}
                </div>
            )}
        </Transition>
    )
}