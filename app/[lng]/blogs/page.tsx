import { Blogs, GetAllBlogsQuery, GetPaginatedBlogPostsQuery } from "@/src/_generated/graphql";
import Button from "@/src/components/Button";
import GetStartedToday from "@/src/components/GetStartedToday";
import PageWrapper from "@/src/components/PageWrapper";
import { getAllBlogs, getPaginatedBlogPosts, queryClient } from "@/src/graphql/api";
import Link from "next/link";
import BlogTitle from "./_components/BlogTitle";
import PreviewBlogPost from "./_components/PreviewBlogPost";
import { unhookedTranslation, useTranslation } from "@/app/i18n"
import { Translation } from "@/src/models"
import type { Metadata, ResolvingMetadata } from 'next'

export const revalidate = 3600

// Generate metadata for SEO
interface GenerateMetaDataProps {
    params: { 
        lng: string;
    }
    searchParams: { [key: string]: string | string[] | undefined }
}
export async function generateMetadata(
    { params, searchParams }: GenerateMetaDataProps,
        parent: ResolvingMetadata
    ): Promise<Metadata> {

    // read route params
    const lng = params.lng
    const { t: t1 } = await unhookedTranslation(lng, 'global')
    const { t: t2 } = await unhookedTranslation(lng, 'pages/blogs')

    return {
        title: `${t2(`general.meta.title`)} - ${t1('general.meta.title')}`,
    }
}

export default async function Page({ params }: { params: { lng: string; } }) {

    await queryClient.prefetchQuery<GetAllBlogsQuery>(['blogs', params.lng], () => getAllBlogs({ locale: params.lng }))

    const blogsData = queryClient.getQueryData<GetAllBlogsQuery>(['blogs', params.lng])

    const postLimit = 3
    const blogPostDataQueryQueue: Promise<any>[] = []
    let postsData: {
        [key: string]: GetPaginatedBlogPostsQuery | undefined
    } = {}

    if (blogsData?.blogsCollection?.items && blogsData?.blogsCollection?.items.length) {
        for (let blog of blogsData?.blogsCollection?.items) {
            blogPostDataQueryQueue.push(queryClient.prefetchQuery<GetPaginatedBlogPostsQuery>(['paginatedBlogPosts', params.lng, blog?.sys.id, 1, postLimit], () => getPaginatedBlogPosts({ locale: params.lng, id: blog?.sys.id || '', limit: postLimit, skip: 0 })))
        }

        await Promise.all(blogPostDataQueryQueue)
    
        for (let blog of blogsData?.blogsCollection?.items) {
            if (blog?.sys.id) {
                postsData[blog?.sys.id] = (queryClient.getQueryData<GetPaginatedBlogPostsQuery>(['paginatedBlogPosts', params.lng, blog?.sys.id, 1, postLimit]))
            }
        }
    }

    const {t: tGlobal} = await useTranslation(params.lng, 'global')
    const {t: tBlogs} = await useTranslation(params.lng, 'pages/blogs')

    return (
        <PageWrapper className={`py-24 md:py-32 xl:py-40 container mx-auto relative`}>
            <div className={`flex flex-col gap-36`}>
                {blogsData?.blogsCollection?.items.map((blog, index, array) => (
                    <div key={blog?.sys.id}>
                        <BlogTitle blog={blog as Blogs} lng={params.lng} />
                        <div className={`mt-8 grid grid-cols-1 lg:grid-cols-3 gap-4`}>
                            {postsData[blog?.sys.id as string] && (
                                <>
                                    {postsData[blog?.sys.id as string]?.blogPostsCollection?.items.map((blogPost, index, array) => (
                                        <PreviewBlogPost
                                            key={blogPost?.sys.id}
                                            blog={blog}
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
                        <div className={`flex justify-center mt-8`}>
                            <Link href={`/${params.lng}/blogs/${blog?.handle}` ?? ``} title={tBlogs('general.read_more')} passHref legacyBehavior>
                                <Button size={`large`}>{tBlogs('general.read_more')}</Button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
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