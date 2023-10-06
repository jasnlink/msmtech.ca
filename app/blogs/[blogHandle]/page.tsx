import { Blogs, GetAllBlogsQuery, GetPaginatedBlogPostsQuery } from "@/src/_generated/graphql";
import PageWrapper from "@/src/components/PageWrapper";
import Pagination from "@/src/components/Pagination";
import { getAllBlogs, getPaginatedBlogPosts, queryClient } from "@/src/graphql/api";
import { notFound, redirect } from "next/navigation";
import BlogTitle from "../_components/BlogTitle";
import PreviewBlogPost from "../_components/PreviewBlogPost";
import GetStartedToday from "@/src/components/GetStartedToday";

export default async function Page({
    params,
    searchParams
}:{
    params: { blogHandle: string };
    searchParams?: { [key: string]: string | string[] | undefined };
}) {

    if (!params.blogHandle) {
        return redirect('/blogs')
    }

    await queryClient.prefetchQuery<GetAllBlogsQuery>(['blogs'], () => getAllBlogs())

    const blogsData = queryClient.getQueryData<GetAllBlogsQuery>(['blogs'])
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

    await queryClient.prefetchQuery<GetPaginatedBlogPostsQuery>(['paginatedBlogPosts', selectedBlog[0]?.sys.id, page], () => getPaginatedBlogPosts({ id: selectedBlog[0]?.sys.id || '', skip: (page - 1) * postLimit }))
    const postsData = queryClient.getQueryData<GetPaginatedBlogPostsQuery>(['paginatedBlogPosts', selectedBlog[0]?.sys.id, page])

    return (
        <PageWrapper className={`py-24 md:py-32 xl:py-40 container mx-auto relative`}>
            <BlogTitle blog={blog as Blogs} />
            <div className={`mt-8 grid grid-cols-1 lg:grid-cols-3 gap-4`}>
                {postsData && (
                    <>
                        {postsData.blogPostsCollection?.items.map((blogPost, index, array) => (
                            <PreviewBlogPost key={blogPost?.sys.id} blog={blog as Blogs} data={blogPost} />
                        ))}
                    </>
                )}
            </div>
            <Pagination currentPage={page} totalPages={pageTotal} baseUrl={`/blogs/${blog?.handle}`} />
            <GetStartedToday />
        </PageWrapper>
    )
}