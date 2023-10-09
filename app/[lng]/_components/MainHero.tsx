import Button from "@/src/components/Button";
import Image from "next/image";
import Link from "next/link";
import mainScene from "@/public/assets/main-scene.png"
import { Translation } from "@/src/models"
import useT from "@/src/hooks/useT"

interface MainHeroProps {
    lng: string;
    t?: Translation;
}
export default function MainHero({ lng, t }: MainHeroProps) {

    const text = {
        title: useT(t?.MainHero.title),
        cta: useT(t?.MainHero.cta),
        featured_image_alt: useT(t?.MainHero.featured_image_alt)
    }

    return (
        <div className="min-h-screen w-full container mx-auto relative">
            <div className="absolute top-0 left-0 bottom-0 right-0 grid grid-cols-1 lg:grid-cols-2 lg:gap-12 xl:gap-24">
                <div className="relative z-10 h-full container pt-40 pb-32 flex flex-col justify-start lg:justify-center">
                    <h1 className="font-bold text-3xl md:text-5xl xl:text-6xl leading-tight">{text.title}</h1>
                    <div className="mt-12 md:mt-16 lg:mt-24">
                        <Link href="/contact" title={text.cta} passHref legacyBehavior>
                            <Button size="large">{text.cta}</Button>
                        </Link>
                    </div>
                </div>
                <div className="fixed top-72 md:top-1/3 w-11/12 md:w-3/4 left-1/2 -translate-x-1/2 lg:mt-0 lg:left-0 lg:translate-x-0 lg:w-full lg:relative lg:top-0 container flex items-center justify-center">
                    <img
                        priority
                        src={mainScene}
                        alt={text.featured_image_alt}
                        className="w-full h-auto object-contain rounded-lg"
                    />
                    <div className="z-[-1] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 content-[''] rounded-full shadow-primary-800/70 shadow-[0px_0px_50vw_400px]"></div>
                </div>
            </div>
        </div>
    )
}