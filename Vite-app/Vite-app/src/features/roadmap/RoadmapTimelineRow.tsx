import styled from "styled-components";
import RoadmapTimelineBar from "./RoadmapTimelineBar";
import type { RoadmapItem, TimeframeOption } from "../../pages/RoadmapPage";

interface RoadmapTimelineRowProps {
    item: RoadmapItem;
    periods: { label: string; subPeriods: string[] }[];
    timeframe: TimeframeOption;
}

const RowContainer = styled.div`
    display: flex;
    min-height: 60px;
    border-bottom: 1px solid var(--section-background);

    &:hover {
        background-color: rgba(0, 0, 0, 0.02);
    }
`;

const TitleCell = styled.div`
    width: 250px;
    min-width: 250px;
    padding: 1rem;
    border-right: 1px solid var(--section-background);
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const ItemTitle = styled.span`
    font-family: "Inter", sans-serif;
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--text-primary);
`;

const ItemStatus = styled.span<{ $status: RoadmapItem["status"] }>`
    font-family: "Inter", sans-serif;
    font-size: 0.625rem;
    font-weight: 500;
    text-transform: uppercase;
    color: ${({ $status }) => {
        switch ($status) {
            case "completed":
                return "var(--success-green)";
            case "in-progress":
                return "var(--plum)";
            default:
                return "var(--text-secondary)";
        }
    }};
`;

const TimelineCell = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    padding: 0.5rem;
    position: relative;
`;

function RoadmapTimelineRow({
    item,
    periods,
    timeframe,
}: RoadmapTimelineRowProps) {
    return (
        <RowContainer>
            <TitleCell>
                <ItemTitle>{item.title}</ItemTitle>
                <ItemStatus $status={item.status}>
                    {item.status.replace("-", " ")}
                </ItemStatus>
            </TitleCell>
            <TimelineCell>
                <RoadmapTimelineBar
                    item={item}
                    periods={periods}
                    timeframe={timeframe}
                />
            </TimelineCell>
        </RowContainer>
    );
}

export default RoadmapTimelineRow;
