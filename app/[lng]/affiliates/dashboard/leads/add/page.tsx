import prisma from "@/src/actions/database";
import Button from "@/src/components/Button";
import Text from "@/src/components/Text";
import Link from "next/link";
import LeadsForm from "./_components/LeadsForm";
import { ArrowLeftIcon } from "@/src/components/Icon";
import PageWrapper from "@/src/components/PageWrapper";

export default async function AddLeadsPage({ params }: {
    params: {
        lng: string;
    }
}) {

    return (
        <PageWrapper screenHeight={false}>
            <div className={`w-96`}>
                <div className={`flex justify-start items-center gap-2`}>
                    <Link href={`/${params.lng}/affiliates/dashboard`} className={`flex gap-1 items-center w-fit group px-2 py-1 transition-all rounded-lg hover:bg-zinc-700/90 active:bg-zinc-500/90`}>
                        <ArrowLeftIcon className={`fill-white h-6 w-auto transition-all group-hover:-translate-x-0.5`} />
                    </Link>
                    <Text variant="h3">{`Add a referral`}</Text>
                </div>
                <div className={`mt-8`}>
                    <LeadsForm
                        lng={params.lng}
                    />
                </div>
            </div>
        </PageWrapper>
    )
}
