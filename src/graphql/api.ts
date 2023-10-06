import { GraphQLClient } from "graphql-request";
import { QueryClient } from "@tanstack/react-query";

import { getSdk } from "../_generated/graphql";

const gqlClient =  new GraphQLClient(`https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`, {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`
    }
});
export const { getAllBlogs, getPaginatedBlogPosts, getBlogPostByHandle } = getSdk(gqlClient);

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnMount: false,
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
        }
    }
})