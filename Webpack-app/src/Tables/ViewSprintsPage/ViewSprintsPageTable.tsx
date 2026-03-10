import { useState, useEffect } from "react";
import styled from "styled-components";
import ViewSprintsPageTableSection from "./ViewSprintsPageTableSection";
import ViewSprintsPageTableSkeleton from "./ViewSprintsPageTableSkeleton";

export interface Sprint {
    id: string;
    name: string;
    status: "planned" | "active" | "completed";
    startDate: string;
    endDate: string;
    issueCount: number;
    completedIssues: number;
    teamName: string;
}

export interface SprintSection {
    title: string;
    sprints: Sprint[];
}

const TableContainer = styled.div`
    width: 100%;
    padding: 1rem;
    overflow-y: auto;
    flex: 1;
`;

const mockSections: SprintSection[] = [
    {
        title: "Active",
        sprints: [
            {
                id: "1",
                name: "Sprint 23 - Q1 Features",
                status: "active",
                startDate: "2026-03-01",
                endDate: "2026-03-14",
                issueCount: 12,
                completedIssues: 5,
                teamName: "Engineering",
            },
        ],
    },
    {
        title: "Planned",
        sprints: [
            {
                id: "2",
                name: "Sprint 24 - Bug Fixes",
                status: "planned",
                startDate: "2026-03-15",
                endDate: "2026-03-28",
                issueCount: 8,
                completedIssues: 0,
                teamName: "Engineering",
            },
            {
                id: "3",
                name: "Sprint 25 - Improvements",
                status: "planned",
                startDate: "2026-03-29",
                endDate: "2026-04-11",
                issueCount: 6,
                completedIssues: 0,
                teamName: "Design",
            },
        ],
    },
    {
        title: "Completed",
        sprints: [
            {
                id: "4",
                name: "Sprint 22 - Infrastructure",
                status: "completed",
                startDate: "2026-02-15",
                endDate: "2026-02-28",
                issueCount: 15,
                completedIssues: 15,
                teamName: "Engineering",
            },
            {
                id: "5",
                name: "Sprint 21 - MVP Launch",
                status: "completed",
                startDate: "2026-02-01",
                endDate: "2026-02-14",
                issueCount: 20,
                completedIssues: 18,
                teamName: "Engineering",
            },
        ],
    },
];

function ViewSprintsPageTable() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return <ViewSprintsPageTableSkeleton />;
    }

    return (
        <TableContainer>
            {mockSections.map((section) => (
                <ViewSprintsPageTableSection
                    key={section.title}
                    title={section.title}
                    sprints={section.sprints}
                />
            ))}
        </TableContainer>
    );
}

export default ViewSprintsPageTable;
