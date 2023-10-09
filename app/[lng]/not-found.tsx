import PageWrapper from '@/src/components/PageWrapper'
import Link from 'next/link'
    
export default function NotFound() {
    return (
        <PageWrapper>
            <div data-notfound-error>
                <h2>Not Found</h2>
                <p>Could not find requested resource</p>
                <Link href="/">Return Home</Link>
            </div>
        </PageWrapper>
    )
}