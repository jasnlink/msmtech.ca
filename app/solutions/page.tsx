import PageWrapper from "@/src/components/PageWrapper"
import SolutionStack from "../_components/SolutionStack"
import GetStartedToday from "@/src/components/GetStartedToday"

export default function Page() {
    return (
        <PageWrapper className="pb-24 md:pb-32 xl:pb-40 mx-auto relative">
            <SolutionStack />
            <GetStartedToday />
        </PageWrapper>
    )
}