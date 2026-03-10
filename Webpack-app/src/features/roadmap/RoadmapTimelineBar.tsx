import styled from "styled-components";
import type { RoadmapItem, TimeframeOption } from "../../pages/RoadmapPage";

interface RoadmapTimelineBarProps {
    item: RoadmapItem;
    periods: { label: string; subPeriods: string[] }[];
    timeframe: TimeframeOption;
}

const BarContainer = styled.div`
    position: absolute;
    left: 0;
    right: 0;
    height: 100%;
    display: flex;
    align-items: center;
`;

const Bar = styled.div<{ $left: number; $width: number; $color: string }>`
    position: absolute;
    left: ${({ $left }) => `${$left}%`};
    width: ${({ $width }) => `${$width}%`};
    height: 28px;
    background-color: ${({ $color }) => $color};
    border-radius: 6px;
    display: flex;
    align-items: center;
    padding: 0 0.5rem;
    cursor: pointer;
    transition: transform 0.15s ease, box-shadow 0.15s ease;

    &:hover {
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }
`;

const BarLabel = styled.span`
    font-family: "Inter", sans-serif;
    font-size: 0.625rem;
    font-weight: 600;
    color: var(--white);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const ProgressIndicator = styled.div<{ $progress: number }>`
    position: absolute;
    bottom: 2px;
    left: 4px;
    right: 4px;
    height: 3px;
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 2px;
    overflow: hidden;

    &::after {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: ${({ $progress }) => `${$progress}%`};
        background-color: rgba(255, 255, 255, 0.8);
        border-radius: 2px;
    }
`;

function RoadmapTimelineBar({
    item,
    timeframe,
}: RoadmapTimelineBarProps) {
    const calculatePosition = () => {
        const now = new Date();
        const year = now.getFullYear();
        let timelineStart: Date;
        let timelineEnd: Date;

        if (timeframe === "month") {
            timelineStart = new Date(year, now.getMonth(), 1);
            timelineEnd = new Date(year, now.getMonth() + 6, 0);
        } else if (timeframe === "quarter") {
            timelineStart = new Date(year, 0, 1);
            timelineEnd = new Date(year, 11, 31);
        } else {
            timelineStart = new Date(year, 0, 1);
            timelineEnd = new Date(year + 1, 11, 31);
        }

        const totalDays = Math.ceil(
            (timelineEnd.getTime() - timelineStart.getTime()) / (1000 * 60 * 60 * 24)
        );

        const itemStart = new Date(item.startDate);
        const itemEnd = new Date(item.endDate);

        const startDays = Math.max(
            0,
            Math.ceil((itemStart.getTime() - timelineStart.getTime()) / (1000 * 60 * 60 * 24))
        );
        const endDays = Math.min(
            totalDays,
            Math.ceil((itemEnd.getTime() - timelineStart.getTime()) / (1000 * 60 * 60 * 24))
        );

        const left = (startDays / totalDays) * 100;
        const width = ((endDays - startDays) / totalDays) * 100;

        return { left: Math.max(0, left), width: Math.max(5, Math.min(100 - left, width)) };
    };

    const { left, width } = calculatePosition();

    return (
        <BarContainer>
            <Bar $left={left} $width={width} $color={item.color}>
                <BarLabel>{item.title}</BarLabel>
                {item.progress > 0 && item.progress < 100 && (
                    <ProgressIndicator $progress={item.progress} />
                )}
            </Bar>
        </BarContainer>
    );
}

export default RoadmapTimelineBar;
