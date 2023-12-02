import { validateSession } from "@/app/actions";
import prisma from "@/src/actions/database";
import Button from "@/src/components/Button";
import PageWrapper from "@/src/components/PageWrapper";
import Text from "@/src/components/Text";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import Logout from "./leads/add/_components/Logout";

export default async function DashboardPage({ params }: {
    params: {
        lng: string;
    }
}) {

    const sessionValidation = await validateSession()
    if (!sessionValidation) {
        redirect('/affiliates')
    }

    const leads = await getAllLeads()

    async function getAllLeads() {
        'use server'
        const cookieStore = cookies()
        const sessionStore = cookieStore.get('session-id')
        if (!sessionStore?.value) {
            return
        }
        const leadsData = await prisma.affiliateLead.findMany({
            where: {
                affiliateUser: {
                    session: {
                        id: sessionStore.value,
                        deleted: false,
                    }
                },
                deleted: false,
            }
        })
        return leadsData
    }

    const statusStates = {
        'Pending': <span className={`px-2 py-0.5 rounded-full bg-primary-400`}>Pending</span>,
        'Inactive': <span className={`px-2 py-1 rounded-full bg-red-400`}>Pending</span>,
        'Active': <span className={`px-2 py-1 rounded-full bg-green-400`}>Pending</span>,
    }

    return (
        <PageWrapper screenHeight={false}>
            <div className={`flex justify-between`}>
                <div className={`flex justify-start items-center gap-2`}>
                    <Logout />
                    <Text variant="h3">{`Affiliate Dashboard`}</Text>
                </div>
                {!!leads?.length && (
                    <div>
                        <Link href={`/${params.lng}/affiliates/dashboard/leads/add`} title={`Add a referral`} passHref legacyBehavior>
                            <Button size={`small`}>{`Add a referral`}</Button>
                        </Link>
                    </div>
                )}
            </div>
            {leads?.length ? (
                <div className={`mt-2 w-full overflow-auto`}>
                    <table className={`table-auto w-full border border-zinc-700 my-8 bg-zinc-950/40`}>
                        <thead className={`bg-zinc-900`}>
                            <tr className={`hover:bg-zinc-800 transition-all`}>
                                <th className={`border-zinc-700/80 border [&>p]:mb-0 py-2 px-4 font-bold`}>Shop</th>
                                <th className={`border-zinc-700/80 border [&>p]:mb-0 py-2 px-4 font-bold`}>Shop email</th>
                                <th className={`border-zinc-700/80 border [&>p]:mb-0 py-2 px-4 font-bold`}>App</th>
                                <th className={`border-zinc-700/80 border [&>p]:mb-0 py-2 px-4 font-bold`}>App plan</th>
                                <th className={`border-zinc-700/80 border [&>p]:mb-0 py-2 px-4 font-bold`}>Commission</th>
                                <th className={`border-zinc-700/80 border [&>p]:mb-0 py-2 px-4 font-bold`}>Status</th>
                                <th className={`border-zinc-700/80 border [&>p]:mb-0 py-2 px-4 font-bold`}>Effective date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leads.map((lead, index, array) => (
                                <tr key={lead.id} className={`hover:bg-zinc-800 transition-all`}>
                                    <td className={`border border-zinc-700/80 [&>p]:mb-0 py-2 px-4`}>{lead.shop}</td>
                                    <td className={`border border-zinc-700/80 [&>p]:mb-0 py-2 px-4`}>{lead.shopEmail}</td>
                                    <td className={`border border-zinc-700/80 [&>p]:mb-0 py-2 px-4`}>{lead.app}</td>
                                    <td className={`border border-zinc-700/80 [&>p]:mb-0 py-2 px-4`}>{lead.appPlan ?? `TBD`}</td>
                                    <td className={`border border-zinc-700/80 [&>p]:mb-0 py-2 px-4`}>{lead.commission ?? `TBD`}</td>
                                    <td className={`border border-zinc-700/80 [&>p]:mb-0 py-2 px-4`}>{statusStates[lead.status as keyof typeof statusStates]}</td>
                                    <td className={`border border-zinc-700/80 [&>p]:mb-0 py-2 px-4`}>{lead.effectiveDate ? `${lead.effectiveDate.toDateString()}` : `TBD`}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className={`mt-4 py-12 w-[500px] overflow-auto text-center`}>
                    <Text variant={`h4`}>No referrals yet.</Text>
                    <div className={`mt-8 flex justify-center items-center`}>
                        <Link href={`/${params.lng}/affiliates/dashboard/leads/add`} title={`Add a referral`} passHref legacyBehavior>
                            <Button size={`small`}>{`Add a referral`}</Button>
                        </Link>
                    </div>
                </div>
            )}
        </PageWrapper>
    )
}
