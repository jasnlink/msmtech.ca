'use client'
import { useEffect, useRef, useState } from "react"

export default function DiscoveryAnimation() {

    const [offset, setOffset] = useState<number>(0)
    const animationTrackRef = useRef<HTMLDivElement>(null)

    useEffect(() => {

        if(animationTrackRef.current) {

            const animationDuration = 7000
            const animationTrackHeight = (animationDuration/1000)*100
            const animationTrackTop = animationTrackRef.current.getBoundingClientRect()

            animationTrackRef.current.style.setProperty('min-height', `${animationTrackHeight}vh`)
            setOffset(animationTrackTop.top)

            window.removeEventListener('scroll', onScroll)
            window.addEventListener('scroll', onScroll, { passive: true })
        }
        return (() => {
            window.removeEventListener('scroll', onScroll)
        })

        function onScroll() {
            if(animationTrackRef.current) {
                const animationTrackTop = animationTrackRef.current.getBoundingClientRect()
                setOffset(animationTrackTop.top)
            }
        }
    }, [])

    return (
        <div ref={animationTrackRef} className="relative">
            <div className="sticky top-0 min-h-screen">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xl font-bold">{offset}</div>
            </div>
        </div>
    )
}