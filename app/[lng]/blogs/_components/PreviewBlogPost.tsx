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
import MxImage from "@/src/components/MxImage";

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
                            <MxImage 
                                loading={`eager`}
                                src={data?.featuredImage?.url ?? `/assets/logo-splash-black.svg`}
                                alt={data?.featuredImage?.title ?? ``}
                                height={`1600`}
                                width={`900`}
                                className={`w-full h-auto aspect-video shadow-lg border border-zinc-800 rounded-lg`}
                                mxWidths={{
                                    '2xl': 560,
                                    xl: 560,
                                    lg: 840,
                                    md: 680,
                                    sm: 680,
                                    none: 680
                                }}
                            />
                        </Link>
                        <Link href={`/${lng}/blogs/${blog?.handle}/${data?.handle}`} title={data?.title || ``} className={`block`}>
                            <Text variant={`h4`} tw={`mt-4`}>{data?.title}</Text>
                        </Link>
                        {data?.excerpt && (
                            <Text tw={`mt-4`}>{data?.excerpt}</Text>
                        )}
                    </div>
                    <div className={`mt-8 flex justify-end`}>
                        <Link href={`/${lng}/blogs/${blog?.handle}/${data?.handle}`} title={text} className={`flex gap-1 items-center w-fit group rounded-lg px-4 py-1 transition-all hover:bg-zinc-700/90 active:bg-zinc-500/90`}><Text>{text}</Text><ArrowRightIcon className={`fill-white h-6 w-auto transition-all group-hover:translate-x-0.5`} /></Link>
                    </div>
                </div>
            </ContentContainer>
        </PageWrapper>
    )
}