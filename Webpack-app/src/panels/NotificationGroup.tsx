import styled from "styled-components";
import NotificationItem from "./NotificationItem";
import type { NotificationGroupData } from "./NotificationPanel";

interface NotificationGroupProps {
    group: NotificationGroupData;
    onMarkAsRead: (id: string) => void;
    onDismiss: (id: string) => void;
}

const GroupContainer = styled.div`
    padding: 0.75rem 0;
`;

const GroupTitle = styled.h3`
    font-family: "Inter", sans-serif;
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--text-secondary);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    padding: 0 1rem;
    margin: 0 0 0.5rem 0;
`;

const NotificationsList = styled.div`
    display: flex;
    flex-direction: column;
`;

function NotificationGroup({
    group,
    onMarkAsRead,
    onDismiss,
}: NotificationGroupProps) {
    return (
        <GroupContainer>
            <GroupTitle>{group.title}</GroupTitle>
            <NotificationsList>
                {group.notifications.map((notification) => (
                    <NotificationItem
                        key={notification.id}
                        notification={notification}
                        onMarkAsRead={() => onMarkAsRead(notification.id)}
                        onDismiss={() => onDismiss(notification.id)}
                    />
                ))}
            </NotificationsList>
        </GroupContainer>
    );
}

export default NotificationGroup;
