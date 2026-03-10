import { ErrorBoundary } from "react-error-boundary";
import type { ReactNode, ErrorInfo } from "react";
import styled from "styled-components";
import Button from "../../design_system/Button";
import Icon from "../../design_system/Icon";

interface AppErrorBoundaryProps {
    children: ReactNode;
}

const FullPageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    padding: 2rem;
    background-color: var(--section-background);
`;

const ContentWrapper = styled.div`
    max-width: 500px;
    text-align: center;
`;

const IconWrapper = styled.div`
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background-color: var(--error-light);
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 2rem;
`;

const Title = styled.h1`
    font-family: "Inter", sans-serif;
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--text-primary);
    margin: 0 0 0.75rem 0;
`;

const Description = styled.p`
    font-family: "Inter", sans-serif;
    font-size: 1rem;
    color: var(--text-secondary);
    margin: 0 0 2rem 0;
    line-height: 1.6;
`;

const ButtonGroup = styled.div`
    display: flex;
    gap: 1rem;
    justify-content: center;
`;

function AppErrorFallback({ error, resetErrorBoundary }: { error: unknown; resetErrorBoundary: () => void }) {
    const handleReload = () => {
        window.location.reload();
    };

    const errorMessage = error instanceof Error ? error.stack : String(error);

    return (
        <FullPageContainer role="alert">
            <ContentWrapper>
                <IconWrapper>
                    <Icon name="Bug" size={40} color="var(--error)" weight="fill" />
                </IconWrapper>
                <Title>Application Error</Title>
                <Description>
                    We're sorry, but something went wrong. This error has been logged and we'll look into it.
                </Description>
                <ButtonGroup>
                    <Button
                        icon={<Icon name="ArrowCounterClockwise" size={16} color="var(--white)" weight="bold" />}
                        backgroundColor="var(--purple)"
                        color="var(--white)"
                        onClick={resetErrorBoundary}
                    >
                        Try again
                    </Button>
                    <Button
                        icon={<Icon name="ArrowClockwise" size={16} color="var(--text-primary)" weight="bold" />}
                        backgroundColor="var(--white)"
                        color="var(--text-primary)"
                        onClick={handleReload}
                    >
                        Reload page
                    </Button>
                </ButtonGroup>
                {process.env.NODE_ENV === "development" && (
                    <details style={{ marginTop: "2rem", textAlign: "left" }}>
                        <summary style={{ cursor: "pointer", color: "var(--text-secondary)" }}>
                            Error details (development only)
                        </summary>
                        <pre
                            style={{
                                backgroundColor: "var(--error-light)",
                                padding: "1rem",
                                borderRadius: "8px",
                                overflow: "auto",
                                fontSize: "0.75rem",
                                marginTop: "0.5rem",
                            }}
                        >
                            {errorMessage}
                        </pre>
                    </details>
                )}
            </ContentWrapper>
        </FullPageContainer>
    );
}

function AppErrorBoundary({ children }: Readonly<AppErrorBoundaryProps>) {
    const handleError = (error: unknown, info: ErrorInfo) => {
        // Log error to monitoring service (e.g., Sentry, LogRocket)
        console.error("Application Error:", error);
        console.error("Component Stack:", info.componentStack);
    };

    return (
        <ErrorBoundary FallbackComponent={AppErrorFallback} onError={handleError}>
            {children}
        </ErrorBoundary>
    );
}

export default AppErrorBoundary;
