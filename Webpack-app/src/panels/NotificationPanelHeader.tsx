import styled from "styled-components";
import Icon from "../design_system/Icon";
import NotificationBadge from "../design_system/NotificationBadge";

interface NotificationPanelHeaderProps {
    unreadCount: number;
    onClose: () => void;
    onMarkAllRead: () => void;
    onOpenPreferences: () => void;
}

const HeaderContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    border-bottom: 1px solid var(--section-background);
`;

const TitleContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;

const Title = styled.h2`
    font-family: "Inter", sans-serif;
    font-size: 1rem;
    font-weight: 600;
    color: var(--text-primary);
    margin: 0;
`;

const ActionsContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 0.25rem;
`;

const ActionButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    background: transparent;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    color: var(--text-secondary);

    &:hover {
        background-color: var(--section-background);
        color: var(--text-primary);
    }
`;

const MarkReadButton = styled.button`
    display: flex;
    align-items: center;
    gap: 0.25rem;
    padding: 0.375rem 0.5rem;
    background: transparent;
    border: none;
    border-radius: 4px;
    font-family: "Inter", sans-serif;
    font-size: 0.75rem;
    color: var(--plum);
    cursor: pointer;

    &:hover {
        background-color: var(--light-plum);
    }

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;

function NotificationPanelHeader({
    unreadCount,
    onClose,
    onMarkAllRead,
    onOpenPreferences,
}: NotificationPanelHeaderProps) {
    return (
        <HeaderContainer>
            <TitleContainer>
                <Icon name="Bell" size={20} color="var(--plum)" weight="fill" />
                <Title>Notifications</Title>
                {unreadCount > 0 && <NotificationBadge count={unreadCount} />}
            </TitleContainer>
            <ActionsContainer>
                <MarkReadButton onClick={onMarkAllRead} disabled={unreadCount === 0}>
                    <Icon name="Checks" size={14} color="currentColor" weight="bold" />
                    Mark all read
                </MarkReadButton>
                <ActionButton onClick={onOpenPreferences}>
                    <Icon name="Gear" size={18} color="currentColor" weight="regular" />
                </ActionButton>
                <ActionButton onClick={onClose}>
                    <Icon name="X" size={20} color="currentColor" weight="regular" />
                </ActionButton>
            </ActionsContainer>
        </HeaderContainer>
    );
}

export default NotificationPanelHeader;
