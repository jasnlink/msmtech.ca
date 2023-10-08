import Text from "./Text"
import Button from "./Button"
import Link from "next/link"
import { Translation } from "@/src/models"
import useT from "@/src/hooks/useT"
interface GetStartedTodayProps {
    lng: string;
    t?: Translation;
}
export default function GetStartedToday({ lng, t }: GetStartedTodayProps) {

    const text = {
        title: useT(t?.GetStartedToday.title),
        action: useT(t?.GetStartedToday.action),
    }

    return (
        <div className="mt-40 text-center">
            <Text variant="h2">{text.title}</Text>
            <div className="mt-12 flex justify-center">
                <Link href={`/${lng}/contact`} title={text.action} passHref legacyBehavior>
                    <Button size="large">{text.action}</Button>
                </Link>
            </div>
        </div>
    )
}