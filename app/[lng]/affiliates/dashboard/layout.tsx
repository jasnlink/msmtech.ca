import { validateSession } from "@/app/actions";
import ContentContainer from "@/src/components/ContentContainer";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function DashboardLayout({ params, children }: {
    params: {
        lng: string;
    },
    children: ReactNode;
}) {

    const sessionValidation = await validateSession()
    if (!sessionValidation) {
        redirect('/affiliates')
    }

    return (
        <div className="py-24 md:py-32 xl:py-40 w-fit container mx-auto relative">
            <ContentContainer>
                {children}
            </ContentContainer>
        </div>
    )
}
