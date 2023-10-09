'use client'

import PageWrapper from "@/src/components/PageWrapper"

export default function GlobalError({
    error,
    reset,
}: {
    error: Error
    reset: () => void
}) {
    return (
        <html>
            <body>
                <PageWrapper>
                    <div data-root-error>
                        <h2>Something went wrong!</h2>
                        <button onClick={() => reset()}>Try again</button>
                    </div>
                </PageWrapper>
            </body>
        </html>
    )
}