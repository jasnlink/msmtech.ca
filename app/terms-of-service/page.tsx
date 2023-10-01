import PageWrapper from "@/src/components/PageWrapper"
import Text from "@/src/components/Text"
import { useId, Fragment } from "react"

export default function Page() {

    const termsOfServiceData = {
        id: `0`,
        handle: `terms-of-service`,
        title: `Terms of Service`,
        content: [
            {
                id: useId(),
                type: `paragraph`,
                data: `By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.`
            },
            {
                id: useId(),
                type: `paragraph`,
                data: `Services: MSM Technologies provides a range of web services including but not limited to web application development, website design and maintenance, and blog hosting.`
            },
            {
                id: useId(),
                type: `paragraph`,
                data: `User Responsibilities: Users agree not to engage in illegal activities or conduct that violates any applicable laws or regulations while using our services.`
            },
            {
                id: useId(),
                type: `paragraph`,
                data: `Intellectual Property: All intellectual properties including trademarks, logos, and content belong to their respective owners.`
            },
            {
                id: useId(),
                type: `paragraph`,
                data: `Privacy: Our Privacy Policy, which is incorporated here by reference, explains how we collect and use your personal information.`
            },
            {
                id: useId(),
                type: `paragraph`,
                data: `Limitation of Liability and Disclaimer of Warranties: MSM Technologies disclaims all warranties and will not be liable for any damages or loss arising from the use of our services.`
            },
            {
                id: useId(),
                type: `paragraph`,
                data: `Indemnification: Users agree to indemnify and hold harmless MSM Technologies from any claims or damages resulting from the misuse of our services.`
            },
            {
                id: useId(),
                type: `paragraph`,
                data: `Governing Law: These terms shall be governed by the laws of Quebec, Canada.`
            },
            {
                id: useId(),
                type: `paragraph`,
                data: `Changes to the Terms of Service: MSM Technologies reserves the right to modify these terms at any time. It's advised to review this page periodically for any updates.`
            },
            {
                id: useId(),
                type: `paragraph`,
                data: `Contact: If you have any questions regarding these Terms of Service, contact us at contact@msmtech.ca.`
            },
        ],
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
