import Text from "@/src/components/Text"
import { TailwindLogoIcon, SanityLogoIcon, ContentfulLogoIcon, NextjsLogoIcon, ShopifyLogoIcon, NotionLogoIcon } from "@/src/components/Icon"
import Link from "next/link"
import { Translation } from "@/src/models"
import useT from "@/src/hooks/useT"

interface TechStackProps {
    lng: string;
    t?: Translation;
}
export default function TechStack({ lng, t }: TechStackProps) {

    const techStackData = [
        {
            icon: NextjsLogoIcon,
            title: `Next.js`,
            url: `https://nextjs.org/`
        },
        {
            icon: TailwindLogoIcon,
            title: `TailwindCSS`,
            url: `https://tailwindcss.com/`
        },
        {
            icon: SanityLogoIcon,
            title: `Sanity`,
            url: `https://www.sanity.io/`
        },
        {
            icon: ContentfulLogoIcon,
            title: `Contentful`,
            url: `https://www.contentful.com/`
        },
        {
            icon: ShopifyLogoIcon,
            title: `Shopify`,
            url: `https://www.shopify.com/`
        },
        {
            icon: NotionLogoIcon,
            title: `Notion`,
            url: `https://notion.so`
        },
    ]

    const text = {
        title: useT(t?.TechStack.title),
        description: useT(t?.TechStack.description),
    }

    return (
        <>
            <div className="py-48">
                <div className="max-w-2xl container mx-auto">
                    <div className="text-center">
                        <Text variant="h2">{text.title}</Text>
                        <div className="mt-8">
                            <Text variant="body1">{text.description}</Text>
                        </div>
                    </div>
                </div>
                <div className="my-16 container mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 xl:gap-8">
                        {techStackData.map((data, index) => (
                            <Link key={index} href={data.url} title={data.title} className="w-full flex flex-col items-center justify-center bg-white rounded-lg px-4 lg:px-8 py-4">
                                <div className="w-auto h-8 fill-black text-black">
                                    {data.icon}
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}