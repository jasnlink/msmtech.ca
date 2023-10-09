import NavMenu from './_components/NavMenu'
import '@/app/globals.css'
import { Assistant, Archivo } from 'next/font/google'
import type { Metadata, ResolvingMetadata } from 'next'

import GoogleAnalytics from './_components/GoogleAnalytics'
import Footer from './_components/Footer'

import RootQueryProvider from '@/src/components/providers/RootQueryProvider'

import { languages } from '../i18n/settings'
import { useTranslation, unhookedTranslation } from "../i18n";
import MetaTags from './_components/MetaTags'

export async function generateStaticParams() {
    return languages.map((lng) => ({ lng }))
}

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
    const { t } = await unhookedTranslation(lng, 'global')

    return {
        title: t('general.meta.title'),
        description: t('general.meta.description')
    }
}

const assistant = Assistant({ subsets: ['latin'] })
const archivo = Archivo({ subsets: ['latin'], variable: '--font-archivo' })

export default async function RootLayout({
    params: { lng },
    children,
}:{
    params: {
        lng: string;
    }
    children: React.ReactNode,
}) {

    const { t } = await useTranslation(lng, 'global')

    return (
        <RootQueryProvider>
            <html lang={lng}>
                <head>
                    <MetaTags />
                </head>
                <body className={`${assistant.className} ${archivo.variable}`}>
                    <NavMenu
                        lng={lng}
                        t={
                            {
                                navigation: t('navigation', {returnObjects: true}),
                                general: t('general', {returnObjects: true})
                            }
                        }
                    />
                    <main>
                        {children}
                    </main>
                    <Footer
                        lng={lng}
                        t={
                            {
                                footer_navigation: t('footer_navigation', {returnObjects: true}),
                                general: t('general', {returnObjects: true})
                            }
                        }
                    />
                </body>
                <GoogleAnalytics
                    measurementId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}
                />
            </html>
        </RootQueryProvider>
    )
}
