import styled from "styled-components";
import Icon from "../design_system/Icon";

interface NotificationItemActionsProps {
    isRead: boolean;
    onMarkAsRead: () => void;
    onDismiss: () => void;
}

const ActionsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    opacity: 0;
    transition: opacity 0.15s ease;

    *:hover > & {
        opacity: 1;
    }
`;

const ActionButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    background: transparent;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    color: var(--text-secondary);

    &:hover {
        background-color: var(--white);
        color: var(--text-primary);
    }
`;

function NotificationItemActions({
    isRead,
    onMarkAsRead,
    onDismiss,
}: NotificationItemActionsProps) {
    const handleMarkAsRead = (e: React.MouseEvent) => {
        e.stopPropagation();
        onMarkAsRead();
    };

    const handleDismiss = (e: React.MouseEvent) => {
        e.stopPropagation();
        onDismiss();
    };

    return (
        <ActionsContainer>
            {!isRead && (
                <ActionButton onClick={handleMarkAsRead} title="Mark as read">
                    <Icon name="Check" size={14} color="currentColor" weight="bold" />
                </ActionButton>
            )}
            <ActionButton onClick={handleDismiss} title="Dismiss">
                <Icon name="X" size={14} color="currentColor" weight="bold" />
            </ActionButton>
        </ActionsContainer>
    );
}

export default NotificationItemActions;
