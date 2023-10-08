import Text from "@/src/components/Text"
import { Translation } from "@/src/models"
import useT from "@/src/hooks/useT"

interface TeamStackProps {
    lng: string;
    t?: Translation;
}
export default function TeamStack({ lng, t }: TeamStackProps) {

    const text = {
        title: useT(t?.TeamStack.title),
        paragraph1: useT(t?.TeamStack.paragraph1),
        paragraph2: useT(t?.TeamStack.paragraph2),
        paragraph3: useT(t?.TeamStack.paragraph3),
    }

    return (
        <div className="my-48 max-w-2xl container mx-auto">
            <div className="text-center">
                <Text variant="h2">{text.title}</Text>
                <div className="mt-8">
                    <Text variant="body1">{text.paragraph1}</Text>
                </div>
                <div className="mt-8">
                    <Text variant="body1">{text.paragraph2}</Text>
                </div>
                <div className="mt-16">
                    <Text variant="h5">{text.paragraph3}</Text>
                </div>
            </div>
        </div>
    )
}