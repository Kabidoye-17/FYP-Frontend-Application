import styled from "styled-components";
import { useState } from "react";
import RoadmapPageHeader from "./RoadmapPage/RoadmapPageHeader";
import RoadmapTimeline from "../features/roadmap/RoadmapTimeline";

export interface RoadmapItem {
    id: string;
    title: string;
    status: "planned" | "in-progress" | "completed";
    startDate: string;
    endDate: string;
    color: string;
    progress: number;
}

export type TimeframeOption = "month" | "quarter" | "year";

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    background-color: var(--white);
`;

const mockRoadmapItems: RoadmapItem[] = [
    {
        id: "1",
        title: "Authentication System",
        status: "completed",
        startDate: "2026-01-01",
        endDate: "2026-02-15",
        color: "var(--success-green)",
        progress: 100,
    },
    {
        id: "2",
        title: "Dashboard Redesign",
        status: "in-progress",
        startDate: "2026-02-01",
        endDate: "2026-04-01",
        color: "var(--plum)",
        progress: 65,
    },
    {
        id: "3",
        title: "Mobile App Development",
        status: "in-progress",
        startDate: "2026-03-01",
        endDate: "2026-06-30",
        color: "var(--tan)",
        progress: 25,
    },
    {
        id: "4",
        title: "API v2 Launch",
        status: "planned",
        startDate: "2026-04-15",
        endDate: "2026-05-31",
        color: "var(--light-plum)",
        progress: 0,
    },
    {
        id: "5",
        title: "Analytics Platform",
        status: "planned",
        startDate: "2026-05-01",
        endDate: "2026-07-31",
        color: "var(--plum)",
        progress: 0,
    },
];

function RoadmapPage() {
    const [timeframe, setTimeframe] = useState<TimeframeOption>("quarter");

    return (
        <PageContainer>
            <RoadmapPageHeader
                timeframe={timeframe}
                onTimeframeChange={setTimeframe}
            />
            <RoadmapTimeline
                items={mockRoadmapItems}
                timeframe={timeframe}
            />
        </PageContainer>
    );
}

export default RoadmapPage;
