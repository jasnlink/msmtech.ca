import Text from "@/src/components/Text"
import ProcessCard from "./ProcessCard"

import { DiscoveryIcon, WireFrameIcon, ImplementationIcon, TestingIcon, LaunchIcon, SupportIcon } from "@/src/components/Icon"
import ContentContainer from "@/src/components/ContentContainer";

import { Translation } from "@/src/models"
import useT from "@/src/hooks/useT"

export interface ProcessCard {
    icon: JSX.Element;
    title: string;
    content: Array<string>;
}

interface ProcessStackProps {
    lng: string;
    t?: Translation;
}
export default function ProcessStack({ lng, t }: ProcessStackProps) {

    const processCardData:Array<ProcessCard> = [
        {
            icon: DiscoveryIcon,
            title: useT(t?.ProcessStack.ProcessCard[0].title),
            content: [
                useT(t?.ProcessStack.ProcessCard[0].content[0]),
            ]
        },
        {
            icon: WireFrameIcon,
            title: useT(t?.ProcessStack.ProcessCard[1].title),
            content: [
                useT(t?.ProcessStack.ProcessCard[1].content[0]),
            ]
        },
        {
            icon: ImplementationIcon,
            title: useT(t?.ProcessStack.ProcessCard[2].title),
            content: [
                useT(t?.ProcessStack.ProcessCard[2].content[0]),
            ]
        },
        {
            icon: TestingIcon,
            title: useT(t?.ProcessStack.ProcessCard[3].title),
            content: [
                useT(t?.ProcessStack.ProcessCard[3].content[0]),
            ]
        },
        {
            icon: LaunchIcon,
            title: useT(t?.ProcessStack.ProcessCard[4].title),
            content: [
                useT(t?.ProcessStack.ProcessCard[4].content[0]),
            ]
        },
        {
            icon: SupportIcon,
            title: useT(t?.ProcessStack.ProcessCard[5].title),
            content: [
                useT(t?.ProcessStack.ProcessCard[5].content[0]),
            ]
        }
    ]
    const titleText = useT(t?.ProcessStack.title)
    
    return (
        <div className="max-w-2xl mx-auto">
            <div className="container text-center">
                <Text variant="h2">{titleText}</Text>
            </div>
            <div className="my-16 px-4 relative">
                <ContentContainer>
                    <div className="relative flex flex-col gap-y-16 md:gap-y-24">
                        <div className="top-10 left-8 md:left-10 bottom-10 -translate-x-1/2 absolute w-1 bg-primary-50"></div>
                        {processCardData.map((processCard, index) => (
                            <ProcessCard
                                key={index}
                                data={processCard}
                            />
                        ))}
                    </div>
                </ContentContainer>
            </div>
        </div>
    )

}