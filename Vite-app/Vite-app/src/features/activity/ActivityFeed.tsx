import styled from "styled-components";
import { useState } from "react";
import ActivityFeedHeader from "./ActivityFeedHeader";
import ActivityFeedItem from "./ActivityFeedItem";
import ActivityFeedEmptyState from "./ActivityFeedEmptyState";

export interface ActivityItem {
    id: string;
    type: "created" | "updated" | "commented" | "assigned" | "mentioned" | "status_changed" | "completed";
    user: {
        name: string;
        color: string;
    };
    target: string;
    targetType: "issue" | "project" | "sprint" | "milestone";
    details?: string;
    timestamp: string;
}

export type ActivityFilter = "all" | "issues" | "projects" | "comments";

interface ActivityFeedProps {
    activities?: ActivityItem[];
}

const FeedContainer = styled.div`
    display: flex;
    flex-direction: column;
    background-color: var(--white);
    border-radius: 12px;
    border: 1px solid var(--section-background);
    overflow: hidden;
`;

const ActivityList = styled.div`
    max-height: 400px;
    overflow-y: auto;
`;

const mockActivities: ActivityItem[] = [
    {
        id: "1",
        type: "completed",
        user: { name: "John Doe", color: "var(--plum)" },
        target: "Implement OAuth2 login flow",
        targetType: "issue",
        timestamp: "2026-03-10T14:30:00Z",
    },
    {
        id: "2",
        type: "commented",
        user: { name: "Jane Smith", color: "var(--tan)" },
        target: "Dashboard performance optimization",
        targetType: "issue",
        details: "Great progress! Let's review the caching strategy.",
        timestamp: "2026-03-10T13:15:00Z",
    },
    {
        id: "3",
        type: "assigned",
        user: { name: "Bob Wilson", color: "var(--light-plum)" },
        target: "Add 2FA support",
        targetType: "issue",
        details: "Alice Brown",
        timestamp: "2026-03-10T11:45:00Z",
    },
    {
        id: "4",
        type: "status_changed",
        user: { name: "Alice Brown", color: "var(--tan)" },
        target: "Session management improvements",
        targetType: "issue",
        details: "In Progress",
        timestamp: "2026-03-10T10:00:00Z",
    },
    {
        id: "5",
        type: "created",
        user: { name: "Tom Davis", color: "var(--plum)" },
        target: "v1.0 Release",
        targetType: "milestone",
        timestamp: "2026-03-09T16:30:00Z",
    },
    {
        id: "6",
        type: "updated",
        user: { name: "Jane Smith", color: "var(--tan)" },
        target: "Sprint 23 - Q1 Features",
        targetType: "sprint",
        details: "Extended end date to March 14",
        timestamp: "2026-03-09T14:00:00Z",
    },
];

function ActivityFeed({ activities = mockActivities }: ActivityFeedProps) {
    const [filter, setFilter] = useState<ActivityFilter>("all");

    const filteredActivities = activities.filter((activity) => {
        if (filter === "all") return true;
        if (filter === "issues") return activity.targetType === "issue";
        if (filter === "projects") return activity.targetType === "project";
        if (filter === "comments") return activity.type === "commented";
        return true;
    });

    return (
        <FeedContainer>
            <ActivityFeedHeader filter={filter} onFilterChange={setFilter} />
            <ActivityList>
                {filteredActivities.length === 0 ? (
                    <ActivityFeedEmptyState filter={filter} />
                ) : (
                    filteredActivities.map((activity) => (
                        <ActivityFeedItem key={activity.id} activity={activity} />
                    ))
                )}
            </ActivityList>
        </FeedContainer>
    );
}

export default ActivityFeed;
