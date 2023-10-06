import Link from "next/link";
import Text from "./Text";

interface PaginationProps {
    totalPages: number;
    currentPage: number;
    baseUrl: string;
}

export default function Pagination({ totalPages, currentPage, baseUrl }: PaginationProps) {
    const prevPageUrl = currentPage === 2 ? baseUrl : `${baseUrl}?page=${currentPage - 1}`
    const nextPageUrl = `${baseUrl}?page=${currentPage + 1}`

    return (
        <div className={`mt-8 flex gap-1 justify-center items-center`}>
            {currentPage === 1 ? (<span className={`text-zinc-600 px-4 py-1 rounded-lg select-none`}>Prev</span>) : (<Link href={prevPageUrl} className={`transition-all px-4 py-1 rounded-lg hover:bg-zinc-700/90`} title={`Previous page`}>Prev</Link>)}
            <Text tw={`select-none px-4 py-1 rounded-lg`}>{currentPage}</Text>
            {totalPages === currentPage ? (<span className={`text-zinc-600 px-4 py-1 rounded-lg select-none`}>Next</span>) : (<Link href={nextPageUrl} className={`transition-all px-4 py-1 rounded-lg hover:bg-zinc-700/90`} title={`Next page`}>Next</Link>)}
        </div>
    )
}