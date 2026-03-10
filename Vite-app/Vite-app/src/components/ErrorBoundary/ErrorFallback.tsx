import styled from "styled-components";
import Button from "../../design_system/Button";
import Icon from "../../design_system/Icon";

interface ErrorFallbackProps {
    error: Error;
    resetErrorBoundary: () => void;
    title?: string;
    description?: string;
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 3rem;
    min-height: 200px;
    text-align: center;
`;

const IconWrapper = styled.div`
    width: 64px;
    height: 64px;
    border-radius: 50%;
    background-color: var(--error-light);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1.5rem;
`;

const Title = styled.h3`
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
    max-width: 400px;
`;

const ErrorDetails = styled.details`
    margin-top: 1rem;
    text-align: left;
    max-width: 500px;
`;

const ErrorSummary = styled.summary`
    font-family: "Inter", sans-serif;
    font-size: 0.75rem;
    color: var(--text-secondary);
    cursor: pointer;
    user-select: none;

    &:hover {
        color: var(--text-primary);
    }
`;

const ErrorMessage = styled.pre`
    font-family: "SF Mono", Monaco, Consolas, monospace;
    font-size: 0.75rem;
    color: var(--error);
    background-color: var(--error-light);
    padding: 1rem;
    border-radius: 8px;
    overflow-x: auto;
    margin-top: 0.5rem;
    white-space: pre-wrap;
    word-break: break-word;
`;

function ErrorFallback({
    error,
    resetErrorBoundary,
    title = "Something went wrong",
    description = "An unexpected error occurred. Please try again.",
}: Readonly<ErrorFallbackProps>) {
    return (
        <Container role="alert">
            <IconWrapper>
                <Icon name="Warning" size={32} color="var(--error)" weight="fill" />
            </IconWrapper>
            <Title>{title}</Title>
            <Description>{description}</Description>
            <Button
                icon={<Icon name="ArrowCounterClockwise" size={16} color="var(--white)" weight="bold" />}
                backgroundColor="var(--purple)"
                color="var(--white)"
                onClick={resetErrorBoundary}
            >
                Try again
            </Button>
            {import.meta.env.DEV && (
                <ErrorDetails>
                    <ErrorSummary>View error details</ErrorSummary>
                    <ErrorMessage>{error.message}</ErrorMessage>
                </ErrorDetails>
            )}
        </Container>
    );
}

export default ErrorFallback;
