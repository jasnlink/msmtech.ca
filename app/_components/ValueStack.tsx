import { CoreValueIcon } from "@/src/components/Icon";
import Text from "@/src/components/Text";

export default function ValueStack() {
    return (
        <div className="my-48 container mx-auto">
            <div className="text-center">
                <Text variant="h2">Core Values You Can Trust</Text>
                <div className="mt-4 max-w-2xl mx-auto">
                    <Text variant="body1">We strive to build a partnership with our clients where mutual trust and shared objectives propel us towards success.</Text>
                </div>
            </div>
            <div className="my-32 flex items-center justify-center">
                <div className="w-48 h-48 lg:w-96 lg:h-96 relative">
                    <div className="absolute -top-8 -right-12"><Text variant="h3">Building For Your Cause</Text></div>
                    <div className="absolute bottom-16 -left-20 md:-left-28 lg:-left-32"><Text variant="h3">Honesty</Text></div>
                    <div className="absolute -bottom-8 -right-16 lg:-right-24"><Text variant="h3">Transparency</Text></div>
                    <div>
                        {CoreValueIcon}
                    </div>
                </div>
            </div>
            <div className="mt-8 max-w-2xl mx-auto">
                <div className="mt-4">
                    <Text><b><u>Building For Your Cause:</u></b> We are committed to delivering maximal value, often going above and beyond at our own expense.</Text>
                </div>
                <div className="mt-4">
                    <Text><b><u>Honesty:</u></b> We approach every conversation with honesty, evaluating your ideas, products, and business with candor. We anticipate the same level of honesty from you - it&#39;s through this shared openness that we can pragmatically address and resolve issues as they arise. It really is that simple!</Text>
                </div>
                <div className="mt-4">
                    <Text><b><u>Transparency:</u></b> We encourage your curiosity - ask us about why we do things a certain way, the reasoning behind our decisions, and how these choices will benefit you in the long term.</Text>
                </div>
            </div>
        </div>
    )
}