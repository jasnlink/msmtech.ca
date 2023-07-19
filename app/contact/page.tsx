import Text from "@/src/components/Text"
import Link from "next/link"
import ContactForm from "./_components/ContactForm"
import PageWrapper from "@/src/components/PageWrapper"

export const metadata = {
    title: 'Schedule a Free Consultation - Contact Us | msmtech_',
    description: 'msmtech_ is a leading web development agency offering custom web solutions to businesses. From website essentials to premium ecommerce suites and enterprise web app solutions, we deliver tailored digital experiences. Contact us today for a free consultation.',
}

export default function Page() {

    return (
        <PageWrapper className="mt-12 md:mt-16 xl:mt-28 w-full container mx-auto relative">
            <div className="xl:min-h-[calc(100vh-10rem)] py-24 lg:py-12 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                <div>
                    <Text variant="h2">Have a project in mind?</Text>
                    <div className="mt-4">
                        <Text variant="body1">Leave us a few details and we&#39;ll get back to you.</Text>
                    </div>
                    <div className="mt-12 grid grid-cols-3">
                        <div className="col-span-1">
                            <Text><b>Email</b></Text>
                        </div>
                        <div className="col-span-2">
                            <Text>
                                <Link href="mailto:contact@msmtech.ca" target="_blank">contact@msmtech.ca</Link>
                            </Text>
                        </div>
                        <div className="col-span-1">
                            <Text><b>Telephone</b></Text>
                        </div>
                        <div className="col-span-2">
                            <Text>
                                <Link href="tel:4387993007">438 799-3007</Link>
                            </Text>
                        </div>
                    </div>
                </div>
                <ContactForm />
            </div>
        </PageWrapper>
    )
}