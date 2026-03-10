import styled, { keyframes } from "styled-components";

interface WidgetCardSkeletonProps {
    height?: string;
}

const shimmer = keyframes`
    0% {
        background-position: -200% 0;
    }
    100% {
        background-position: 200% 0;
    }
`;

const Container = styled.div<{ $height: string }>`
    background-color: var(--white);
    border: 1px solid var(--border-color);
    border-radius: 12px;
    overflow: hidden;
    height: ${({ $height }) => $height};
`;

const Header = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 1rem 1.25rem;
    border-bottom: 1px solid var(--border-color);
`;

const SkeletonBox = styled.div<{ $width?: string; $height?: string }>`
    width: ${({ $width }) => $width ?? "100%"};
    height: ${({ $height }) => $height ?? "20px"};
    border-radius: 4px;
    background: linear-gradient(
        90deg,
        var(--section-background) 25%,
        var(--hover-background) 50%,
        var(--section-background) 75%
    );
    background-size: 200% 100%;
    animation: ${shimmer} 1.5s infinite;
`;

const Body = styled.div`
    padding: 1.25rem;
`;

function WidgetCardSkeleton({ height = "300px" }: Readonly<WidgetCardSkeletonProps>) {
    return (
        <Container $height={height}>
            <Header>
                <SkeletonBox $width="28px" $height="28px" style={{ borderRadius: "6px" }} />
                <SkeletonBox $width="120px" $height="16px" />
            </Header>
            <Body>
                <SkeletonBox $height="calc(100% - 60px)" />
            </Body>
        </Container>
    );
}

export default WidgetCardSkeleton;
