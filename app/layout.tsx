import NavMenu from './_components/NavMenu'
import './globals.css'
import { Assistant, Archivo } from 'next/font/google'

import GoogleAnalytics from './_components/GoogleAnalytics'
import Footer from './_components/Footer'

const assistant = Assistant({ subsets: ['latin'] })
const archivo = Archivo({ subsets: ['latin'], variable: '--font-archivo' })

export const metadata = {
    title: 'Web Development Agency for Your Business | msmtech_',
    description: 'msmtech_ is a leading web development agency offering custom web solutions to businesses. From website essentials to premium ecommerce suites and enterprise web app solutions, we deliver tailored digital experiences. Contact us today for a free consultation.',
}

export default function RootLayout({
    children,
}:{
    children: React.ReactNode,
}) {
    return (
        <html lang="en">
            <body className={`${assistant.className} ${archivo.variable}`}>
                <NavMenu />
                <main>
                    {children}
                </main>
                <Footer />
            </body>
            <GoogleAnalytics
                measurementId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}
            />
        </html>
    )
}
