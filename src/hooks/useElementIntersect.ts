import { useEffect, useState, RefObject } from "react"

interface UseElementIntersectProps {
    ref: RefObject<HTMLElement>;
    options?: IntersectionObserverInit;
}

export default function useElementIntersect({
    ref,
    options = {
        root: null,
        rootMargin: '0px',
        threshold: 0,
    }
}:UseElementIntersectProps) {

    const [isIntersecting, setIsIntersecting] = useState<boolean>(false)

    useEffect(() => {

        let cardRefValue:Element | null = null

        function onObserve(entries:Array<IntersectionObserverEntry>) {
            const [entry] = entries
            setIsIntersecting(entry.isIntersecting)
        }

        const observer = new IntersectionObserver(onObserve, options)

        if(ref && ref.current) {
            observer.observe(ref.current)
            cardRefValue = ref.current
        }

        return(() => {
            if(observer) {
                observer.disconnect()
            }
        })

    }, [ref, options])

    return isIntersecting
}