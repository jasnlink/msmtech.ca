import DiscoveryAnimation from "./_components/DiscoveryAnimation";
import MainHero from "./_components/MainHero";
import ProcessStack from "./_components/ProcessStack";
import SolutionStack from "./_components/SolutionStack";
import ValueStack from "./_components/ValueStack";
import TestimonialStack from "./_components/TestimonialStack";
import TeamStack from "./_components/TeamStack";
import TechStack from "./_components/TechStack";
import PageWrapper from "@/src/components/PageWrapper";

export default function Home() {
    return (
        <PageWrapper>
            <MainHero />
            <div className="relative bg-black lg:bg-transparent shadow-black lg:shadow-transparent shadow-[0px_-8px_12px_6px]">
                <DiscoveryAnimation />
                <ProcessStack />
                <ValueStack />
                <SolutionStack />
                <TeamStack />
                <TestimonialStack />
                <TechStack />
            </div>
        </PageWrapper>
    )
}
