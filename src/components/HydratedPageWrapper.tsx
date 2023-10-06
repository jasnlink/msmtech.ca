import { DehydratedState, Hydrate } from "@tanstack/react-query";
import PageWrapper from "./PageWrapper";
import { PropsWithChildren } from "react";

interface HydratedPageWrapperProps {
    dehydratedState: DehydratedState;
    className?: string;
}

export default function HydratedPageWrapper({ dehydratedState, className, children }: PropsWithChildren<HydratedPageWrapperProps>) {
    return (
        <Hydrate state={dehydratedState}>
            <PageWrapper className={className}>
                {children}
            </PageWrapper>
        </Hydrate>
    )
}