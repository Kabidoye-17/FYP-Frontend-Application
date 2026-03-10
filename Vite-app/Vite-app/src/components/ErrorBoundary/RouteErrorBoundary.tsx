import { ErrorBoundary } from "react-error-boundary";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../../design_system/Button";
import Icon from "../../design_system/Icon";

interface RouteErrorBoundaryProps {
    children: ReactNode;
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: calc(100vh - 100px);
    padding: 2rem;
`;

const ContentWrapper = styled.div`
    max-width: 450px;
    text-align: center;
`;

const IconWrapper = styled.div`
    width: 72px;
    height: 72px;
    border-radius: 50%;
    background-color: var(--warning-light);
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1.5rem;
`;

const Title = styled.h2`
    font-family: "Inter", sans-serif;
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--text-primary);
    margin: 0 0 0.5rem 0;
`;

const Description = styled.p`
    font-family: "Inter", sans-serif;
    font-size: 0.875rem;
    color: var(--text-secondary);
    margin: 0 0 1.5rem 0;
    line-height: 1.5;
`;

const ButtonGroup = styled.div`
    display: flex;
    gap: 0.75rem;
    justify-content: center;
`;

function RouteErrorFallback({
    resetErrorBoundary,
}: {
    error: unknown;
    resetErrorBoundary: () => void;
}) {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate("/home");
        resetErrorBoundary();
    };

    return (
        <Container role="alert">
            <ContentWrapper>
                <IconWrapper>
                    <Icon name="MapTrifold" size={36} color="var(--warning)" weight="fill" />
                </IconWrapper>
                <Title>Page Error</Title>
                <Description>
                    This page encountered an error. You can try again or go back to the home page.
                </Description>
                <ButtonGroup>
                    <Button
                        icon={<Icon name="ArrowCounterClockwise" size={14} color="var(--white)" weight="bold" />}
                        backgroundColor="var(--purple)"
                        color="var(--white)"
                        onClick={resetErrorBoundary}
                    >
                        Try again
                    </Button>
                    <Button
                        icon={<Icon name="House" size={14} color="var(--text-primary)" weight="bold" />}
                        backgroundColor="var(--white)"
                        color="var(--text-primary)"
                        onClick={handleGoHome}
                    >
                        Go home
                    </Button>
                </ButtonGroup>
            </ContentWrapper>
        </Container>
    );
}

function RouteErrorBoundary({ children }: Readonly<RouteErrorBoundaryProps>) {
    return (
        <ErrorBoundary
            FallbackComponent={RouteErrorFallback}
            onReset={() => {
                // Reset any state that might have caused the error
            }}
        >
            {children}
        </ErrorBoundary>
    );
}

export default RouteErrorBoundary;
