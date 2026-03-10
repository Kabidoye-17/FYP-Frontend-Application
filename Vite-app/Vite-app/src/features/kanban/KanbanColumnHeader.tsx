import styled from "styled-components";
import Icon from "../../design_system/Icon";

interface KanbanColumnHeaderProps {
    title: string;
    count: number;
}

const HeaderContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.75rem 1rem;
    border-bottom: 1px solid var(--section-background);
`;

const TitleContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;

const Title = styled.h3`
    font-family: "Inter", sans-serif;
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--text-primary);
    margin: 0;
`;

const Count = styled.span`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 20px;
    height: 20px;
    padding: 0 0.375rem;
    background-color: var(--section-background);
    border-radius: 10px;
    font-family: "Inter", sans-serif;
    font-size: 0.75rem;
    font-weight: 500;
    color: var(--text-secondary);
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
    width: 24px;
    height: 24px;
    background: transparent;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    color: var(--text-secondary);

    &:hover {
        background-color: var(--section-background);
        color: var(--text-primary);
    }
`;

function KanbanColumnHeader({ title, count }: KanbanColumnHeaderProps) {
    return (
        <HeaderContainer>
            <TitleContainer>
                <Title>{title}</Title>
                <Count>{count}</Count>
            </TitleContainer>
            <ActionsContainer>
                <ActionButton>
                    <Icon name="Plus" size={16} color="currentColor" weight="bold" />
                </ActionButton>
                <ActionButton>
                    <Icon name="DotsThree" size={16} color="currentColor" weight="bold" />
                </ActionButton>
            </ActionsContainer>
        </HeaderContainer>
    );
}

export default KanbanColumnHeader;
