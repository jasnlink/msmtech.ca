import HydratedPageWrapper from "@/src/components/HydratedPageWrapper";
import { getAllBlogs, queryClient } from "@/src/graphql/api";
import { dehydrate } from "@tanstack/react-query";
import Blogs from "./Blogs";

export default async function Page() {

    await queryClient.prefetchQuery(['blogs'], () => getAllBlogs())
    const dehydratedState = dehydrate(queryClient)

    return (
        <HydratedPageWrapper dehydratedState={dehydratedState} className={`py-24 md:py-32 xl:py-40 container mx-auto relative`}>
            <Blogs />
        </HydratedPageWrapper>
    )
}