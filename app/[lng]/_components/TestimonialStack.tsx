import Text from "@/src/components/Text"
import ContentContainer from "@/src/components/ContentContainer"
import { Translation } from "@/src/models"
import useT from "@/src/hooks/useT"

interface TestimonialStackProps {
    lng: string;
    t?: Translation;
}
export default function TestimonialStack({ lng, t }: TestimonialStackProps) {

    const text = {
        title: useT(t?.TestimonialStack.title),
        testimonials: [
            {
                message: useT(t?.TestimonialStack.testimonials[0].message, false),
                name: useT(t?.TestimonialStack.testimonials[0].name),
            }
        ]
    }

    return (
        <div className="max-w-2xl mx-auto">
            <div className="container mx-auto text-center">
                <Text variant="h3">{text.title}</Text>
            </div>
            <div className="my-16 px-4 relative">
                <ContentContainer p="lg">
                    <div className="text-center">
                        <Text variant="body1">&quot;{text.testimonials[0].message}&quot;</Text>
                    </div>
                    <div className="mt-16 lg:mt-20 text-center">
                        <Text variant="h6">{text.testimonials[0].name}</Text>
                    </div>
                </ContentContainer>
            </div>
        </div>
    )
}