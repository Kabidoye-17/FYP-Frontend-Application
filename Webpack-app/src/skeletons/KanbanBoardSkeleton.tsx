import styled, { keyframes } from "styled-components";

const shimmer = keyframes`
    0% {
        background-position: -200% 0;
    }
    100% {
        background-position: 200% 0;
    }
`;

const Container = styled.div`
    display: flex;
    gap: 1rem;
    padding: 1rem;
    overflow-x: auto;
`;

const Column = styled.div`
    min-width: 300px;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
`;

const ColumnHeader = styled.div`
    height: 32px;
    border-radius: 6px;
    background: linear-gradient(
        90deg,
        var(--section-background) 25%,
        var(--hover-background) 50%,
        var(--section-background) 75%
    );
    background-size: 200% 100%;
    animation: ${shimmer} 1.5s infinite;
`;

const Card = styled.div<{ $height?: number }>`
    height: ${({ $height }) => $height ?? 100}px;
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

function KanbanBoardSkeleton() {
    return (
        <Container>
            {[1, 2, 3, 4].map((col) => (
                <Column key={col}>
                    <ColumnHeader />
                    {[80, 120, 100, 90].slice(0, col === 1 ? 4 : col === 2 ? 3 : 2).map((height, idx) => (
                        <Card key={idx} $height={height} />
                    ))}
                </Column>
            ))}
        </Container>
    );
}

export default KanbanBoardSkeleton;
