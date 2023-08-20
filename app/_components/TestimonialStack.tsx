import Text from "@/src/components/Text"
import ContentContainer from "@/src/components/ContentContainer"


export default function TestimonialStack() {
    return (
        <div className="max-w-2xl mx-auto">
            <div className="container mx-auto text-center">
                <Text variant="h3">Our most recent client had to say</Text>
            </div>
            <div className="my-16 px-4 relative">
                <ContentContainer p="lg">
                    <div className="text-center">
                        <Text variant="body1">&quot;The team at msmtech_ was professional and efficient.<br />They delivered a great website with quick turnaround time and exceeded our expectations.&quot;</Text>
                    </div>
                    <div className="mt-16 lg:mt-20 text-center">
                        <Text variant="h6">Linda Z.</Text>
                        {/* <div className="mt-1">
                            <Text variant="body2">Owner of Ginseng Massage,</Text>
                            <Text variant="body2">Founder of Tuina Association of Canada</Text>
                        </div> */}
                    </div>
                </ContentContainer>
            </div>
        </div>
    )
}