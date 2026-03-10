import { Suspense, type ReactNode } from "react";
import styled, { keyframes } from "styled-components";

interface SuspenseBoundaryProps {
    children: ReactNode;
    fallback?: ReactNode;
}

const pulse = keyframes`
    0%, 100% {
        opacity: 1;
    }
    50% {
        opacity: 0.5;
    }
`;

const DefaultFallback = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 200px;
    padding: 2rem;
`;

const LoadingDots = styled.div`
    display: flex;
    gap: 0.5rem;
`;

const Dot = styled.div<{ $delay: number }>`
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: var(--purple);
    animation: ${pulse} 1.4s ease-in-out infinite;
    animation-delay: ${({ $delay }) => $delay}s;
`;

function DefaultLoadingFallback() {
    return (
        <DefaultFallback>
            <LoadingDots>
                <Dot $delay={0} />
                <Dot $delay={0.2} />
                <Dot $delay={0.4} />
            </LoadingDots>
        </DefaultFallback>
    );
}

function SuspenseBoundary({ children, fallback }: Readonly<SuspenseBoundaryProps>) {
    return <Suspense fallback={fallback ?? <DefaultLoadingFallback />}>{children}</Suspense>;
}

export default SuspenseBoundary;
