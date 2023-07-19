import Text from "@/src/components/Text"

export default function TeamStack() {
    return (
        <div className="my-48 max-w-2xl container mx-auto">
            <div className="text-center">
                <Text variant="h2">About the Team</Text>
                <div className="mt-8">
                    <Text variant="body1">Hi, I&#39;m Jason Che and I run msmtech, and I&#39;m all about turning your ideas into digital reality. I truly believe that there&#39;s no limit to what we can create when technology is on our side.</Text>
                </div>
                <div className="mt-8">
                    <Text variant="body1">I, as the lead engineer, am your primary contact throughout this journey. However, msmtech is more than just me. It&#39;s a network of talented individuals - designers, developers, and creatives who are experts in their fields. Depending on the project requirements, I handpick the right minds to join us on the venture.</Text>
                </div>
                <div className="mt-16">
                    <Text variant="h5">But don&#39;t just take our word for it. </Text>
                </div>
            </div>
        </div>
    )
}