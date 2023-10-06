import { Blogs, GetAllBlogsQuery } from "@/src/_generated/graphql";
import Button from "@/src/components/Button";
import GetStartedToday from "@/src/components/GetStartedToday";
import PageWrapper from "@/src/components/PageWrapper";
import { getAllBlogs, queryClient } from "@/src/graphql/api";
import Link from "next/link";
import BlogTitle from "./_components/BlogTitle";
import PreviewBlogPost from "./_components/PreviewBlogPost";

export default async function Page() {

    await queryClient.prefetchQuery<GetAllBlogsQuery>(['blogs'], () => getAllBlogs())

    const blogsData = queryClient.getQueryData<GetAllBlogsQuery>(['blogs'])

    return (
        <PageWrapper className={`py-24 md:py-32 xl:py-40 container mx-auto relative`}>
            <div className={`flex flex-col gap-36`}>
                {blogsData?.blogsCollection?.items.map((blog, index, array) => (
                    <div key={blog?.sys.id}>
                        <BlogTitle blog={blog as Blogs} />
                        <div className={`mt-8 grid grid-cols-1 lg:grid-cols-3 gap-4`}>
                            {blog?.linkedFrom && (
                                <>
                                    {blog?.linkedFrom?.blogPostsCollection?.items?.map((blogPost, index, array) => (
                                        <PreviewBlogPost key={blogPost?.sys.id} blog={blog} data={blogPost} />
                                    ))}
                                </>
                            )}
                        </div>
                        <div className={`flex justify-center mt-8`}>
                            <Link href={`/blogs/${blog?.handle}` ?? ``} title="Read more" passHref legacyBehavior>
                                <Button size={`large`}>Read more</Button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
            <GetStartedToday />
        </PageWrapper>
    )
}