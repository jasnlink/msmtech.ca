import Text from "@/src/components/Text"
import Link from "next/link"
import ContactForm from "./_components/ContactForm"
import PageWrapper from "@/src/components/PageWrapper"
import { unhookedTranslation, useTranslation } from "@/app/i18n"
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
    const { t: t2 } = await unhookedTranslation(lng, 'pages/contact')

    return {
        title: `${t2('general.meta.title')} - ${t1('general.meta.title')}`,
    }
}

export default async function Page({ params }: {
    params: {
        lng: string;
    }
}) {

    const {t: tGlobal} = await useTranslation(params.lng, 'global')
    const {t: tContact} = await useTranslation(params.lng, 'pages/contact')

    const text = {
        title: tContact('sections.page.title'),
        subtitle: tContact('sections.page.subtitle'),
        email: tContact('sections.page.email'),
        telephone: tContact('sections.page.telephone'),
        contact_email: tGlobal('general.msmtech.contact_email'),
        contact_phone: tGlobal('general.msmtech.contact_phone'),
        contact_phone_unformatted: tGlobal('general.msmtech.contact_phone_unformatted'),
    }

    return (
        <PageWrapper className="mt-12 md:mt-16 xl:mt-28 w-full container mx-auto relative">
            <div className="xl:min-h-[calc(100vh-10rem)] py-24 lg:py-12 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                <div>
                    <Text variant="h2">{text.title}</Text>
                    <div className="mt-4">
                        <Text variant="body1">{text.subtitle}</Text>
                    </div>
                    <div className="mt-12 grid grid-cols-3">
                        <div className="col-span-1">
                            <Text><b>{text.email}</b></Text>
                        </div>
                        <div className="col-span-2">
                            <Text>
                                <Link href={`mailto:${text.contact_email}`} target="_blank">{text.contact_email}</Link>
                            </Text>
                        </div>
                        <div className="col-span-1">
                            <Text><b>{text.telephone}</b></Text>
                        </div>
                        <div className="col-span-2">
                            <Text>
                                <Link href={`tel:${text.contact_phone_unformatted}`}>{text.contact_phone}</Link>
                            </Text>
                        </div>
                    </div>
                </div>
                <ContactForm
                    lng={params.lng}
                    t={
                        {
                            ContactForm: tContact('sections.ContactForm', {returnObjects: true}),
                        }
                    }
                />
            </div>
        </PageWrapper>
    )
}