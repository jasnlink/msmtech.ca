import PageWrapper from "@/src/components/PageWrapper"
import Text from "@/src/components/Text"
import { useId, Fragment } from "react"


export default function Page() {
    const privacyPolicyData = {
        id: `0`,
        handle: `privacy-policy`,
        title: `Privacy Policy`,
        content: [
            {
                id: useId(),
                type: `paragraph`,
                data: `Last Updated: 2023-09-30.`
            },
            {
                id: useId(),
                type: `paragraph`,
                data: `MSM Technologies values your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information. By using this website, you consent to the practices described in this policy.`
            },
            {
                id: useId(),
                type: `paragraph`,
                data: `Information Collection: We collect personal information through our contact form where we gather your name and email address. Additionally, we use Google Analytics 4 to track and analyze website usage and visitor behavior.`
            },
            {
                id: useId(),
                type: `paragraph`,
                data: `Information Usage: The information collected is used to respond to inquiries, improve our website, and enhance user experience. By default, all emails collected will be subscribed to our email newsletter unless you opt out.`
            },
            {
                id: useId(),
                type: `paragraph`,
                data: `Information Sharing and Disclosure: We do not share your personal information with third parties without your consent, except to comply with laws or to protect our rights.`
            },
            {
                id: useId(),
                type: `paragraph`,
                data: `Information Security: We employ reasonable security measures to protect your information from unauthorized access, alteration, or disclosure.`
            },
            {
                id: useId(),
                type: `paragraph`,
                data: `User Rights: You can change or update your information by contacting us at contact@msmtech.ca.`
            },
            {
                id: useId(),
                type: `paragraph`,
                data: `Cookie Policy: We use cookies to enhance website functionality and analyze website usage through Google Analytics 4.`
            },
            {
                id: useId(),
                type: `paragraph`,
                data: `Contact Information: If you have any questions regarding this Privacy Policy, contact us at contact@msmtech.ca.`
            },
            {
                id: useId(),
                type: `paragraph`,
                data: `Updates to the Privacy Policy: We may update this Privacy Policy from time to time. We encourage you to review this policy periodically to stay informed about our privacy practices.`
            },
        ],
    }
    return (
        <PageWrapper className="py-24 md:py-32 xl:py-40 lg:w-3/4 xl:w-1/2 container mx-auto relative">
            <Text variant="h2">{privacyPolicyData.title}</Text>
            <div className="mt-12">
                {privacyPolicyData.content.map((block) => (
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
