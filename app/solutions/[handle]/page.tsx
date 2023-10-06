import { useId, Fragment } from "react"
import { notFound } from "next/navigation"
import Text from "@/src/components/Text"
import PageWrapper from "@/src/components/PageWrapper"
import Button from "@/src/components/Button"
import Link from "next/link"
import { Metadata } from "next"
import { solutions } from "@/src/data"
import GetStartedToday from "@/src/components/GetStartedToday"

export async function generateStaticParams() {

    return solutions.map((solution) => ({
        handle: solution.handle,
    }))

}

interface GenerateMetadataProps {
    params: { handle: string; }
    searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata({
    params,
    searchParams
}:GenerateMetadataProps):Promise<Metadata> {
    const solutionMetadata = solutions.find(solution => solution.handle === params.handle)
    return {
        title: `${solutionMetadata?.title} | msmtech_`
    }
}

// Set this to false to return 404 if the handle doesn`t exist.
export const dynamicParams = false

export default function Page({
    params
}:{params: { handle: string }}) {

    const solutionsContentData = [
        {
            id: `0`,
            handle: `website-essentials`,
            title: `Website Essentials Solution: Your Launchpad for Online Presence`,
            content: [
                {
                    id: useId(),
                    type: `paragraph`,
                    data: `In the age of digitalization, having a website is crucial for businesses of all sizes. It serves as your digital storefront, the central hub for your online presence, and a platform to showcase your products or services. Our Website Essentials service has been carefully curated to help businesses establish their online presence swiftly and efficiently.`
                },
                {
                    id: useId(),
                    type: `paragraph`,
                    data: `With our service, you receive a professionally designed homepage and 2-3 custom content pages based on simple code-based templates. This layout is perfect for businesses looking for a basic showcase, enabling them to introduce their offerings, share their story, and connect with their target audience.`
                },
                {
                    id: useId(),
                    type: `paragraph`,
                    data: `In addition, the package includes fundamental communication tools. These tools can range from contact forms to email sign-ups, allowing you to interact with your customers effectively.`
                },
                {
                    id: useId(),
                    type: `paragraph`,
                    data: `A straightforward blog feature is also part of the package. Regularly publishing articles can boost your website's search engine ranking, enhance customer engagement, and position your brand as an industry authority.`
                },
                {
                    id: useId(),
                    type: `paragraph`,
                    data: `Our Website Essentials service is a cost-effective, time-efficient solution to kickstart your online journey. With a budget of CAD $1-7k and a turnaround time of approximately one month, you can have a professional, user-friendly website up and running.`
                }
            ]
        },
        {
            id: `1`,
            handle: `ecommerce-suite`,
            title: `Premium Ecommerce Suite Solution: Unlocking the Power of Online Selling`,
            content: [
                {
                    id: useId(),
                    type: `paragraph`,
                    data: `With the rise of online shopping, having a robust and user-friendly ecommerce platform has become essential for businesses looking to expand their reach and increase sales. Our Premium Ecommerce Suite is designed to empower businesses with a custom website featuring a streamlined online store or a tailored social selling platform.`
                },
                {
                    id: useId(),
                    type: `paragraph`,
                    data: `For businesses looking to sell products online, our Premium Ecommerce Suite offers a fully functional online store. This includes features such as product listings, shopping cart functionality, secure payment gateways, and order management tools. With our easy-to-use ecommerce solution, you can start selling your digital services or physical products effortlessly.`
                },
                {
                    id: useId(),
                    type: `paragraph`,
                    data: `Alternatively, if your business specializes in social selling, our suite provides a tailored platform to showcase and sell your unique products directly through social media channels. This enables you to leverage the power of social networks to reach a wider audience and drive sales.`
                },
                {
                    id: useId(),
                    type: `paragraph`,
                    data: `Our Premium Ecommerce Suite offers extensive customization options to ensure your online store aligns with your brand identity. From custom product layouts to personalized branding elements, we work closely with you to create a visually appealing and cohesive ecommerce experience for your customers.`
                },
                {
                    id: useId(),
                    type: `paragraph`,
                    data: `Experience the power of online selling with our Premium Ecommerce Suite. With a budget of CAD $2-10k and a timeframe of 1-2 months, you can establish a professional and high-performing ecommerce presence. Contact us today to learn more about our Premium Ecommerce Suite and start maximizing your online sales potential.`
                }
            ]
        },
        {
            id: `2`,
            handle: `enterprise-web-app`,
            title: `Enterprise Web App Solution: Unleash the Power of Customization and Integration`,
            content: [
                {
                    id: useId(),
                    type: `paragraph`,
                    data: `For businesses with unique needs and complex requirements, our Enterprise Web App Solution is the ultimate digital platform. Designed and built to meet your distinctive business needs, this solution offers a comprehensive suite of multi-functional modules, extensive custom functionalities, and seamless integrations.`
                },
                {
                    id: useId(),
                    type: `paragraph`,
                    data: `One of the key advantages of our Enterprise Web App Solution is its high level of customization. We work closely with you to understand your specific business processes and requirements, tailoring the platform to match your workflows and branding. From custom data structures and user interfaces to personalized reporting and analytics, every aspect of the solution is designed to align with your unique business needs.`
                },
                {
                    id: useId(),
                    type: `paragraph`,
                    data: `Integration is another core strength of our Enterprise Web App Solution. We seamlessly integrate with other essential business systems and tools, such as customer relationship management (CRM) software, enterprise resource planning (ERP) systems, and third-party APIs. This allows for streamlined data flow and increased operational efficiency across your organization.`
                },
                {
                    id: useId(),
                    type: `paragraph`,
                    data: `With the Enterprise Web App Solution, scalability is built-in. As your business grows and evolves, the platform can easily accommodate increased data volumes, user traffic, and feature requirements. Our solution is designed to be flexible and adaptable, ensuring it can support your business at every stage of its growth journey.`
                },
                {
                    id: useId(),
                    type: `paragraph`,
                    data: `Experience the power of customization, integration, and scalability with our Enterprise Web App Solution. With a budget of CAD $5-25k and a timeframe of 2-4 months, you can elevate your online presence and streamline your business operations. Contact us today to learn more about our Enterprise Web App Solution and embark on a digital transformation journey.`
                }
            ]
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
                <GetStartedToday />
            </PageWrapper>
        )
    }

}