'use client'
import { useEffect, useRef, useState } from "react"
import useElementOffset from "@/src/hooks/useElementOffset";
import AnimationBlock from "./AnimationBlock";
import AnimationFrameSet from "./AnimationFrameSet";
import PlaybackStateProvider from "./PlaybackStateProvider";
import Button from "@/src/components/Button";
import Link from "next/link";
import { Translation } from "@/src/models"
import useT from "@/src/hooks/useT"

interface AnimationState {
    duration: number;
    trackHeight: number;
    shown: boolean;
}

export interface PlaybackState {
    offset: number;
    currentPlaybackSecond: number;
}

interface DiscoveryAnimationProps {
    lng: string;
    t?: Translation;
}
export default function DiscoveryAnimation({ lng, t }: DiscoveryAnimationProps) {

    const [animationState, setAnimationState] = useState<AnimationState>({
        duration: 0,
        trackHeight: 0,
        shown: false,
    })
    const [playbackState, setPlaybackState] = useState<PlaybackState>({
        offset: 0,
        currentPlaybackSecond: 0,
    })
    const animationTrackRef = useRef<HTMLDivElement>(null)
    const animationTrackTop = useElementOffset({ref: animationTrackRef, property: 'top'})

    const [isShown, setIsShown] = useState(false)

    useEffect(() => {

        if(animationTrackRef.current) {

            const animationDuration = 15000 // Duration in ms
            const windowHeight = window.outerHeight
            const animationTrackHeight = ((animationDuration/1000)*windowHeight)

            // Need to add an extra window's worth of height because we only start the animation after the fully sees the animation screen
            animationTrackRef.current.style.setProperty('min-height', `${animationTrackHeight+windowHeight}px`)

            setAnimationState({
                duration: animationDuration,
                trackHeight: animationTrackHeight,
                shown: false,
            })

            window.removeEventListener('scroll', onScroll)
            window.addEventListener('scroll', onScroll, { passive: true })
        }
        return (() => {
            window.removeEventListener('scroll', onScroll)
        })

        function onScroll() {
            let currentPlaybackSecond = 0
            if(animationTrackTop <= 0) {
                currentPlaybackSecond = Math.abs(((animationTrackTop / animationState.trackHeight) * animationState.duration) / 1000)
                if(isShown === false) {
                    setIsShown(true)
                }
            }
            setPlaybackState({
                offset: animationTrackTop,
                currentPlaybackSecond: currentPlaybackSecond
            })
        }
    }, [animationTrackTop, animationState.trackHeight, animationState.duration, animationState.shown, isShown])

    const animationText = {
        starts_with_discovery: useT(t?.DiscoveryAnimation.AnimationBlock.starts_with_discovery),
        uncover_needs: useT(t?.DiscoveryAnimation.AnimationBlock.uncover_needs),
        ignite_minds: useT(t?.DiscoveryAnimation.AnimationBlock.ignite_minds),
        shape_ideas: useT(t?.DiscoveryAnimation.AnimationBlock.shape_ideas),
        project_life: useT(t?.DiscoveryAnimation.AnimationBlock.project_life),
        rigorous_testing: useT(t?.DiscoveryAnimation.AnimationBlock.rigorous_testing),
        product_ready: useT(t?.DiscoveryAnimation.AnimationBlock.product_ready),
        your_vision: useT(t?.DiscoveryAnimation.AnimationBlock.your_vision),
        pierces_atmosphere: useT(t?.DiscoveryAnimation.AnimationBlock.pierces_atmosphere),
        are_you_ready: useT(t?.DiscoveryAnimation.AnimationBlock.are_you_ready),
        get_started_today: useT(t?.DiscoveryAnimation.AnimationBlock.get_started_today),
    }

    return (
        <>
            <div ref={animationTrackRef} className="relative">
                <div className="sticky top-0 min-h-screen">
                    {playbackState.currentPlaybackSecond > 0 || isShown === true ? (
                        <PlaybackStateProvider playbackState={playbackState}>
                            <AnimationBlock
                                start={0.3}
                                duration={0.8}
                            >
                                <div className="container absolute left-1/2 -translate-x-1/2 top-1/4 -translate-y-1/2 w-full text-center text-2xl lg:text-4xl font-bold">
                                    <div>{animationText.starts_with_discovery}</div>
                                </div>
                            </AnimationBlock>
                            <AnimationBlock
                                start={1.3}
                                duration={0.8}
                            >
                                <div className="container absolute left-1/2 -translate-x-1/2 top-1/4 -translate-y-1/2 w-full text-center text-2xl lg:text-4xl font-bold">
                                    <div>{animationText.uncover_needs}</div>
                                </div>
                            </AnimationBlock>
                            <AnimationBlock
                                start={0.6}
                                duration={2}
                            >
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 content-[''] rounded-full shadow-white/20 shadow-[0px_0px_100px_100px]"></div>
                            </AnimationBlock>
                            <AnimationBlock
                                start={2.3}
                                duration={3}
                            >
                                <div className="absolute top-0 left-0 bottom-0 right-0">
                                    <AnimationFrameSet
                                        frameStart="/assets/frameset1/1.jpg"
                                        frameCount={74}
                                        start={2.3}
                                        duration={3}
                                    />
                                </div>
                            </AnimationBlock>
                            <AnimationBlock
                                start={2.5}
                                duration={2}
                            >
                                <div className="container absolute left-1/2 -translate-x-1/2 top-1/4 -translate-y-1/2 w-full text-center text-2xl lg:text-4xl font-bold">
                                    <div>{animationText.ignite_minds}</div>
                                    <div>{animationText.shape_ideas}</div>
                                </div>
                            </AnimationBlock>
                            <AnimationBlock
                                start={5}
                                duration={3}
                            >
                                <div className="absolute top-0 left-0 bottom-0 right-0">
                                    <AnimationFrameSet
                                        frameStart="/assets/frameset2/1.jpg"
                                        frameCount={58}
                                        start={5}
                                        duration={3}
                                    />
                                </div>
                            </AnimationBlock>
                            <AnimationBlock
                                start={5.3}
                                duration={2}
                            >
                                <div className="container absolute left-1/2 -translate-x-1/2 top-1/4 -translate-y-1/2 w-full text-center text-2xl lg:text-4xl font-bold mix-blend-difference">
                                    <div>{animationText.project_life}</div>
                                </div>
                            </AnimationBlock>
                            <AnimationBlock
                                start={7.7}
                                duration={3}
                            >
                                <div className="absolute top-0 left-0 bottom-0 right-0">
                                    <AnimationFrameSet
                                        frameStart="/assets/frameset3/1.jpg"
                                        frameCount={107}
                                        start={7.7}
                                        duration={3}
                                    />
                                </div>
                            </AnimationBlock>
                            <AnimationBlock
                                start={8}
                                duration={2}
                            >
                                <div className="container absolute left-1/2 -translate-x-1/2 top-1/4 -translate-y-1/2 w-full text-center text-2xl lg:text-4xl font-bold">
                                    <div>{animationText.rigorous_testing}</div>
                                    <div>{animationText.product_ready}</div>
                                </div>
                            </AnimationBlock>
                            <AnimationBlock
                                start={10.4}
                                duration={3}
                            >
                                <div className="absolute top-0 left-0 bottom-0 right-0">
                                    <AnimationFrameSet
                                        frameStart="/assets/frameset4/1.jpg"
                                        frameCount={78}
                                        start={10.4}
                                        duration={3}
                                    />
                                </div>
                            </AnimationBlock>
                            <AnimationBlock
                                start={10.7}
                                duration={2}
                            >
                                <div className="container absolute left-1/2 -translate-x-1/2 top-1/4 -translate-y-1/2 w-full text-center text-2xl lg:text-4xl font-bold">
                                    <div>{animationText.your_vision}</div>
                                    <div>{animationText.pierces_atmosphere}</div>
                                </div>
                            </AnimationBlock>
                            <AnimationBlock
                                start={13.7}
                                duration={5}
                            >
                                <div className="container absolute left-1/2 -translate-x-1/2 top-1/3 -translate-y-1/2 w-full text-center text-5xl lg:text-6xl font-bold">
                                    <div>{animationText.are_you_ready}</div>
                                </div>
                            </AnimationBlock>
                            <AnimationBlock
                                start={14.3}
                                duration={5}
                            >
                                <div className="z-[-1] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 content-[''] rounded-full shadow-primary/25 shadow-[0px_0px_50vw_200px]"></div>
                                <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-center text-center text-5xl lg:text-6xl font-bold">
                                    <Link href={`/${lng}/contact`} title={animationText.get_started_today} passHref legacyBehavior>
                                        <Button size="large">{animationText.get_started_today}</Button>
                                    </Link>
                                </div>
                            </AnimationBlock>
                        </PlaybackStateProvider>
                    ) : null}
                </div>
            </div>
        </>
    )
}