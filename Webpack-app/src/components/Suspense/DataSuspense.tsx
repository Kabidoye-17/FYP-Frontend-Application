import { Suspense, type ReactNode } from "react";
import styled, { keyframes } from "styled-components";

interface DataSuspenseProps {
    children: ReactNode;
    fallback?: ReactNode;
    minHeight?: string;
}

const shimmer = keyframes`
    0% {
        background-position: -200% 0;
    }
    100% {
        background-position: 200% 0;
    }
`;

const DefaultFallback = styled.div<{ $minHeight: string }>`
    min-height: ${({ $minHeight }) => $minHeight};
    border-radius: 8px;
    background: linear-gradient(
        90deg,
        var(--section-background) 25%,
        var(--hover-background) 50%,
        var(--section-background) 75%
    );
    background-size: 200% 100%;
    animation: ${shimmer} 1.5s infinite;
`;

function DataSuspense({
    children,
    fallback,
    minHeight = "100px",
}: Readonly<DataSuspenseProps>) {
    return (
        <Suspense fallback={fallback ?? <DefaultFallback $minHeight={minHeight} />}>
            {children}
        </Suspense>
    );
}

export default DataSuspense;
