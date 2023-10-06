import Link from "next/link"
import Image from "next/image"
import Text from "@/src/components/Text"
import { NavigationItem } from "./NavMenu"

export default function Footer() {

    const footerNavigationItems1: Array<NavigationItem> = [
        {
            id: `0`,
            featuredImage: null,
            title: `Solutions`,
            description: null,
            url: `/solutions`,
            children: []
        },
        {
            id: `1`,
            featuredImage: null,
            title: `Contact`,
            description: null,
            url: `/contact`,
            children: []
        },
        {
            id: `2`,
            featuredImage: null,
            title: `Case Studies`,
            description: null,
            url: `/blogs/case-studies`,
            children: []
        },
        {
            id: `3`,
            featuredImage: null,
            title: `Services`,
            description: null,
            url: `/blogs/services`,
            children: []
        },
    ]

    const footerNavigationItems2: Array<NavigationItem> = [
        {
            id: `0`,
            featuredImage: null,
            title: `Business Technology Articles`,
            description: null,
            url: `/blogs/business-technology-articles`,
            children: []
        },
        {
            id: `1`,
            featuredImage: null,
            title: `Technology Guides`,
            description: null,
            url: `/blogs/technology-guides`,
            children: []
        },
        {
            id: `2`,
            featuredImage: null,
            title: `Privacy policy`,
            description: null,
            url: `/privacy-policy`,
            children: []
        },
        {
            id: `3`,
            featuredImage: null,
            title: `Terms of service`,
            description: null,
            url: `/terms-of-service`,
            children: []
        }
    ]

    interface SocialLink {
        id: string;
        icon: string;
        title: string;
        url: string;
    }

    const footerSocialLinks: Array<SocialLink> = [
        {
            id: `0`,
            icon: `/socials/linkedin.svg`,
            title: `LinkedIn`,
            url: `https://www.linkedin.com/company/msm-tech/`
        },
        {
            id: `1`,
            icon: `/socials/x.svg`,
            title: `X`,
            url: `https://x.com/msmtech_`
        },
        {
            id: `2`,
            icon: `/socials/facebook.svg`,
            title: `Facebook`,
            url: `https://www.facebook.com/msmtechologies`
        }
    ]

    return (
        <footer className="pt-24 pb-2 border-t border-t-zinc-800 bg-gradient-to-br from-black to-zinc-950 opacity-90">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-60 justify-between">
                    <div className="order-2 lg:order-1">
                        <Link href="/" title="msmtech.ca">
                            <Image
                                src="/logo-main-white-v2.svg"
                                height={64}
                                width={240}
                                alt="msmtech.ca logo"
                                className="w-48 md:w-64 lg:w-56 xl:w-72"
                            />
                        </Link>
                        <Text variant="h4" tw="mt-8 lg:pl-2 lg:pr-32 font-normal">Tailored solutions, transparent partnerships, relentless excellence.</Text>
                        <div className="mt-6 flex gap-4">
                            {footerSocialLinks.map((socialLink) => (
                                <Link
                                    key={socialLink.id}
                                    className="p-1 transition-all flex gap-2 rounded-lg hover:bg-zinc-700/90 active:bg-zinc-500/90"
                                    href={socialLink.url}
                                    target="_blank"
                                >
                                    <Image
                                        src={socialLink.icon}
                                        height={64}
                                        width={64}
                                        alt={socialLink.title}
                                        className="w-8 h-8"
                                    />
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div className="order-1 lg:order-2 flex items-start justify-start gap-6 lg:gap-2 xl:gap-12 text-lg">
                        <div className="flex flex-col gap-4">
                            {footerNavigationItems1.map((navigationItem) => (
                                <Link
                                    key={navigationItem.id}
                                    className={`transition-all px-4 py-1 uppercase rounded-lg hover:bg-zinc-700/90 active:bg-zinc-500/90`}
                                    href={navigationItem.url ?? `/`}
                                    title={navigationItem.title}
                                >
                                    {navigationItem.title}
                                </Link>
                            ))}
                        </div>
                        <div className="flex flex-col gap-4">
                            {footerNavigationItems2.map((navigationItem) => (
                                <Link
                                    key={navigationItem.id}
                                    className={`transition-all px-4 py-1 uppercase rounded-lg hover:bg-zinc-700/90 active:bg-zinc-500/90`}
                                    href={navigationItem.url ?? `/`}
                                    title={navigationItem.title}
                                >
                                    {navigationItem.title}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-16 container mx-auto text-center"><Text variant="body2">&copy;{new Date().getFullYear()} MSM TECHNOLOGIES</Text></div>
        </footer>
    )
}