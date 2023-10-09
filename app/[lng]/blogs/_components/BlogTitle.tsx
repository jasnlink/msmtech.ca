import Image from "next/image";
import Text from "@/src/components/Text";
import { Blogs } from "@/src/_generated/graphql";

interface BlogTitleProps {
    blog: Blogs;
    lng: string;
}

export default function BlogTitle({ blog, lng }: BlogTitleProps) {
    return (
        <div className={`h-48 w-full flex items-center justify-center rounded-lg relative overflow-hidden from-zinc-900 to-zinc-600 bg-gradient-to-r border border-zinc-800`}>
            {blog.featuredMedia && (
                <Image
                    src={blog?.featuredMedia?.url ?? ``}
                    height={1600}
                    width={900}
                    alt={blog?.featuredMedia?.title ?? ``}
                    className={`absolute inset-0 w-full h-auto shadow-lg brightness-60`}
                />
            )}
            <Text variant={`h2`} tw={`text-center relative`}>{blog?.title}</Text>
        </div>
    )
}