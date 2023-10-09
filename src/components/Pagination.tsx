import Link from "next/link";
import Text from "./Text";
import { useTranslation } from "@/app/i18n"

interface PaginationProps {
    totalPages: number;
    currentPage: number;
    baseUrl: string;
    lng: string;
}

export default async function Pagination({ totalPages, currentPage, baseUrl, lng }: PaginationProps) {
    const prevPageUrl = currentPage === 2 ? `/${lng}${baseUrl}` : `/${lng}${baseUrl}?page=${currentPage - 1}`
    const nextPageUrl = `/${lng}${baseUrl}?page=${currentPage + 1}`

    const {t} = await useTranslation(lng, 'pages/blogs')

    return (
        <div className={`mt-8 flex gap-1 justify-center items-center`}>
            {currentPage === 1 ? (<span className={`text-zinc-600 px-4 py-1 rounded-lg select-none`}>{t('general.prev')}</span>) : (<Link href={prevPageUrl} className={`transition-all px-4 py-1 rounded-lg hover:bg-zinc-700/90`} title={t('general.previous_page')}>{t('general.prev')}</Link>)}
            <Text tw={`select-none px-4 py-1 rounded-lg`}>{currentPage}</Text>
            {totalPages === currentPage ? (<span className={`text-zinc-600 px-4 py-1 rounded-lg select-none`}>{t('general.next')}</span>) : (<Link href={nextPageUrl} className={`transition-all px-4 py-1 rounded-lg hover:bg-zinc-700/90`} title={t('general.next_page')}>{t('general.next')}</Link>)}
        </div>
    )
}