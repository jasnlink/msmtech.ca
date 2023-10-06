import { GetBlogPostByHandleQuery } from "@/src/_generated/graphql"
import GetStartedToday from "@/src/components/GetStartedToday"
import { ArrowLeftIcon } from "@/src/components/Icon"
import Loader from "@/src/components/Loader"
import PageWrapper from "@/src/components/PageWrapper"
import Text from "@/src/components/Text"
import { getBlogPostByHandle, queryClient } from "@/src/graphql/api"
import { Options, documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { BLOCKS, MARKS } from "@contentful/rich-text-types"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

export default async function Page({
    params
}:{
    params: {
        blogHandle: string;
        postHandle: string;
    }
}) {

    await queryClient.prefetchQuery<GetBlogPostByHandleQuery>(['blogPost', params.blogHandle, params.postHandle], () => getBlogPostByHandle({ blogHandle: params.blogHandle, postHandle: params.postHandle }))
    const postData = queryClient.getQueryData<GetBlogPostByHandleQuery>(['blogPost', params.blogHandle, params.postHandle])

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
                    <Link href={`/blogs/${post?.blog?.handle}`} title={`Back to ${post?.blog?.title}`} className={`mb-2 flex gap-1 items-center w-fit group px-4 py-1 transition-all rounded-lg hover:bg-zinc-700/90`}><ArrowLeftIcon className={`fill-white h-6 w-auto transition-all group-hover:-translate-x-0.5`} /><Text>{`Back to ${post?.blog?.title}`}</Text></Link>
                    <Image
                        src={post.featuredImage?.url ?? `/logo-splash-black.svg`}
                        height={1600}
                        width={900}
                        alt={post.featuredImage?.title ?? ``}
                        className={`w-full h-auto aspect-video shadow-lg border border-zinc-800 rounded-lg`}
                    />
                    <Text variant={`h1`} tw={`mt-8 mb-12`}>{post?.title}</Text>
                    {PostContent}
                </>
            )}
            <GetStartedToday />
        </PageWrapper>
    )
}