import Text from "@/src/components/Text"
import { ProcessCard } from "./ProcessStack";

interface ProcessCardProps {
    data: ProcessCard
}

export default function ProcessCard({data}:ProcessCardProps) {

    return (
        <div className="z-10 flex items-center gap-x-8 xl:gap-x-16">
            <div className="flex justify-center xl:justify-start">
                <div className="bg-primary-50 p-3 md:p-4 rounded-full w-16 h-16 md:w-20 md:h-20 flex items-center justify-center">
                    {data.icon}
                </div>
            </div>
            <div className="grow">
                <Text variant="h4" tw="text-left">{data.title}</Text>
                <div className="mt-2 flex flex-col gap-y-1">
                    {data.content.map((text, index) => (
                        <Text key={index}>{text}</Text>
                    ))}
                </div>
            </div>
        </div>
    )
}