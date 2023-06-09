import { PageProps } from "@/src/models/PageProps"
import BlogPage from "./_components/BlogPage"

export default function Page({ params }:PageProps) {
    
    return (
        <>
            <h1>blogs</h1>
            <div>handle: { params.handle }</div>
            <BlogPage />
        </>
    )
}