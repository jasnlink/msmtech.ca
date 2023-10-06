import Text from "./Text"
import Button from "./Button"
import Link from "next/link"

export default function GetStartedToday() {
    return (
        <div className="mt-40 text-center">
            <Text variant="h2">Let&#39;s get started today</Text>
            <div className="mt-12 flex justify-center">
                <Link href="/contact" title="Schedule a free consultation" passHref legacyBehavior>
                    <Button size="large">Schedule a free consultation</Button>
                </Link>
            </div>
        </div>
    )
}