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
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const SkeletonBox = styled.div<{ $width?: string; $height?: string }>`
    width: ${({ $width }) => $width ?? "100%"};
    height: ${({ $height }) => $height ?? "32px"};
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

const StatsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;

    @media (max-width: 1024px) {
        grid-template-columns: repeat(2, 1fr);
    }
`;

const StatCard = styled.div`
    padding: 1.25rem;
    border-radius: 12px;
    background-color: var(--white);
    border: 1px solid var(--border-color);
`;

const ChartsGrid = styled.div`
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 1rem;

    @media (max-width: 1024px) {
        grid-template-columns: 1fr;
    }
`;

const ChartCard = styled.div`
    padding: 1.25rem;
    border-radius: 12px;
    background-color: var(--white);
    border: 1px solid var(--border-color);
`;

const ChartArea = styled(SkeletonBox)`
    margin-top: 1rem;
`;

function AnalyticsSkeleton() {
    return (
        <Container>
            <Header>
                <SkeletonBox $width="180px" $height="28px" />
                <SkeletonBox $width="200px" $height="36px" />
            </Header>

            <StatsGrid>
                {Array.from({ length: 4 }).map((_, i) => (
                    <StatCard key={i}>
                        <SkeletonBox $width="60%" $height="16px" />
                        <SkeletonBox $width="40%" $height="32px" style={{ marginTop: "0.75rem" }} />
                        <SkeletonBox $width="80%" $height="14px" style={{ marginTop: "0.5rem" }} />
                    </StatCard>
                ))}
            </StatsGrid>

            <ChartsGrid>
                <ChartCard>
                    <SkeletonBox $width="150px" $height="20px" />
                    <ChartArea $height="250px" />
                </ChartCard>
                <ChartCard>
                    <SkeletonBox $width="120px" $height="20px" />
                    <ChartArea $height="250px" />
                </ChartCard>
            </ChartsGrid>

            <ChartsGrid>
                <ChartCard>
                    <SkeletonBox $width="180px" $height="20px" />
                    <ChartArea $height="200px" />
                </ChartCard>
                <ChartCard>
                    <SkeletonBox $width="140px" $height="20px" />
                    <ChartArea $height="200px" />
                </ChartCard>
            </ChartsGrid>
        </Container>
    );
}

export default AnalyticsSkeleton;
