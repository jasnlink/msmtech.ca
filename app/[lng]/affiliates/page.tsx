import { validateSession } from "@/app/actions";
import ContentContainer from "@/src/components/ContentContainer";
import PageWrapper from "@/src/components/PageWrapper";
import Text from "@/src/components/Text";
import { redirect } from "next/navigation";
import AffiliateForm from "./_components/AffiliateForm";

export default async function AffiliatePage({ params }: {
    params: {
        lng: string;
    }
}) {

    const sessionValidation = await validateSession()
    if (sessionValidation) {
        redirect('/affiliates/dashboard')
    }

    return (
        <PageWrapper className={`py-32 md:py-32 xl:py-40 container mx-auto relative`}>
            <ContentContainer className={`max-w-lg mx-auto`}>
                <div className={`text-center py-4 xl:py-12 xl:px-8`}>
                    <Text variant={`h2`}>Affiliate Portal</Text>
                    <div className={`mt-8 xl:mt-16`}>
                        <AffiliateForm
                            lng={params.lng}
                        />
                    </div>
                    <div className={`mt-4 xl:mt-8`}>
                        <Text variant={`body2`}>We will send you 6-digit login code to your email.</Text>
                        <Text variant={`body2`}>Use it to log in.</Text>
                    </div>
                </div>
            </ContentContainer>
        </PageWrapper>
    )
}