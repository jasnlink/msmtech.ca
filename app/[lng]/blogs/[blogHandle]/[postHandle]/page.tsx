import { GetAllBlogsQuery, GetBlogPostByHandleQuery, GetPaginatedBlogPostsQuery } from "@/src/_generated/graphql"
import GetStartedToday from "@/src/components/GetStartedToday"
import { ArrowLeftIcon } from "@/src/components/Icon"
import Loader from "@/src/components/Loader"
import PageWrapper from "@/src/components/PageWrapper"
import Text from "@/src/components/Text"
import { getAllBlogs, getBlogPostByHandle, getPaginatedBlogPosts, queryClient } from "@/src/graphql/api"
import { Options, documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { BLOCKS, MARKS } from "@contentful/rich-text-types"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { unhookedTranslation, useTranslation } from "@/app/i18n"
import type { Metadata, ResolvingMetadata } from 'next'
import { Translation } from "@/src/models"
import { languages } from "@/app/i18n/settings";

// Set this to false to return 404 if the handle doesn`t exist.
export const dynamicParams = false
export const revalidate = 3600

export async function generateStaticParams() {
    interface BlogPostRoute {
        blogHandle: string;
        postHandle: string;
    }
    let staticRoutes: BlogPostRoute[] = []

    for (let lng of languages) {
        await queryClient.prefetchQuery<GetAllBlogsQuery>(['blogs', lng], () => getAllBlogs({ locale: lng }))
        const blogsData = queryClient.getQueryData<GetAllBlogsQuery>(['blogs', lng])

        // Temporary fix before talking with the Contentful team about linkedFrom showing no results when changing locales
        await queryClient.prefetchQuery<GetAllBlogsQuery>(['blogs', 'en'], () => getAllBlogs({ locale: 'en' }))
        const fallbackBlogsData = queryClient.getQueryData<GetAllBlogsQuery>(['blogs', 'en'])

        if (!blogsData?.blogsCollection?.items.length) {
            continue
        }
        for (let blog of blogsData.blogsCollection.items) {

            // Use EN fallback blog to get the number of linkedFrom items to do pagination
            // Because switching locales seems to return 0 items even though they are linked
            const fallbackSelectedBlog = fallbackBlogsData?.blogsCollection?.items.filter(fallbackBlog => fallbackBlog?.handle === blog?.handle)

            const postLimit = 6
            let pageTotal = 1

            if (fallbackSelectedBlog && fallbackSelectedBlog.length && fallbackSelectedBlog[0]?.linkedFrom?.blogPostsCollection?.total) {
                pageTotal = Math.ceil(fallbackSelectedBlog[0]?.linkedFrom?.blogPostsCollection?.total / postLimit)
            }

            for (let p = 1; p <= pageTotal; p++) {
                await queryClient.prefetchQuery<GetPaginatedBlogPostsQuery>(['paginatedBlogPosts', lng, blog?.sys.id, p, postLimit], () => getPaginatedBlogPosts({ locale: lng, id: blog?.sys.id || '', limit: postLimit, skip: (p - 1) * postLimit }))
                const postsData = queryClient.getQueryData<GetPaginatedBlogPostsQuery>(['paginatedBlogPosts', lng, blog?.sys.id, p, postLimit])
                if (postsData && postsData.blogPostsCollection?.items.length) {
                    for (let post of postsData?.blogPostsCollection?.items) {
                        if (blog?.handle && post?.handle) {
                            staticRoutes.push({
                                blogHandle: blog?.handle,
                                postHandle: post?.handle
                            })
                        }
                    }
                }
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
        postHandle: string;
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

    await queryClient.prefetchQuery<GetBlogPostByHandleQuery>(['blogPost', params.lng, params.blogHandle, params.postHandle], () => getBlogPostByHandle({ locale: params.lng, blogHandle: params.blogHandle, postHandle: params.postHandle }))
    const postData = queryClient.getQueryData<GetBlogPostByHandleQuery>(['blogPost', params.lng, params.blogHandle, params.postHandle])
    
    if (!postData?.blogPostsCollection?.items.length) {
        return {
            title: `${t('general.meta.title')}`,
        }
    }
    
    const selectedPost = postData?.blogPostsCollection?.items[0]
    
    return {
        title: `${selectedPost?.seoTitle ? selectedPost?.seoTitle : selectedPost?.title} - ${t('general.meta.title')}`,
        description: `${selectedPost?.seoDescription ? selectedPost?.seoDescription : ``}`
    }
}

export default async function Page({
    params
}:{
    params: {
        lng: string;
        blogHandle: string;
        postHandle: string;
    }
}) {

    const {t: tGlobal} = await useTranslation(params.lng, 'global')
    const {t: tBlogs} = await useTranslation(params.lng, 'pages/blogs')

    await queryClient.prefetchQuery<GetBlogPostByHandleQuery>(['blogPost', params.lng, params.blogHandle, params.postHandle], () => getBlogPostByHandle({ locale: params.lng, blogHandle: params.blogHandle, postHandle: params.postHandle }))
    const postData = queryClient.getQueryData<GetBlogPostByHandleQuery>(['blogPost', params.lng, params.blogHandle, params.postHandle])

    if (!postData?.blogPostsCollection?.items.length) {
        notFound()
    }

    const post = postData?.blogPostsCollection?.items[0]

    let postContentAssets: {
        [key: string]: {
            title: string;
            url: string;
        };
    } = {}

    if (post?.content?.links.assets.block.length) {
        postContentAssets = Object.fromEntries(post?.content?.links.assets.block.map((assetBlock) => [assetBlock?.sys.id, { url: assetBlock?.url, title: assetBlock?.title }]))
    }

    const renderOptions: Options = {
        renderNode: {
            [BLOCKS.HEADING_2]: (node, children) => <Text variant={`h3`} tw={`mb-4`}>{children}</Text>,
            [BLOCKS.HEADING_3]: (node, children) => <Text variant={`h5`} tw={`mb-2`}>{children}</Text>,
            [BLOCKS.PARAGRAPH]: (node, children) => <Text variant={`body1`} tw={`mb-8`}>{children}</Text>,
            [BLOCKS.HR]: (node, children) => <hr className={`my-4`} />,
            [BLOCKS.TABLE]: (node, children) => <table className={`w-full table-auto border border-zinc-700 my-8`}><tbody>{children}</tbody></table>,
            [BLOCKS.TABLE_HEADER_CELL]: (node, children) => <td className={`border border-zinc-700 [&>p]:mb-0 py-2 px-4 font-bold`}>{children}</td>,
            [BLOCKS.TABLE_CELL]: (node, children) => <td className={`border border-zinc-700 [&>p]:mb-0 py-2 px-4`}>{children}</td>,
            [BLOCKS.UL_LIST]: (node, children) => <ul className={`pl-4 list-disc mb-8`}>{children}</ul>,
            [BLOCKS.OL_LIST]: (node, children) => <ol className={`pl-4 list-decimal mb-8`}>{children}</ol>,
            [BLOCKS.LIST_ITEM]: (node, children) => <li className={`[&>p]:mb-2`}>{children}</li>,
            [BLOCKS.EMBEDDED_ASSET]: (node, children) => {
                return (<Image
                    src={postContentAssets[node.data.target.sys.id].url ?? ``}
                    height={1600}
                    width={900}
                    alt={postContentAssets[node.data.target.sys.id].title ?? ``}
                    className={`my-4 w-full h-auto shadow-lg rounded-lg`}
                />)
            },
        },
        renderMark: {
            [MARKS.CODE]: (text) => <code className={`inline-block py-1 px-2 from-zinc-950 to-zinc-900 rounded-lg bg-gradient-to-tr border border-zinc-800 whitespace-pre-line text-base tracking-tight font-extralight`}>{text}</code>,
        }
    }

    const PostContent = documentToReactComponents(post?.content?.json, renderOptions)
    return (
        <PageWrapper className={`py-24 md:py-32 xl:py-40 lg:w-3/4 xl:w-1/2 container mx-auto relative`}>
            {!!!post && (
                <Loader />
            )}
            {post && (
                <>
                    <Link href={`/${params.lng}/blogs/${post?.blog?.handle}`} title={`${tBlogs('general.back')} ${post?.blog?.title}`} className={`mb-2 flex gap-1 items-center w-fit group px-4 py-1 transition-all rounded-lg hover:bg-zinc-700/90`}><ArrowLeftIcon className={`fill-white h-6 w-auto transition-all group-hover:-translate-x-0.5`} /><Text>{`${tBlogs('general.back')} ${post?.blog?.title}`}</Text></Link>
                    <Image
                        src={post.featuredImage?.url ?? `/assets/logo-splash-black.svg`}
                        height={1600}
                        width={900}
                        alt={post.featuredImage?.title ?? ``}
                        className={`w-full h-auto aspect-video shadow-lg border border-zinc-800 rounded-lg`}
                    />
                    <Text variant={`h1`} tw={`mt-8 mb-12`}>{post?.title}</Text>
                    {PostContent}
                </>
            )}
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