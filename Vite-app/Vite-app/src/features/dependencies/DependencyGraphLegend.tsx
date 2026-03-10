import styled from "styled-components";

const Container = styled.div`
    position: absolute;
    top: 1rem;
    left: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    background-color: var(--white);
    border: 1px solid var(--border-color);
    border-radius: 8px;
    padding: 0.75rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
`;

const Title = styled.span`
    font-family: "Inter", sans-serif;
    font-size: 0.6875rem;
    font-weight: 600;
    color: var(--text-secondary);
    text-transform: uppercase;
    letter-spacing: 0.05em;
`;

const LegendItem = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;

const LegendLine = styled.div<{ $color: string; $dashed?: boolean }>`
    width: 24px;
    height: 2px;
    background-color: ${({ $color }) => $color};
    ${({ $dashed }) =>
        $dashed &&
        `
        background: repeating-linear-gradient(
            90deg,
            var(--text-tertiary) 0,
            var(--text-tertiary) 4px,
            transparent 4px,
            transparent 8px
        );
    `}
`;

const LegendLabel = styled.span`
    font-family: "Inter", sans-serif;
    font-size: 0.75rem;
    color: var(--text-primary);
`;

function DependencyGraphLegend() {
    return (
        <Container>
            <Title>Edge Types</Title>
            <LegendItem>
                <LegendLine $color="var(--error)" />
                <LegendLabel>Blocks</LegendLabel>
            </LegendItem>
            <LegendItem>
                <LegendLine $color="var(--warning)" />
                <LegendLabel>Blocked by</LegendLabel>
            </LegendItem>
            <LegendItem>
                <LegendLine $color="var(--blue)" />
                <LegendLabel>Relates to</LegendLabel>
            </LegendItem>
            <LegendItem>
                <LegendLine $color="var(--text-tertiary)" $dashed />
                <LegendLabel>Duplicates</LegendLabel>
            </LegendItem>
        </Container>
    );
}

export default DependencyGraphLegend;
