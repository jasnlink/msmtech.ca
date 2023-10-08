import PageWrapper from "@/src/components/PageWrapper"
import SolutionStack from "../_components/SolutionStack"
import GetStartedToday from "@/src/components/GetStartedToday"
import { useTranslation, unhookedTranslation } from "@/app/i18n"
import type { Metadata, ResolvingMetadata } from 'next'

// Generate metadata for SEO
interface GenerateMetaDataProps {
    params: { lng: string }
    searchParams: { [key: string]: string | string[] | undefined }
}
export async function generateMetadata(
    { params, searchParams }: GenerateMetaDataProps,
        parent: ResolvingMetadata
    ): Promise<Metadata> {

    // read route params
    const lng = params.lng
    const { t: t1 } = await unhookedTranslation(lng, 'global')
    const { t: t2 } = await unhookedTranslation(lng, 'pages/solutions')

    return {
        title: `${t2('general.meta.title')} - ${t1('general.meta.title')}`,
    }
}

export default async function Page({ params }: { params: { lng : string } }) {

    const {t: t1} = await useTranslation(params.lng, 'global')
    const {t: t2} = await useTranslation(params.lng, 'pages/index')

    return (
        <PageWrapper className="pb-24 md:pb-32 xl:pb-40 mx-auto relative">
            <SolutionStack
                lng={params.lng}
                t={
                    {
                        SolutionStack: t2('sections.SolutionStack', {returnObjects: true})
                    }
                }
            />
            <GetStartedToday
                lng={params.lng}
                t={
                    {
                        GetStartedToday: t1('components.GetStartedToday', {returnObjects: true})
                    }
                }
            />
        </PageWrapper>
    )
}