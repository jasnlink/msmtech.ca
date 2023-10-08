import Image from "next/image";
import Text from "@/src/components/Text";
import { Blogs } from "@/src/_generated/graphql";

interface BlogTitleProps {
    blog: Blogs;
    lng: string;
}

export default function BlogTitle({ blog, lng }: BlogTitleProps) {
    return (
        <div className={`h-48 w-full flex items-center justify-center rounded-lg relative overflow-hidden`}>
            <Image
                src={blog?.featuredMedia?.url ?? `/assets/gradient-light-blue.jpg`}
                height={1600}
                width={900}
                alt={blog?.featuredMedia?.title ?? ``}
                className={`absolute inset-0 w-full h-auto shadow-lg border border-zinc-800 brightness-60`}
            />
            <Text variant={`h2`} tw={`text-center relative`}>{blog?.title}</Text>
        </div>
    )
}