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
    padding: 1rem;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
`;

const NavControls = styled.div`
    display: flex;
    gap: 0.5rem;
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

const WeekdayRow = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 0.5rem;
    margin-bottom: 0.5rem;
`;

const DayHeader = styled(SkeletonBox)`
    height: 24px;
`;

const CalendarGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 0.5rem;
`;

const DayCell = styled.div`
    aspect-ratio: 1;
    min-height: 80px;
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

function CalendarSkeleton() {
    return (
        <Container>
            <Header>
                <SkeletonBox $width="200px" $height="28px" />
                <NavControls>
                    <SkeletonBox $width="100px" $height="32px" />
                    <SkeletonBox $width="36px" $height="32px" />
                    <SkeletonBox $width="36px" $height="32px" />
                </NavControls>
            </Header>
            <WeekdayRow>
                {Array.from({ length: 7 }).map((_, i) => (
                    <DayHeader key={i} />
                ))}
            </WeekdayRow>
            <CalendarGrid>
                {Array.from({ length: 35 }).map((_, i) => (
                    <DayCell key={i} />
                ))}
            </CalendarGrid>
        </Container>
    );
}

export default CalendarSkeleton;
