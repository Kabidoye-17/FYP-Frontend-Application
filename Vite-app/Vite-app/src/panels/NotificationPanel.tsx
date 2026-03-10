import styled from "styled-components";
import { useState } from "react";
import NotificationPanelHeader from "./NotificationPanelHeader";
import NotificationGroup from "./NotificationGroup";
import EmptyState from "../design_system/EmptyState";

export interface Notification {
    id: string;
    type: "mention" | "assignment" | "comment" | "status" | "due_date";
    title: string;
    description: string;
    timestamp: string;
    isRead: boolean;
    link?: string;
}

export interface NotificationGroupData {
    title: string;
    notifications: Notification[];
}

interface NotificationPanelProps {
    isOpen: boolean;
    onClose: () => void;
    onOpenPreferences: () => void;
}

const PanelOverlay = styled.div<{ $isOpen: boolean }>`
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.3);
    opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
    visibility: ${({ $isOpen }) => ($isOpen ? "visible" : "hidden")};
    transition: opacity 0.2s ease, visibility 0.2s ease;
    z-index: 100;
`;

const PanelContainer = styled.div<{ $isOpen: boolean }>`
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    width: 380px;
    background-color: var(--white);
    box-shadow: -4px 0 24px rgba(0, 0, 0, 0.1);
    transform: translateX(${({ $isOpen }) => ($isOpen ? "0" : "100%")});
    transition: transform 0.3s ease;
    z-index: 101;
    display: flex;
    flex-direction: column;
`;

const NotificationsList = styled.div`
    flex: 1;
    overflow-y: auto;
`;

const mockNotificationGroups: NotificationGroupData[] = [
    {
        title: "Today",
        notifications: [
            {
                id: "1",
                type: "mention",
                title: "You were mentioned",
                description: "@johndoe mentioned you in 'Dashboard redesign'",
                timestamp: "2026-03-10T14:30:00Z",
                isRead: false,
            },
            {
                id: "2",
                type: "assignment",
                title: "New assignment",
                description: "You were assigned to 'Fix login redirect bug'",
                timestamp: "2026-03-10T13:00:00Z",
                isRead: false,
            },
            {
                id: "3",
                type: "comment",
                title: "New comment",
                description: "Jane Smith commented on 'API optimization'",
                timestamp: "2026-03-10T11:30:00Z",
                isRead: true,
            },
        ],
    },
    {
        title: "Yesterday",
        notifications: [
            {
                id: "4",
                type: "status",
                title: "Status updated",
                description: "'OAuth implementation' moved to Done",
                timestamp: "2026-03-09T16:00:00Z",
                isRead: true,
            },
            {
                id: "5",
                type: "due_date",
                title: "Due soon",
                description: "'Mobile responsive fixes' is due tomorrow",
                timestamp: "2026-03-09T09:00:00Z",
                isRead: true,
            },
        ],
    },
    {
        title: "This Week",
        notifications: [
            {
                id: "6",
                type: "comment",
                title: "New comment",
                description: "Bob Wilson commented on 'Sprint planning'",
                timestamp: "2026-03-07T14:00:00Z",
                isRead: true,
            },
        ],
    },
];

function NotificationPanel({
    isOpen,
    onClose,
    onOpenPreferences,
}: NotificationPanelProps) {
    const [groups, setGroups] = useState<NotificationGroupData[]>(mockNotificationGroups);

    const unreadCount = groups.reduce(
        (count, group) =>
            count + group.notifications.filter((n) => !n.isRead).length,
        0
    );

    const handleMarkAllRead = () => {
        setGroups(
            groups.map((group) => ({
                ...group,
                notifications: group.notifications.map((n) => ({
                    ...n,
                    isRead: true,
                })),
            }))
        );
    };

    const handleMarkAsRead = (notificationId: string) => {
        setGroups(
            groups.map((group) => ({
                ...group,
                notifications: group.notifications.map((n) =>
                    n.id === notificationId ? { ...n, isRead: true } : n
                ),
            }))
        );
    };

    const handleDismiss = (notificationId: string) => {
        setGroups(
            groups.map((group) => ({
                ...group,
                notifications: group.notifications.filter(
                    (n) => n.id !== notificationId
                ),
            }))
        );
    };

    const hasNotifications = groups.some((g) => g.notifications.length > 0);

    return (
        <>
            <PanelOverlay $isOpen={isOpen} onClick={onClose} />
            <PanelContainer $isOpen={isOpen}>
                <NotificationPanelHeader
                    unreadCount={unreadCount}
                    onClose={onClose}
                    onMarkAllRead={handleMarkAllRead}
                    onOpenPreferences={onOpenPreferences}
                />
                <NotificationsList>
                    {!hasNotifications ? (
                        <EmptyState
                            icon="Bell"
                            title="No notifications"
                            description="You're all caught up!"
                        />
                    ) : (
                        groups
                            .filter((g) => g.notifications.length > 0)
                            .map((group) => (
                                <NotificationGroup
                                    key={group.title}
                                    group={group}
                                    onMarkAsRead={handleMarkAsRead}
                                    onDismiss={handleDismiss}
                                />
                            ))
                    )}
                </NotificationsList>
            </PanelContainer>
        </>
    );
}

export default NotificationPanel;
