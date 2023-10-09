import PageWrapper from "@/src/components/PageWrapper"
import Text from "@/src/components/Text"
import { Fragment } from "react"

import { unhookedTranslation, useTranslation } from "@/app/i18n"
import type { Metadata, ResolvingMetadata } from 'next'

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

    // read route params
    const lng = params.lng
    const { t: t1 } = await unhookedTranslation(lng, 'global')
    const { t: t2 } = await unhookedTranslation(lng, 'pages/terms-of-service')

    return {
        title: `${t2('general.meta.title')} - ${t1('general.meta.title')}`,
    }
}

export default async function Page({ params }: {
    params: {
        lng: string;
    }
}) {

    const {t} = await useTranslation(params.lng, 'pages/terms-of-service')

    type TermsOfServiceContent = {
        id: string;
        type: string;
        data: string;
    }
    const termsOfServiceData = {
        id: `0`,
        handle: `terms-of-service`,
        title: t(`sections.page.title`),
        content: function(){
            let res: TermsOfServiceContent[];
            res = t(`sections.page.content`, {returnObjects: true});
            return res;
        }(),
    }

    return (
        <PageWrapper className="py-24 md:py-32 xl:py-40 lg:w-3/4 xl:w-1/2 container mx-auto relative">
            <Text variant="h2">{termsOfServiceData.title}</Text>
            <div className="mt-12">
                {termsOfServiceData.content.map((block) => (
                    <Fragment key={block.id}>
                        {block.type === `paragraph` && (
                            <Text variant="body1" tw={`my-6`}>{block.data}</Text>
                        )}
                    </Fragment>
                ))}
            </div>
        </PageWrapper>
    )
}
