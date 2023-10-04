export default function BlogPost({
    params
}:{params: { postHandle: string }}) {
    return (
        <div>post: {params.postHandle}</div>
    )
}