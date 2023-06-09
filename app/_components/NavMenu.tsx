import Button from "@/src/components/Button"
import Image from "next/image"
import Link from "next/link"

export default function NavMenu() {
    return (
        <nav className="fixed top-0 w-full z-10 flex items-center justify-between py-6 px-16">
            <div className="flex items-center gap-32">
                <Image
                    priority
                    src="/logo-main-white.svg"
                    height={64}
                    width={240}
                    alt="msmtech_"
                />
                <div className="flex items-center gap-12 text-xl uppercase">
                    <Link href="/" title="">Solutions</Link>
                    <Link href="/" title="">Blogs</Link>
                    <Link href="/" title="">Contact</Link>
                </div>
            </div>
            <div>
                <Button>Schedule a free meeting</Button>
            </div>
        </nav>
    )
}