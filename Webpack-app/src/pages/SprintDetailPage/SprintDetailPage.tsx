import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SprintDetailPageLayout from "./SprintDetailPageLayout";

export interface SprintDetail {
    id: string;
    name: string;
    goal: string;
    status: "planned" | "active" | "completed";
    startDate: string;
    endDate: string;
    teamId: string;
    teamName: string;
    issues: SprintIssue[];
    createdAt: string;
}

export interface SprintIssue {
    id: string;
    title: string;
    status: "backlog" | "todo" | "in progress" | "done";
    priority: "low" | "medium" | "high" | "urgent";
    assignee: {
        name: string;
        color: string;
    } | null;
    storyPoints: number;
}

const mockSprint: SprintDetail = {
    id: "1",
    name: "Sprint 23 - Q1 Features",
    goal: "Complete core authentication features and improve dashboard performance",
    status: "active",
    startDate: "2026-03-01",
    endDate: "2026-03-14",
    teamId: "team-1",
    teamName: "Engineering",
    createdAt: "2026-02-28",
    issues: [
        {
            id: "1",
            title: "Implement OAuth2 login flow",
            status: "done",
            priority: "high",
            assignee: { name: "John Doe", color: "var(--plum)" },
            storyPoints: 5,
        },
        {
            id: "2",
            title: "Add password reset functionality",
            status: "in progress",
            priority: "medium",
            assignee: { name: "Jane Smith", color: "var(--tan)" },
            storyPoints: 3,
        },
        {
            id: "3",
            title: "Dashboard performance optimization",
            status: "in progress",
            priority: "high",
            assignee: { name: "Bob Wilson", color: "var(--light-plum)" },
            storyPoints: 8,
        },
        {
            id: "4",
            title: "Add 2FA support",
            status: "todo",
            priority: "medium",
            assignee: null,
            storyPoints: 5,
        },
        {
            id: "5",
            title: "Session management improvements",
            status: "backlog",
            priority: "low",
            assignee: null,
            storyPoints: 3,
        },
    ],
};

function SprintDetailPage() {
    const { sprintId } = useParams();
    const [sprint, setSprint] = useState<SprintDetail | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setSprint({ ...mockSprint, id: sprintId || "1" });
            setIsLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, [sprintId]);

    const handleNameChange = (name: string) => {
        if (sprint) setSprint({ ...sprint, name });
    };

    const handleGoalChange = (goal: string) => {
        if (sprint) setSprint({ ...sprint, goal });
    };

    const handleStatusChange = (status: SprintDetail["status"]) => {
        if (sprint) setSprint({ ...sprint, status });
    };

    const handleDatesChange = (startDate: string, endDate: string) => {
        if (sprint) setSprint({ ...sprint, startDate, endDate });
    };

    if (isLoading || !sprint) {
        return <div>Loading...</div>;
    }

    return (
        <SprintDetailPageLayout
            sprint={sprint}
            onNameChange={handleNameChange}
            onGoalChange={handleGoalChange}
            onStatusChange={handleStatusChange}
            onDatesChange={handleDatesChange}
        />
    );
}

export default SprintDetailPage;
