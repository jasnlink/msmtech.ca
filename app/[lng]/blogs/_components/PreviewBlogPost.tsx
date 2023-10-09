'use client'
import { GetAllBlogsCollectionLinkedFromFieldsFragment, GetAllBlogsCollectionQueryFieldsFragment } from "@/src/_generated/graphql";
import ContentContainer from "@/src/components/ContentContainer";
import PageWrapper from "@/src/components/PageWrapper";
import Text from "@/src/components/Text";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@/src/components/Icon";
import { unhookedTranslation, useTranslation } from "@/app/i18n"
import { Translation } from "@/src/models"
import useT from "@/src/hooks/useT";

interface PreviewBlogPostProps {
    blog: GetAllBlogsCollectionQueryFieldsFragment | null;
    data: GetAllBlogsCollectionLinkedFromFieldsFragment | null;
    lng: string;
    t?: Translation;
}

export default function PreviewBlogPost({ blog, data, lng, t }: PreviewBlogPostProps) {

    const text = useT(t?.Blogs.read_this)

    return (
        <PageWrapper screenHeight={false} className={`h-full`}>
            <ContentContainer key={data?.sys.id} className={`h-full`}>
                <div className={`flex flex-col h-full justify-between`}>
                    <div>
                        <Link href={`/${lng}/blogs/${blog?.handle}/${data?.handle}`} title={data?.title || ``} className={`block`}>
                            <img
                                loading={`eager`}
                                src={data?.featuredImage?.url ?? `/assets/logo-splash-black.svg`}
                                height={1600}
                                width={900}
                                alt={data?.featuredImage?.title ?? ``}
                                className={`w-full h-auto aspect-video shadow-lg border border-zinc-800 rounded-lg`}
                            />
                        </Link>
                        <Link href={`/${lng}/blogs/${blog?.handle}/${data?.handle}`} title={data?.title || ``} className={`block`}>
                            <Text variant={`h4`} tw={`mt-4`}>{data?.title}</Text>
                        </Link>
                        {data?.excerpt && (
                            <Text tw={`mt-4`}>{data?.excerpt}</Text>
                        )}
                    </div>
                    <Link href={`/${lng}/blogs/${blog?.handle}/${data?.handle}`} title={text} className={`mt-8 flex gap-1 items-center w-fit group`}><Text>{text}</Text><ArrowRightIcon className={`fill-white h-6 w-auto transition-all group-hover:translate-x-0.5`} /></Link>
                </div>
            </ContentContainer>
        </PageWrapper>
    )
}