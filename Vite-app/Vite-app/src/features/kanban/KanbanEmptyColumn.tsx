import styled from "styled-components";
import Icon from "../../design_system/Icon";

const EmptyContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem 1rem;
    text-align: center;
`;

const IconWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    border-radius: 12px;
    background-color: var(--section-background);
    margin-bottom: 0.75rem;
`;

const EmptyText = styled.p`
    font-family: "Inter", sans-serif;
    font-size: 0.75rem;
    color: var(--text-secondary);
    margin: 0;
`;

const DropHint = styled.p`
    font-family: "Inter", sans-serif;
    font-size: 0.625rem;
    color: var(--text-secondary);
    margin: 0.5rem 0 0 0;
    opacity: 0.7;
`;

function KanbanEmptyColumn() {
    return (
        <EmptyContainer>
            <IconWrapper>
                <Icon name="Package" size={24} color="var(--text-secondary)" weight="regular" />
            </IconWrapper>
            <EmptyText>No issues yet</EmptyText>
            <DropHint>Drag issues here or create a new one</DropHint>
        </EmptyContainer>
    );
}

export default KanbanEmptyColumn;
