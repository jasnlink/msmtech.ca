import DiscoveryAnimation from "./_components/DiscoveryAnimation";
import MainHero from "./_components/MainHero";
import ProcessStack from "./_components/ProcessStack";
import SolutionStack from "./_components/SolutionStack";
import ValueStack from "./_components/ValueStack";
import TestimonialStack from "./_components/TestimonialStack";
import TeamStack from "./_components/TeamStack";
import TechStack from "./_components/TechStack";
import PageWrapper from "@/src/components/PageWrapper";
import { unhookedTranslation, useTranslation } from "@/app/i18n"
import type { Metadata, ResolvingMetadata } from 'next'
import { languages, fallbackLng } from "@/app/i18n/settings"

export const revalidate = false

// Generate metadata for SEO
interface GenerateMetaDataProps {
    params: { lng: string }
    searchParams: { [key: string]: string | string[] | undefined }
}
export async function generateMetadata(
    { params, searchParams }: GenerateMetaDataProps,
        parent: ResolvingMetadata
    ): Promise<Metadata> {

    const alternateLngPages = languages.reduce((acc, lng) => ({ ...acc, [lng]: `${process.env.NEXT_PUBLIC_HOST}/${lng}`}), {})

    return {
        alternates: {
            languages: {
                ...alternateLngPages,
                'x-default': `${process.env.NEXT_PUBLIC_HOST}/${fallbackLng}`,
            }
        }
    }
}

export default async function Home({ params }: { params: { lng: string; } }) {

    let {t} = await useTranslation(params.lng, `pages/index`)

    return (
        <PageWrapper>
            <MainHero
                lng={params.lng}
                t={
                    {
                        MainHero: t('sections.MainHero', {returnObjects: true})
                    }
                }
            />
            <div className="relative bg-black lg:bg-transparent shadow-black lg:shadow-transparent shadow-[0px_-8px_12px_6px]">
                <DiscoveryAnimation
                    lng={params.lng}
                    t={
                        {
                            DiscoveryAnimation: t('sections.DiscoveryAnimation', {returnObjects: true})
                        }
                    }
                />
                <ProcessStack
                    lng={params.lng}
                    t={
                        {
                            ProcessStack: t('sections.ProcessStack', {returnObjects: true})
                        }
                    }
                />
                <ValueStack
                    lng={params.lng}
                    t={
                        {
                            ValueStack: t('sections.ValueStack', {returnObjects: true})
                        }
                    }
                />
                <SolutionStack
                    lng={params.lng}
                    t={
                        {
                            SolutionStack: t('sections.SolutionStack', {returnObjects: true})
                        }
                    }
                />
                <TeamStack
                    lng={params.lng}
                    t={
                        {
                            TeamStack: t('sections.TeamStack', {returnObjects: true})
                        }
                    }
                />
                <TestimonialStack
                    lng={params.lng}
                    t={
                        {
                            TestimonialStack: t('sections.TestimonialStack', {returnObjects: true})
                        }
                    }
                />
                <TechStack
                    lng={params.lng}
                    t={
                        {
                            TechStack: t('sections.TechStack', {returnObjects: true})
                        }
                    }
                />
            </div>
        </PageWrapper>
    )
}
