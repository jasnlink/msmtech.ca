import { CoreValueIcon } from "@/src/components/Icon";
import Text from "@/src/components/Text";
import { Translation } from "@/src/models";
import useT from "@/src/hooks/useT";

interface ValueStackProps {
    lng: string;
    t?: Translation;
}
export default function ValueStack({ lng, t }: ValueStackProps) {

    const text = {
        title: useT(t?.ValueStack.title),
        subtitle: useT(t?.ValueStack.subtitle),
        values: {
            building_for_your_cause: {
                title: useT(t?.ValueStack.values.building_for_your_cause.title),
                description: useT(t?.ValueStack.values.building_for_your_cause.description, false)
            },
            honesty: {
                title: useT(t?.ValueStack.values.honesty.title),
                description: useT(t?.ValueStack.values.honesty.description, false)
            },
            transparency: {
                title: useT(t?.ValueStack.values.transparency.title),
                description: useT(t?.ValueStack.values.transparency.description, false)
            },
        }
    }

    return (
        <div className="my-48 container mx-auto">
            <div className="text-center">
                <Text variant="h2">{text.title}</Text>
                <div className="mt-4 max-w-2xl mx-auto">
                    <Text variant="body1">{text.subtitle}</Text>
                </div>
            </div>
            <div className="my-32 flex items-center justify-center">
                <div className="w-48 h-48 lg:w-96 lg:h-96 relative">
                    <div className="absolute -top-8 -right-12"><Text variant="h3">{text.values.building_for_your_cause.title}</Text></div>
                    <div className="absolute bottom-16 -left-20 md:-left-28 lg:-left-32"><Text variant="h3">{text.values.honesty.title}</Text></div>
                    <div className="absolute -bottom-8 -right-16 lg:-right-24"><Text variant="h3">{text.values.transparency.title}</Text></div>
                    <div>
                        {CoreValueIcon}
                    </div>
                </div>
            </div>
            <div className="mt-8 max-w-2xl mx-auto">
                <div className="mt-4">
                    <Text>{text.values.building_for_your_cause.description}</Text>
                </div>
                <div className="mt-4">
                    <Text>{text.values.honesty.description}</Text>
                </div>
                <div className="mt-4">
                    <Text>{text.values.transparency.description}</Text>
                </div>
            </div>
        </div>
    )
}