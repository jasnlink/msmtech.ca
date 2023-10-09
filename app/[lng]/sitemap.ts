import { MetadataRoute } from "next"
import { solutionsStaticParams } from "@/src/data"
import { languages } from "../i18n/settings"
import { getAllBlogs, getPaginatedBlogPosts, queryClient } from "@/src/graphql/api"
import { GetAllBlogsQuery, GetPaginatedBlogPostsQuery } from "@/src/_generated/graphql"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

    let sitemap = []

    for (let lng of languages) {
        sitemap.push({
            url: `https://msmtech.ca/${lng}`,
            lastModified: new Date(),
        })
        sitemap.push({
            url: `https://msmtech.ca/${lng}/contact`,
            lastModified: new Date(),
        })
        sitemap.push({
            url: `https://msmtech.ca/${lng}/privacy-policy`,
            lastModified: new Date(),
        })
        sitemap.push({
            url: `https://msmtech.ca/${lng}/terms-of-service`,
            lastModified: new Date(),
        })
        sitemap.push({
            url: `https://msmtech.ca/${lng}/blogs`,
            lastModified: new Date(),
        })
        for(let solution of solutionsStaticParams) {
            sitemap.push({
                url: `https://msmtech.ca/${lng}/solutions/${solution.handle}`,
                lastModified: new Date(),
            })
        }
        const blogStaticRoutes = await generateBlogStaticRoutes(lng)
        for (let route of blogStaticRoutes) {
            console.log(`route`, route)
            sitemap.push({
                url: `https://msmtech.ca/${lng}/blogs/${route.blogHandle}`,
                lastModified: new Date(),
            })
        }
        const blogPostStaticRoutes = await generateBlogPostStaticRoutes(lng)
        for (let route of blogPostStaticRoutes) {
            sitemap.push({
                url: `https://msmtech.ca/${lng}/blogs/${route.blogHandle}/${route.postHandle}`,
                lastModified: new Date(),
            })
        }
    }

    async function generateBlogStaticRoutes(lng: string) {
        interface BlogRoute {
            blogHandle: string;
        }
        let staticRoutes: BlogRoute[] = []
        await queryClient.prefetchQuery<GetAllBlogsQuery>(['blogs', lng], () => getAllBlogs({ locale: lng }))
        const blogsData = queryClient.getQueryData<GetAllBlogsQuery>(['blogs', lng])
        if (!blogsData?.blogsCollection?.items.length) {
            return staticRoutes
        }
        for (let blog of blogsData.blogsCollection.items) {
            if (blog?.handle) {
                staticRoutes.push({
                    blogHandle: blog?.handle
                })
            }
        }
        return staticRoutes
    }

    async function generateBlogPostStaticRoutes(lng: string) {
        interface BlogPostRoute {
            blogHandle: string;
            postHandle: string;
        }

        let staticRoutes: BlogPostRoute[] = []
    

        await queryClient.prefetchQuery<GetAllBlogsQuery>(['blogs', lng], () => getAllBlogs({ locale: lng }))
        const blogsData = queryClient.getQueryData<GetAllBlogsQuery>(['blogs', lng])

        // Temporary fix before talking with the Contentful team about linkedFrom showing no results when changing locales
        await queryClient.prefetchQuery<GetAllBlogsQuery>(['blogs', 'en'], () => getAllBlogs({ locale: 'en' }))
        const fallbackBlogsData = queryClient.getQueryData<GetAllBlogsQuery>(['blogs', 'en'])

        if (!blogsData?.blogsCollection?.items.length) {
            return staticRoutes
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

        return staticRoutes
    }

    return sitemap
}