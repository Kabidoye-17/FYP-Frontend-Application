import styled from "styled-components";
import { useState, useEffect } from "react";
import KanbanBoard from "../features/kanban/KanbanBoard";
import EmptyState from "../design_system/EmptyState";
import Button from "../design_system/Button";
import { useIssues, useUpdateIssue } from "../hooks/queries";
import { transformIssuesForKanban, type KanbanColumn, type KanbanIssue } from "../utils/dataHelpers";

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    background-color: var(--section-background);
`;

const PageHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background-color: var(--white);
    border-bottom: 1px solid var(--section-background);
`;

const PageTitle = styled.h1`
    font-family: "Inter", sans-serif;
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--text-primary);
    margin: 0;
`;

const LoadingContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    padding: 2rem;
`;

const ErrorContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    padding: 2rem;
`;

// Map column IDs to API status values
const columnToStatus: Record<string, string> = {
    'backlog': 'backlog',
    'todo': 'todo',
    'in-progress': 'in progress',
    'done': 'done',
};

function KanbanBoardPage() {
    const { data: issues, isLoading, isError, error, refetch } = useIssues();
    const updateIssue = useUpdateIssue();
    const [columns, setColumns] = useState<KanbanColumn[]>([]);

    // Update local state when API data changes
    useEffect(() => {
        if (issues) {
            setColumns(transformIssuesForKanban(issues));
        }
    }, [issues]);

    const handleMoveIssue = (issueId: string, targetColumnId: string) => {
        // Optimistic update
        setColumns((prevColumns) => {
            let movedIssue: KanbanIssue | null = null;

            const newColumns = prevColumns.map((column) => ({
                ...column,
                issues: column.issues.filter((issue) => {
                    if (issue.id === issueId) {
                        movedIssue = issue;
                        return false;
                    }
                    return true;
                }),
            }));

            if (movedIssue) {
                return newColumns.map((column) => {
                    if (column.id === targetColumnId) {
                        return { ...column, issues: [...column.issues, movedIssue!] };
                    }
                    return column;
                });
            }

            return prevColumns;
        });

        // Persist to API
        const newStatus = columnToStatus[targetColumnId];
        if (newStatus) {
            updateIssue.mutate(
                { id: issueId, data: { status: newStatus as any } },
                {
                    onError: () => {
                        // Revert on error by refetching
                        refetch();
                    }
                }
            );
        }
    };

    if (isLoading) {
        return (
            <PageContainer>
                <PageHeader>
                    <PageTitle>Kanban Board</PageTitle>
                </PageHeader>
                <LoadingContainer>Loading issues...</LoadingContainer>
            </PageContainer>
        );
    }

    if (isError) {
        return (
            <PageContainer>
                <PageHeader>
                    <PageTitle>Kanban Board</PageTitle>
                </PageHeader>
                <ErrorContainer>
                    <EmptyState
                        icon="Warning"
                        title="Failed to load issues"
                        description={error?.message || "An error occurred while loading the board"}
                        action={<Button onClick={() => refetch()}>Retry</Button>}
                    />
                </ErrorContainer>
            </PageContainer>
        );
    }

    if (!issues || issues.length === 0) {
        return (
            <PageContainer>
                <PageHeader>
                    <PageTitle>Kanban Board</PageTitle>
                </PageHeader>
                <ErrorContainer>
                    <EmptyState
                        icon="Kanban"
                        title="No issues yet"
                        description="Create some issues to see them on the Kanban board"
                    />
                </ErrorContainer>
            </PageContainer>
        );
    }

    return (
        <PageContainer>
            <PageHeader>
                <PageTitle>Kanban Board</PageTitle>
            </PageHeader>
            <KanbanBoard columns={columns} onMoveIssue={handleMoveIssue} />
        </PageContainer>
    );
}

export default KanbanBoardPage;
