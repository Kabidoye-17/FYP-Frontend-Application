import styled from "styled-components";
import Button from "../../design_system/Button";
import Icon from "../../design_system/Icon";

interface ChartErrorFallbackProps {
    error: Error;
    resetErrorBoundary: () => void;
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    min-height: 250px;
    background-color: var(--section-background);
    border-radius: 12px;
    border: 1px dashed var(--border-color);
`;

const IconWrapper = styled.div`
    width: 48px;
    height: 48px;
    border-radius: 12px;
    background-color: var(--warning-light);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1rem;
`;

const Title = styled.h4`
    font-family: "Inter", sans-serif;
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--text-primary);
    margin: 0 0 0.25rem 0;
`;

const Description = styled.p`
    font-family: "Inter", sans-serif;
    font-size: 0.75rem;
    color: var(--text-secondary);
    margin: 0 0 1rem 0;
`;

function ChartErrorFallback({
    resetErrorBoundary,
}: Readonly<ChartErrorFallbackProps>) {
    return (
        <Container role="alert">
            <IconWrapper>
                <Icon name="ChartLine" size={24} color="var(--warning)" weight="regular" />
            </IconWrapper>
            <Title>Failed to load chart</Title>
            <Description>Unable to render chart data</Description>
            <Button
                icon={<Icon name="ArrowCounterClockwise" size={14} color="var(--text-primary)" weight="bold" />}
                backgroundColor="var(--white)"
                color="var(--text-primary)"
                onClick={resetErrorBoundary}
            >
                Retry
            </Button>
        </Container>
    );
}

export default ChartErrorFallback;
