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
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
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

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1rem;
`;

const MemberCard = styled.div`
    padding: 1.5rem;
    border-radius: 12px;
    background-color: var(--white);
    border: 1px solid var(--border-color);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
`;

const AvatarSkeleton = styled(SkeletonBox)`
    width: 64px;
    height: 64px;
    border-radius: 50%;
`;

const StatsRow = styled.div`
    display: flex;
    gap: 1.5rem;
    width: 100%;
    justify-content: center;
    margin-top: 0.5rem;
`;

const StatItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.25rem;
`;

function TeamPageSkeleton() {
    return (
        <Container>
            <Header>
                <SkeletonBox $width="150px" $height="28px" />
                <SkeletonBox $width="140px" $height="36px" />
            </Header>
            <Grid>
                {Array.from({ length: 8 }).map((_, i) => (
                    <MemberCard key={i}>
                        <AvatarSkeleton />
                        <SkeletonBox $width="120px" $height="20px" />
                        <SkeletonBox $width="80px" $height="14px" />
                        <StatsRow>
                            <StatItem>
                                <SkeletonBox $width="30px" $height="20px" />
                                <SkeletonBox $width="50px" $height="12px" />
                            </StatItem>
                            <StatItem>
                                <SkeletonBox $width="30px" $height="20px" />
                                <SkeletonBox $width="50px" $height="12px" />
                            </StatItem>
                            <StatItem>
                                <SkeletonBox $width="30px" $height="20px" />
                                <SkeletonBox $width="50px" $height="12px" />
                            </StatItem>
                        </StatsRow>
                    </MemberCard>
                ))}
            </Grid>
        </Container>
    );
}

export default TeamPageSkeleton;
