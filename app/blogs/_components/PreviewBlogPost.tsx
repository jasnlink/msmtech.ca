'use client'
import { GetAllBlogsCollectionLinkedFromFieldsFragment, GetAllBlogsCollectionQueryFieldsFragment } from "@/src/_generated/graphql";
import ContentContainer from "@/src/components/ContentContainer";
import PageWrapper from "@/src/components/PageWrapper";
import Text from "@/src/components/Text";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@/src/components/Icon";

interface PreviewBlogPostProps {
    blog: GetAllBlogsCollectionQueryFieldsFragment;
    data: GetAllBlogsCollectionLinkedFromFieldsFragment | null;
}

export default function PreviewBlogPost({ blog, data }: PreviewBlogPostProps) {
    return (
        <PageWrapper fullHeight={false} className={`h-full`}>
            <ContentContainer key={data?.sys.id} className={`h-full`}>
                <div className={`flex flex-col h-full justify-between`}>
                    <div>
                        <Link href={`/blogs/${blog?.handle}/${data?.handle}`} title={data?.title || ``} className={`block`}>
                            <Image
                                src={data?.featuredImage?.url ?? `/logo-splash-black.svg`}
                                height={1600}
                                width={900}
                                alt={data?.featuredImage?.title ?? ``}
                                className={`w-full h-auto aspect-video shadow-lg border border-zinc-800 rounded-lg`}
                            />
                        </Link>
                        <Link href={`/blogs/${blog?.handle}/${data?.handle}`} title={data?.title || ``} className={`block`}>
                            <Text variant={`h4`} tw={`mt-4`}>{data?.title}</Text>
                        </Link>
                        {data?.excerpt && (
                            <Text tw={`mt-4`}>{data?.excerpt}</Text>
                        )}
                    </div>
                    <Link href={`/blogs/${blog?.handle}/${data?.handle}`} title="Read this" className={`mt-8 flex gap-1 items-center w-fit group`}><Text>Read this</Text><ArrowRightIcon className={`fill-white h-6 w-auto transition-all group-hover:translate-x-0.5`} /></Link>
                </div>
            </ContentContainer>
        </PageWrapper>
    )
}