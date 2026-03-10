import styled from "styled-components";
import Icon from "../../design_system/Icon";

interface BulkEditItem {
    id: string;
    title: string;
}

interface BulkEditPreviewListProps {
    items: BulkEditItem[];
    maxVisible?: number;
}

const Container = styled.div`
    margin-top: 1rem;
`;

const Label = styled.span`
    font-family: "Inter", sans-serif;
    font-size: 0.75rem;
    font-weight: 500;
    color: var(--text-secondary);
`;

const List = styled.div`
    margin-top: 0.5rem;
    border: 1px solid var(--border-color);
    border-radius: 8px;
    overflow: hidden;
`;

const Item = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 0.75rem;
    font-family: "Inter", sans-serif;
    font-size: 0.8125rem;
    color: var(--text-primary);

    &:not(:last-child) {
        border-bottom: 1px solid var(--border-color);
    }
`;

const MoreItems = styled.div`
    padding: 0.5rem 0.75rem;
    font-family: "Inter", sans-serif;
    font-size: 0.75rem;
    color: var(--text-secondary);
    background-color: var(--section-background);
    text-align: center;
`;

function BulkEditPreviewList({
    items,
    maxVisible = 5,
}: Readonly<BulkEditPreviewListProps>) {
    const visibleItems = items.slice(0, maxVisible);
    const remainingCount = items.length - maxVisible;

    return (
        <Container>
            <Label>Items to update</Label>
            <List>
                {visibleItems.map((item) => (
                    <Item key={item.id}>
                        <Icon name="Circle" size={14} color="var(--text-secondary)" weight="regular" />
                        {item.title}
                    </Item>
                ))}
                {remainingCount > 0 && (
                    <MoreItems>+{remainingCount} more item{remainingCount !== 1 ? "s" : ""}</MoreItems>
                )}
            </List>
        </Container>
    );
}

export default BulkEditPreviewList;
