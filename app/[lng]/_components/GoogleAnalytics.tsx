import Script from "next/script"

interface GoogleAnalyticsProps {
    measurementId: string | undefined;
}

export default function GoogleAnalytics({ measurementId }: GoogleAnalyticsProps) {

    if (!measurementId) {
        return null
    }

    return (
        <>
            <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
                strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
                {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${measurementId}');
                `}
            </Script>
        </>
    )
}