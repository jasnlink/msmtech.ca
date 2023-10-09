import { unhookedTranslation, useTranslation } from "@/app/i18n";
import { languages } from "@/app/i18n/settings";
import { Blogs, GetAllBlogsQuery, GetPaginatedBlogPostsQuery } from "@/src/_generated/graphql";
import GetStartedToday from "@/src/components/GetStartedToday";
import PageWrapper from "@/src/components/PageWrapper";
import Pagination from "@/src/components/Pagination";
import { getAllBlogs, getPaginatedBlogPosts, queryClient } from "@/src/graphql/api";
import type { Metadata, ResolvingMetadata } from 'next';
import { notFound, redirect } from "next/navigation";
import BlogTitle from "../_components/BlogTitle";
import PreviewBlogPost from "../_components/PreviewBlogPost";

// Set this to false to return 404 if the handle doesn`t exist.
export const dynamicParams = false
export const revalidate = 3600

export async function generateStaticParams() {
    interface BlogRoute {
        blogHandle: string;
    }
    let staticRoutes: BlogRoute[] = []

    for (let lng of languages) {
        await queryClient.prefetchQuery<GetAllBlogsQuery>(['blogs', lng], () => getAllBlogs({ locale: lng }))
        const blogsData = queryClient.getQueryData<GetAllBlogsQuery>(['blogs', lng])

        if (!blogsData?.blogsCollection?.items.length) {
            continue
        }
        for (let blog of blogsData.blogsCollection.items) {
            if (blog?.handle) {
                staticRoutes.push({
                    blogHandle: blog?.handle
                })
            }
        }
    }
    return staticRoutes
}

// Generate metadata for SEO
interface GenerateMetaDataProps {
    params: { 
        lng: string;
        blogHandle: string;
    }
    searchParams: { [key: string]: string | string[] | undefined }
}
export async function generateMetadata(
    { params, searchParams }: GenerateMetaDataProps,
        parent: ResolvingMetadata
    ): Promise<Metadata> {

    // read route params
    const lng = params.lng
    const { t } = await unhookedTranslation(lng, 'global')

    await queryClient.prefetchQuery<GetAllBlogsQuery>(['blogs', params.lng], () => getAllBlogs({ locale: params.lng }))
    
    const blogsData = queryClient.getQueryData<GetAllBlogsQuery>(['blogs', params.lng])
    const selectedBlog = blogsData?.blogsCollection?.items.filter(blog => blog?.handle === params.blogHandle)

    if (!selectedBlog?.length) {
        return {
            title: `${t('general.meta.title')}`,
        }
    }

    return {
        title: `${selectedBlog[0]?.seoTitle ? selectedBlog[0]?.seoTitle : selectedBlog[0]?.title} - ${t('general.meta.title')}`,
        description: `${selectedBlog[0]?.seoDescription ? selectedBlog[0]?.seoDescription : selectedBlog[0]?.description ? selectedBlog[0]?.description : ``}`
    }
}

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
    const {t: tBlogs} = await useTranslation(params.lng, 'pages/blogs')

    if (!params.blogHandle) {
        return redirect('/blogs')
    }

    await queryClient.prefetchQuery<GetAllBlogsQuery>(['blogs', params.lng], () => getAllBlogs({ locale: params.lng }))
    
    const blogsData = queryClient.getQueryData<GetAllBlogsQuery>(['blogs', params.lng])
    const selectedBlog = blogsData?.blogsCollection?.items.filter(blog => blog?.handle === params.blogHandle)
    
    // Temporary fix before talking with the Contentful team about linkedFrom showing no results when changing locales
    await queryClient.prefetchQuery<GetAllBlogsQuery>(['blogs', 'en'], () => getAllBlogs({ locale: 'en' }))
    const fallbackBlogsData = queryClient.getQueryData<GetAllBlogsQuery>(['blogs', 'en'])
    const fallbackSelectedBlog = fallbackBlogsData?.blogsCollection?.items.filter(blog => blog?.handle === params.blogHandle)

    if (!selectedBlog?.length) {
        return notFound()
    }

    const blog = selectedBlog[0]

    let page = 1
    const postLimit = 6
    let pageTotal = 1

    // Commented out for after the fix
    // if (blog?.linkedFrom?.blogPostsCollection?.total) {
    //     pageTotal = Math.ceil(blog?.linkedFrom?.blogPostsCollection?.total / postLimit)
    // }

    if (fallbackSelectedBlog && fallbackSelectedBlog.length && fallbackSelectedBlog[0]?.linkedFrom?.blogPostsCollection?.total) {
        pageTotal = Math.ceil(fallbackSelectedBlog[0]?.linkedFrom?.blogPostsCollection?.total / postLimit)
    }
    
    if (searchParams && searchParams.page) {
        page = parseInt(searchParams.page.toString(), 10)
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
                            <PreviewBlogPost
                                key={blogPost?.sys.id}
                                blog={blog as Blogs}
                                data={blogPost}
                                lng={params.lng}
                                t={
                                    {
                                        Blogs: tBlogs('general', {returnObjects: true})
                                    }
                                }
                            />
                        ))}
                    </>
                )}
            </div>
            <Pagination
                currentPage={page}
                totalPages={pageTotal}
                baseUrl={`/blogs/${blog?.handle}`}
                lng={params.lng}
            />
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