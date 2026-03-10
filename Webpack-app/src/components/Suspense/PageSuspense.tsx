import { Suspense, type ReactNode } from "react";
import styled, { keyframes } from "styled-components";
import Icon from "../../design_system/Icon";

interface PageSuspenseProps {
    children?: ReactNode;
}

const spin = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: calc(100vh - 100px);
    padding: 2rem;
    gap: 1rem;
`;

const SpinnerWrapper = styled.div`
    animation: ${spin} 1s linear infinite;
`;

const LoadingText = styled.p`
    font-family: "Inter", sans-serif;
    font-size: 0.875rem;
    color: var(--text-secondary);
    margin: 0;
`;

function PageLoadingFallback() {
    return (
        <Container>
            <SpinnerWrapper>
                <Icon name="CircleNotch" size={32} color="var(--purple)" weight="bold" />
            </SpinnerWrapper>
            <LoadingText>Loading page...</LoadingText>
        </Container>
    );
}

function PageSuspense({ children }: Readonly<PageSuspenseProps>) {
    // When used without children, render the fallback directly
    if (!children) {
        return <PageLoadingFallback />;
    }
    return <Suspense fallback={<PageLoadingFallback />}>{children}</Suspense>;
}

export { PageLoadingFallback };
export default PageSuspense;
