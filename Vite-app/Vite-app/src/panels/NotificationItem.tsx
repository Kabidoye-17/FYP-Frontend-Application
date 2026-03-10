import styled from "styled-components";
import Icon from "../design_system/Icon";
import NotificationItemActions from "./NotificationItemActions";
import type { Notification } from "./NotificationPanel";

interface NotificationItemProps {
    notification: Notification;
    onMarkAsRead: () => void;
    onDismiss: () => void;
}

const ItemContainer = styled.div<{ $isRead: boolean }>`
    display: flex;
    gap: 0.75rem;
    padding: 0.75rem 1rem;
    background-color: ${({ $isRead }) =>
        $isRead ? "transparent" : "rgba(139, 92, 246, 0.05)"};
    cursor: pointer;
    position: relative;

    &:hover {
        background-color: var(--section-background);
    }
`;

const UnreadDot = styled.div`
    position: absolute;
    left: 0.5rem;
    top: 50%;
    transform: translateY(-50%);
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: var(--plum);
`;

const IconContainer = styled.div<{ $type: Notification["type"] }>`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: 8px;
    background-color: ${({ $type }) => {
        switch ($type) {
            case "mention":
                return "rgba(139, 92, 246, 0.1)";
            case "assignment":
                return "rgba(34, 197, 94, 0.1)";
            case "comment":
                return "rgba(59, 130, 246, 0.1)";
            case "status":
                return "rgba(245, 158, 11, 0.1)";
            case "due_date":
                return "rgba(239, 68, 68, 0.1)";
            default:
                return "var(--section-background)";
        }
    }};
    flex-shrink: 0;
`;

const ContentContainer = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.125rem;
    min-width: 0;
`;

const Title = styled.span<{ $isRead: boolean }>`
    font-family: "Inter", sans-serif;
    font-size: 0.875rem;
    font-weight: ${({ $isRead }) => ($isRead ? 500 : 600)};
    color: var(--text-primary);
`;

const Description = styled.p`
    font-family: "Inter", sans-serif;
    font-size: 0.75rem;
    color: var(--text-secondary);
    margin: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

const Timestamp = styled.span`
    font-family: "Inter", sans-serif;
    font-size: 0.625rem;
    color: var(--text-secondary);
`;

function NotificationItem({
    notification,
    onMarkAsRead,
    onDismiss,
}: NotificationItemProps) {
    const getIcon = () => {
        switch (notification.type) {
            case "mention":
                return { name: "At", color: "var(--plum)" };
            case "assignment":
                return { name: "UserPlus", color: "var(--success-green)" };
            case "comment":
                return { name: "ChatCircle", color: "#3B82F6" };
            case "status":
                return { name: "ArrowsClockwise", color: "var(--warning-orange)" };
            case "due_date":
                return { name: "Calendar", color: "var(--error-red)" };
            default:
                return { name: "Bell", color: "var(--text-secondary)" };
        }
    };

    const formatTimestamp = (timestamp: string) => {
        const date = new Date(timestamp);
        const now = new Date();
        const diff = now.getTime() - date.getTime();
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor(diff / (1000 * 60));

        if (minutes < 60) {
            return `${minutes}m ago`;
        } else if (hours < 24) {
            return `${hours}h ago`;
        } else {
            return date.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
            });
        }
    };

    const icon = getIcon();

    return (
        <ItemContainer $isRead={notification.isRead}>
            {!notification.isRead && <UnreadDot />}
            <IconContainer $type={notification.type}>
                <Icon
                    name={icon.name as any}
                    size={18}
                    color={icon.color}
                    weight="regular"
                />
            </IconContainer>
            <ContentContainer>
                <Title $isRead={notification.isRead}>{notification.title}</Title>
                <Description>{notification.description}</Description>
                <Timestamp>{formatTimestamp(notification.timestamp)}</Timestamp>
            </ContentContainer>
            <NotificationItemActions
                isRead={notification.isRead}
                onMarkAsRead={onMarkAsRead}
                onDismiss={onDismiss}
            />
        </ItemContainer>
    );
}

export default NotificationItem;
