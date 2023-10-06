'use client'
import { PropsWithChildren } from "react";
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/src/graphql/api'

export default function RootQueryProvider({ children }: PropsWithChildren) {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}