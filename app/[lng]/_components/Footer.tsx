import Link from "next/link"
import Image from "next/image"
import Text from "@/src/components/Text"
import { NavigationItem } from "./NavMenu"
import { Translation } from "@/src/models"
import useT from "@/src/hooks/useT"

interface FooterProps {
    lng: string;
    t?: Translation;
}
export default function Footer({ lng, t }: FooterProps) {

    const footerNavigationItems1: Array<NavigationItem> = [
        {
            id: `0`,
            featuredImage: null,
            title: useT(t?.footer_navigation.menu[0].solutions),
            description: null,
            url: `/solutions`,
            children: []
        },
        {
            id: `1`,
            featuredImage: null,
            title: useT(t?.footer_navigation.menu[0].contact),
            description: null,
            url: `/contact`,
            children: []
        },
        {
            id: `2`,
            featuredImage: null,
            title: useT(t?.footer_navigation.menu[0].case_studies),
            description: null,
            url: `/blogs/case-studies`,
            children: []
        },
        {
            id: `3`,
            featuredImage: null,
            title: useT(t?.footer_navigation.menu[0].services),
            description: null,
            url: `/blogs/services`,
            children: []
        },
    ]

    const footerNavigationItems2: Array<NavigationItem> = [
        {
            id: `0`,
            featuredImage: null,
            title: useT(t?.footer_navigation.menu[1].business_technology_articles),
            description: null,
            url: `/blogs/business-technology-articles`,
            children: []
        },
        {
            id: `1`,
            featuredImage: null,
            title: useT(t?.footer_navigation.menu[1].technology_guides),
            description: null,
            url: `/blogs/technology-guides`,
            children: []
        },
        {
            id: `2`,
            featuredImage: null,
            title: useT(t?.footer_navigation.menu[1].privacy_policy),
            description: null,
            url: `/privacy-policy`,
            children: []
        },
        {
            id: `3`,
            featuredImage: null,
            title: useT(t?.footer_navigation.menu[1].terms_of_service),
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
            icon: `/assets/socials/linkedin.svg`,
            title: `LinkedIn`,
            url: `https://www.linkedin.com/company/msm-tech/`
        },
        {
            id: `1`,
            icon: `/assets/socials/x.svg`,
            title: `X`,
            url: `https://x.com/msmtech_`
        },
        {
            id: `2`,
            icon: `/assets/socials/facebook.svg`,
            title: `Facebook`,
            url: `https://www.facebook.com/msmtechologies`
        }
    ]

    const logoText = {
        slogan: useT(t?.footer_navigation.slogan),
        alt: useT(t?.general.msmtech.logo.alt),

    }

    return (
        <footer className="pt-24 pb-2 border-t border-t-zinc-800 bg-gradient-to-br from-black to-zinc-950 opacity-90">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-60 justify-between">
                    <div className="order-2 lg:order-1">
                        <Link href={`/${lng}`} title="msmtech.ca" className={`hover:bg-zinc-700/90 active:bg-zinc-500/90 transition-all rounded-lg py-1 px-1 block w-fit`}>
                            <Image
                                src="/assets/logo-main-white-v2.svg"
                                height={64}
                                width={240}
                                alt={logoText.alt}
                                className="w-48 md:w-64 lg:w-56 xl:w-72"
                            />
                        </Link>
                        <Text variant="h4" tw="mt-8 lg:pl-2 lg:pr-32 font-normal">{logoText.slogan}</Text>
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
                                    href={`/${lng}${navigationItem.url}` ?? `/${lng}`}
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
                                    href={`/${lng}${navigationItem.url}` ?? `/${lng}`}
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