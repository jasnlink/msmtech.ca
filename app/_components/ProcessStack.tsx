import Text from "@/src/components/Text"
import ProcessCard from "./ProcessCard"

import { DiscoveryIcon, WireFrameIcon, ImplementationIcon, TestingIcon, LaunchIcon, SupportIcon } from "@/src/components/Icon"
import ContentContainer from "@/src/components/ContentContainer";

export interface ProcessCard {
    icon: JSX.Element;
    title: string;
    content: Array<string>;
}

export default function ProcessStack() {

    const processCardData:Array<ProcessCard> = [
        {
            icon: DiscoveryIcon,
            title: 'Discovery',
            content: [
                `Objective: To align on your project's goals and challenges.`,
            ]
        },
        {
            icon: WireFrameIcon,
            title: 'Wireframe Planning',
            content: [
                `Objective: To create a structural blueprint of your project.`,
            ]
        },
        {
            icon: ImplementationIcon,
            title: 'Prototype & Implementation',
            content: [
                `Objective: To transform the prototype into a fully functional product with your feedback.`,
            ]
        },
        {
            icon: TestingIcon,
            title: 'Testing & QA',
            content: [
                `Objective: To ensure the quality of your project.`,
            ]
        },
        {
            icon: LaunchIcon,
            title: 'Project Launch',
            content: [
                `Objective: To introduce your project to the world.`,
            ]
        },
        {
            icon: SupportIcon,
            title: 'Ongoing Support',
            content: [
                `Objective: To ensure the long-term success of your project.`,
            ]
        }
    ]

    
    return (
        <div className="max-w-2xl mx-auto">
            <div className="container text-center">
                <Text variant="h2">Our Process for Excellence</Text>
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