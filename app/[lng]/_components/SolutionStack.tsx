import Text from "@/src/components/Text"
import ContentContainer from "@/src/components/ContentContainer"
import Image from "next/image";
import Button from "@/src/components/Button";
import Link from "next/link";
import { Translation } from "@/src/models"
import useT from "@/src/hooks/useT"

export interface SolutionContentData {
    id: number;
    image: string;
    title: string;
    content: Array<string>;
    budget: string;
    time: string;
    url: string;
}

interface NavMenuProps {
    lng: string;
    t?: Translation;
}
export default function SolutionStack({ lng, t }: NavMenuProps) {

    const solutionContentData: Array<SolutionContentData> = [
        {
            id: 0,
            image: `/assets/solution4-1.png`,
            title: useT(t?.SolutionStack.solutions.website_essentials.title),
            content: [
                useT(t?.SolutionStack.solutions.website_essentials.content[0])
            ],
            budget: useT(t?.SolutionStack.solutions.website_essentials.budget),
            time: useT(t?.SolutionStack.solutions.website_essentials.time),
            url: `/solutions/website-essentials`,
        },
        {
            id: 1,
            image: `/assets/solution3-1.png`,
            title: useT(t?.SolutionStack.solutions.ecommerce_suite.title),
            content: [
                useT(t?.SolutionStack.solutions.ecommerce_suite.content[0])
            ],
            budget: useT(t?.SolutionStack.solutions.ecommerce_suite.budget),
            time: useT(t?.SolutionStack.solutions.ecommerce_suite.time),
            url: `/solutions/ecommerce-suite`,
        },
        {
            id: 2,
            image: `/assets/solution1-1.png`,
            title: useT(t?.SolutionStack.solutions.enterprise_web_app.title),
            content: [
                useT(t?.SolutionStack.solutions.enterprise_web_app.content[0])
            ],
            budget: useT(t?.SolutionStack.solutions.enterprise_web_app.budget),
            time: useT(t?.SolutionStack.solutions.enterprise_web_app.time),
            url: `/solutions/enterprise-web-app`,
        }
    ];

    const titleText = useT(t?.SolutionStack.title)
    const ctaText = useT(t?.SolutionStack.read_more)

    return (
        <div className="mt-48">
            <div className="container mx-auto text-center">
                <Text variant="h2">{titleText}</Text>
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
                                        <Text>{data.budget}</Text>
                                    </div>
                                    <div className="mt-4">
                                        <Text>{data.time}</Text>
                                    </div>
                                    <div className="mt-8">
                                        <Link href={`/${lng}${data.url}`} title={ctaText} passHref legacyBehavior>
                                            <Button>{ctaText}</Button>
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