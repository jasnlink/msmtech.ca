'use client'
import { useQuery } from "@tanstack/react-query"
import { getAllBlogs } from "@/src/graphql/api"
import ContentContainer from "@/src/components/ContentContainer"
import { BlogsCollection, GetAllBlogsQuery } from "@/src/_generated/graphql"
import Text from "@/src/components/Text"
import Image from "next/image"
import Button from "@/src/components/Button"
import Link from "next/link"

export default function Blogs() {
    const { data } = useQuery<GetAllBlogsQuery, BlogsCollection>(['blogs'], () => getAllBlogs())
    console.log(`data`, data)
    return (
        <>
            <div className={`flex flex-col gap-36`}>
                {data?.blogsCollection?.items.map((blog, index, array) => (
                    <div key={blog?.sys.id}>
                        <div className={`h-64 w-full flex items-center justify-center rounded-lg relative overflow-hidden`}>
                            <Image
                                src={blog?.featuredMedia?.url ?? `/gradient-light-blue.jpg`}
                                height={1600}
                                width={900}
                                alt={blog?.featuredMedia?.title ?? ``}
                                className={`absolute inset-0 w-full h-auto shadow-lg border border-zinc-800 brightness-60`}
                            />
                            <Text variant={`h2`} tw={`relative`}>{blog?.title}</Text>
                        </div>
                        <div className={`mt-8 grid grid-cols-3 gap-4`}>
                            <ContentContainer key={blog?.sys.id}>
                                <Image
                                    src={blog?.featuredMedia?.url ?? `/logo-splash-black.svg`}
                                    height={1600}
                                    width={900}
                                    alt={blog?.featuredMedia?.title ?? ``}
                                    className={`w-full h-auto shadow-lg border border-zinc-800 rounded-lg`}
                                />
                                <Text variant={`h3`} tw={`mt-8`}>blog post title</Text>
                                <Text tw={`mt-4`}>blog post summary blog post summary blog post summary blog post summary blog post summary</Text>
                                <Link href="/contact" title="Read more" className={`mt-8 block w-fit`}><Text>Read more</Text></Link>
                            </ContentContainer>
                            <ContentContainer key={blog?.sys.id}>
                                <Image
                                    src={blog?.featuredMedia?.url ?? `/logo-splash-black.svg`}
                                    height={1600}
                                    width={900}
                                    alt={blog?.featuredMedia?.title ?? ``}
                                    className={`w-full h-auto shadow-lg border border-zinc-800 rounded-lg`}
                                />
                                <Text variant={`h3`} tw={`mt-8`}>blog post title</Text>
                                <Text tw={`mt-4`}>blog post summary blog post summary blog post summary blog post summary blog post summary</Text>
                                <Link href="/contact" title="Read more" className={`mt-8 block w-fit`}><Text>Read more</Text></Link>
                            </ContentContainer>
                            <ContentContainer key={blog?.sys.id}>
                                <Image
                                    src={blog?.featuredMedia?.url ?? `/logo-splash-black.svg`}
                                    height={1600}
                                    width={900}
                                    alt={blog?.featuredMedia?.title ?? ``}
                                    className={`w-full h-auto shadow-lg border border-zinc-800 rounded-lg`}
                                />
                                <Text variant={`h3`} tw={`mt-8`}>blog post title</Text>
                                <Text tw={`mt-4`}>blog post summary blog post summary blog post summary blog post summary blog post summary</Text>
                                <Link href="/contact" title="Read more" className={`mt-8 block w-fit`}><Text>Read more</Text></Link>
                            </ContentContainer>
                        </div>
                    </div>
                ))}
                {/* {data?.blogsCollection?.items.map((blog, index, array) => (
                    <ContentContainer key={blog?.sys.id} p={`none`}>
                        <div className={`grid grid-cols-2`}>
                            <div>
                                <Image
                                    src={blog?.featuredMedia?.url ?? `/gradient-light-blue.jpg`}
                                    height={1600}
                                    width={900}
                                    alt={blog?.featuredMedia?.title ?? ``}
                                    className="relative w-full h-auto shadow-lg border border-zinc-800"
                                />
                            </div>
                            <div>
                                <Text variant={`h3`}>{blog?.title}</Text>
                            </div>
                        </div>
                    </ContentContainer>
                ))} */}
            </div>
        </>
    )
}