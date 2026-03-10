import styled from "styled-components";
import RoadmapTimelineHeader from "./RoadmapTimelineHeader";
import RoadmapTimelineRow from "./RoadmapTimelineRow";
import type { RoadmapItem, TimeframeOption } from "../../pages/RoadmapPage";

interface RoadmapTimelineProps {
    items: RoadmapItem[];
    timeframe: TimeframeOption;
}

const TimelineContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow: auto;
`;

const TimelineBody = styled.div`
    display: flex;
    flex-direction: column;
    min-width: max-content;
`;

function RoadmapTimeline({ items, timeframe }: RoadmapTimelineProps) {
    const getTimelinePeriods = () => {
        const periods: { label: string; subPeriods: string[] }[] = [];
        const now = new Date();
        const year = now.getFullYear();

        if (timeframe === "month") {
            for (let i = 0; i < 6; i++) {
                const date = new Date(year, now.getMonth() + i, 1);
                const monthName = date.toLocaleDateString("en-US", { month: "long" });
                const weeks = ["Week 1", "Week 2", "Week 3", "Week 4"];
                periods.push({ label: monthName, subPeriods: weeks });
            }
        } else if (timeframe === "quarter") {
            for (let q = 1; q <= 4; q++) {
                const months = [];
                for (let m = 0; m < 3; m++) {
                    const date = new Date(year, (q - 1) * 3 + m, 1);
                    months.push(date.toLocaleDateString("en-US", { month: "short" }));
                }
                periods.push({ label: `Q${q} ${year}`, subPeriods: months });
            }
        } else {
            for (let y = year; y <= year + 1; y++) {
                const quarters = ["Q1", "Q2", "Q3", "Q4"];
                periods.push({ label: `${y}`, subPeriods: quarters });
            }
        }

        return periods;
    };

    const periods = getTimelinePeriods();

    return (
        <TimelineContainer>
            <RoadmapTimelineHeader periods={periods} />
            <TimelineBody>
                {items.map((item) => (
                    <RoadmapTimelineRow
                        key={item.id}
                        item={item}
                        periods={periods}
                        timeframe={timeframe}
                    />
                ))}
            </TimelineBody>
        </TimelineContainer>
    );
}

export default RoadmapTimeline;
