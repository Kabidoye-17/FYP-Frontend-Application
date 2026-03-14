import styled from "styled-components";
import KanbanColumnHeader from "./KanbanColumnHeader";
import KanbanCard from "./KanbanCard";
import KanbanEmptyColumn from "./KanbanEmptyColumn";
import type { KanbanColumn as KanbanColumnType } from "../../utils/dataHelpers";

interface KanbanColumnProps {
    column: KanbanColumnType;
    onMoveIssue: (issueId: string, targetColumnId: string) => void;
}

const ColumnContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 300px;
    min-width: 300px;
    background-color: var(--white);
    border-radius: 12px;
    max-height: 100%;
`;

const ColumnContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 0.5rem;
    overflow-y: auto;
    flex: 1;
`;

function KanbanColumn({ column, onMoveIssue }: KanbanColumnProps) {
    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        const issueId = e.dataTransfer.getData("issueId");
        if (issueId) {
            onMoveIssue(issueId, column.id);
        }
    };

    return (
        <ColumnContainer onDragOver={handleDragOver} onDrop={handleDrop}>
            <KanbanColumnHeader title={column.title} count={column.issues.length} />
            <ColumnContent>
                {column.issues.length === 0 ? (
                    <KanbanEmptyColumn />
                ) : (
                    column.issues.map((issue) => (
                        <KanbanCard key={issue.id} issue={issue} />
                    ))
                )}
            </ColumnContent>
        </ColumnContainer>
    );
}

export default KanbanColumn;
