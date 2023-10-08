import { Blogs, GetAllBlogsQuery, GetPaginatedBlogPostsQuery } from "@/src/_generated/graphql";
import PageWrapper from "@/src/components/PageWrapper";
import Pagination from "@/src/components/Pagination";
import { getAllBlogs, getPaginatedBlogPosts, queryClient } from "@/src/graphql/api";
import { notFound, redirect } from "next/navigation";
import BlogTitle from "../_components/BlogTitle";
import PreviewBlogPost from "../_components/PreviewBlogPost";
import GetStartedToday from "@/src/components/GetStartedToday";
import { unhookedTranslation, useTranslation } from "@/app/i18n"
import { Translation } from "@/src/models"

export default async function Page({
    params,
    searchParams
}:{
    params: {
        lng: string; 
        blogHandle: string; 
    };
    searchParams?: { [key: string]: string | string[] | undefined };
}) {

    const {t: tGlobal} = await useTranslation(params.lng, 'global')

    if (!params.blogHandle) {
        return redirect('/blogs')
    }

    await queryClient.prefetchQuery<GetAllBlogsQuery>(['blogs', params.lng], () => getAllBlogs({ locale: params.lng }))

    const blogsData = queryClient.getQueryData<GetAllBlogsQuery>(['blogs', params.lng])
    const selectedBlog = blogsData?.blogsCollection?.items.filter(blog => blog?.handle === params.blogHandle)

    if (!selectedBlog?.length) {
        return notFound()
    }

    const blog = selectedBlog[0]

    let page = 1
    const postLimit = 6
    let pageTotal = 1
    if (blog?.linkedFrom?.blogPostsCollection?.total) {
        pageTotal = Math.ceil(blog?.linkedFrom?.blogPostsCollection?.total / postLimit)
    }
    
    if (searchParams && searchParams.page) {
        page = parseInt(searchParams.page as string, 10)
    }

    await queryClient.prefetchQuery<GetPaginatedBlogPostsQuery>(['paginatedBlogPosts', params.lng, selectedBlog[0]?.sys.id, page, postLimit], () => getPaginatedBlogPosts({ locale: params.lng, id: selectedBlog[0]?.sys.id || '', limit: postLimit, skip: (page - 1) * postLimit }))
    const postsData = queryClient.getQueryData<GetPaginatedBlogPostsQuery>(['paginatedBlogPosts', params.lng, selectedBlog[0]?.sys.id, page, postLimit])

    return (
        <PageWrapper className={`py-24 md:py-32 xl:py-40 container mx-auto relative`}>
            <BlogTitle blog={blog as Blogs} lng={params.lng} />
            <div className={`mt-8 grid grid-cols-1 lg:grid-cols-3 gap-4`}>
                {postsData && (
                    <>
                        {postsData.blogPostsCollection?.items.map((blogPost, index, array) => (
                            <PreviewBlogPost key={blogPost?.sys.id} blog={blog as Blogs} data={blogPost} lng={params.lng} />
                        ))}
                    </>
                )}
            </div>
            <Pagination currentPage={page} totalPages={pageTotal} baseUrl={`/blogs/${blog?.handle}`} lng={params.lng} />
            <GetStartedToday
                lng={params.lng}
                t={
                    {
                        GetStartedToday: tGlobal('components.GetStartedToday', {returnObjects: true})
                    }
                }
            />
        </PageWrapper>
    )
}