import Button from "@/src/components/Button";
import Image from "next/image";

export default function MainHero() {
    return (
        <div className="min-h-screen w-full container mx-auto relative">
            <div className="absolute top-0 left-0 bottom-0 right-0 grid grid-cols-2 gap-24">
                <div className="h-full flex flex-col justify-center">
                    <div className="font-bold text-7xl leading-tight">We build custom websites to showcase and grow your brand</div>
                    <div className="mt-24">
                        <Button size="large">Schedule a free meeting</Button>
                    </div>
                </div>
                <div>
                    <Image
                        src="/full-set-display-mockup_clay-dark.png"
                        width={1200}
                        height={924}
                        alt="image"
                        className="w-full h-full object-contain"
                    />
                </div>
            </div>
        </div>
    )
}