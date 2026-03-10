import styled from "styled-components";
import Icon from "../design_system/Icon";

interface TimeLogPanelHeaderProps {
    onClose: () => void;
    onAddClick: () => void;
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
    gap: 0.5rem;
`;

const IconButton = styled.button`
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

const AddButton = styled.button`
    display: flex;
    align-items: center;
    gap: 0.25rem;
    padding: 0.375rem 0.75rem;
    background-color: var(--plum);
    color: var(--white);
    border: none;
    border-radius: 6px;
    font-family: "Inter", sans-serif;
    font-size: 0.75rem;
    font-weight: 500;
    cursor: pointer;

    &:hover {
        opacity: 0.9;
    }
`;

function TimeLogPanelHeader({ onClose, onAddClick }: TimeLogPanelHeaderProps) {
    return (
        <HeaderContainer>
            <TitleContainer>
                <Icon name="Clock" size={20} color="var(--plum)" weight="fill" />
                <Title>Time Log</Title>
            </TitleContainer>
            <ActionsContainer>
                <AddButton onClick={onAddClick}>
                    <Icon name="Plus" size={14} color="currentColor" weight="bold" />
                    Log Time
                </AddButton>
                <IconButton onClick={onClose}>
                    <Icon name="X" size={20} color="currentColor" weight="regular" />
                </IconButton>
            </ActionsContainer>
        </HeaderContainer>
    );
}

export default TimeLogPanelHeader;
