import { useId, Fragment } from "react"
import { notFound } from "next/navigation"
import Text from "@/src/components/Text"
import PageWrapper from "@/src/components/PageWrapper"
import Button from "@/src/components/Button"
import Link from "next/link"
import { solutionsStaticParams } from "@/src/data"
import GetStartedToday from "@/src/components/GetStartedToday"
import { unhookedTranslation, useTranslation } from "@/app/i18n"
import { Translation } from "@/src/models"
import type { Metadata, ResolvingMetadata } from 'next'

export async function generateStaticParams() {

    return solutionsStaticParams.map((solution) => ({
        handle: solution.handle,
    }))

}

// Generate metadata for SEO
interface GenerateMetaDataProps {
    params: { 
        lng: string;
        handle: string;
    }
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
        title: `${t2(`solutions.${params.handle}.title`)} - ${t1('general.meta.title')}`,
    }
}

// Set this to false to return 404 if the handle doesn`t exist.
export const dynamicParams = false

export default async function Page({
    params
}:{
    params: {
        lng: string;
        handle: string;
    }
}) {

    const {t: t1} = await useTranslation(params.lng, 'pages/solutions')
    const {t: t2} = await useTranslation(params.lng, 'global')

    type SolutionContent = {
        id: string;
        type: string;
        data: string;
    }
    const solutionsContentData = [
        {
            id: `0`,
            handle: `website-essentials`,
            title: t1(`solutions.website-essentials.title`),
            content: function(){
                let res: SolutionContent[];
                res = t1(`solutions.website-essentials.content`, {returnObjects: true});
                return res;
            }()
        },
        {
            id: `1`,
            handle: `ecommerce-suite`,
            title: t1(`solutions.ecommerce-suite.title`),
            content: function(){
                let res: SolutionContent[];
                res = t1(`solutions.ecommerce-suite.content`, {returnObjects: true});
                return res;
            }()
        },
        {
            id: `2`,
            handle: `enterprise-web-app`,
            title: t1(`solutions.enterprise-web-app.title`),
            content: function(){
                let res: SolutionContent[];
                res = t1(`solutions.enterprise-web-app.content`, {returnObjects: true});
                return res;
            }()
        },
    ]

    const result = solutionsContentData.find(content => content.handle === params.handle)

    if(!result) {
        return notFound()
    }

    if(result) {

        return (
            <PageWrapper className="py-24 md:py-32 xl:py-40 lg:w-3/4 xl:w-1/2 container mx-auto relative">
                <Text variant="h2">{result.title}</Text>
                <div className="mt-12">
                    {result.content.map((block) => (
                        <Fragment key={block.id}>
                            {block.type === `paragraph` && (
                                <Text variant="body1" tw={`my-6`}>{block.data}</Text>
                            )}
                        </Fragment>
                    ))}
                </div>
                <GetStartedToday
                    lng={params.lng}
                    t={
                        {
                            GetStartedToday: t2('components.GetStartedToday', {returnObjects: true})
                        }
                    }
                />
            </PageWrapper>
        )
    }

}