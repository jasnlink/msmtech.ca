export default function Blog({
    params
}:{params: { blogHandle: string }}) {
    return (
        <div>blog: {params.blogHandle}</div>
    )
}