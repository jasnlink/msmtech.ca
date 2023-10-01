import Text from "@/src/components/Text"
import ContentContainer from "@/src/components/ContentContainer"
import Image from "next/image";
import Button from "@/src/components/Button";
import Link from "next/link";

export interface SolutionContentData {
    id: number;
    image: string;
    title: string;
    content: Array<string>;
    budget: string;
    time: string;
    url: string;
}

export default function SolutionStack() {

    const solutionContentData: Array<SolutionContentData> = [
        {
            id: 0,
            image: `/solution4-1.png`,
            title: `Website Essentials`,
            content: [
                `Get a homepage and 2-3 custom content pages designed with simple code-based templates. This package is perfect for a basic business showcase, including fundamental communication tools and a straightforward blog.`,
            ],
            budget: `CAD $1-7k`,
            time: `1 month`,
            url: `/solutions/website-essentials`,
        },
        {
            id: 1,
            image: `/solution3-1.png`,
            title: `Ecommerce Suite`,
            content: [
                `A website and a fully-fledged online store for both digital and physical products, complete with invoicing and logistics. Suitable for businesses aiming to sell their own digital and physical products and services either locally or internationally.`,
            ],
            budget: `CAD $2-10k`,
            time: `1-2 months`,
            url: `/solutions/ecommerce-suite`,
        },
        {
            id: 2,
            image: `/solution1-1.png`,
            title: `Enterprise Web App`,
            content: [
                `A comprehensive and bespoke web application developed to power your business or SaaS platform. This solution provides custom-built modules, tailored functionalities, and seamless integrations, all designed to optimize and streamline your specific business operations.`,
            ],
            budget: `CAD $5-25k`,
            time: `2-4 months`,
            url: `/solutions/enterprise-web-app`,
        }
    ];

    return (
        <div className="mt-48">
            <div className="container mx-auto text-center">
                <Text variant="h2">Exceptional Solutions Within Your Budget</Text>
            </div>
            <div className="my-16 px-4 relative">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 xl:gap-8">
                    {solutionContentData.map((data, index) => (
                        <ContentContainer key={index}>
                            <div className="h-full flex flex-col justify-between gap-4">
                                <div>
                                    <Image
                                        src={data.image}
                                        height={1366}
                                        width={1024}
                                        alt={data.title}
                                        className="w-full aspect-quarter rounded-lg shadow-lg border border-zinc-800"
                                    />
                                    <div className="mt-8">
                                        <Text variant="h3">{data.title}</Text>
                                    </div>
                                    <div className="mt-8">
                                        {data.content.map((text, index) => (
                                            <div key={index} className="mt-2">
                                                <Text>{text}</Text>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <Text>Budget: {data.budget}</Text>
                                    </div>
                                    <div className="mt-4">
                                        <Text>Time: {data.time}</Text>
                                    </div>
                                    <div className="mt-8">
                                        <Link href={data.url} title="Read more" passHref legacyBehavior>
                                            <Button>Read more</Button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </ContentContainer>
                    ))}
                </div>
            </div>
        </div>
    )
}