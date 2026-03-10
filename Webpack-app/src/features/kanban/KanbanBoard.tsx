import styled from "styled-components";
import KanbanColumn from "./KanbanColumn";
import type { KanbanColumn as KanbanColumnType } from "../../pages/KanbanBoardPage";

interface KanbanBoardProps {
    columns: KanbanColumnType[];
    onMoveIssue: (issueId: string, targetColumnId: string) => void;
}

const BoardContainer = styled.div`
    display: flex;
    gap: 1rem;
    padding: 1rem;
    overflow-x: auto;
    flex: 1;
`;

function KanbanBoard({ columns, onMoveIssue }: KanbanBoardProps) {
    return (
        <BoardContainer>
            {columns.map((column) => (
                <KanbanColumn
                    key={column.id}
                    column={column}
                    onMoveIssue={onMoveIssue}
                />
            ))}
        </BoardContainer>
    );
}

export default KanbanBoard;
