import styled from "styled-components";
import { useState } from "react";
import KanbanBoard from "../features/kanban/KanbanBoard";

export interface KanbanIssue {
    id: string;
    title: string;
    description: string;
    priority: "low" | "medium" | "high" | "urgent";
    assignee: {
        name: string;
        color: string;
    } | null;
    labels: string[];
    dueDate: string | null;
}

export interface KanbanColumn {
    id: string;
    title: string;
    status: string;
    issues: KanbanIssue[];
}

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

const mockColumns: KanbanColumn[] = [
    {
        id: "backlog",
        title: "Backlog",
        status: "backlog",
        issues: [
            {
                id: "1",
                title: "Research competitor features",
                description: "Analyze top 5 competitors and document their key features",
                priority: "low",
                assignee: null,
                labels: ["research"],
                dueDate: null,
            },
            {
                id: "2",
                title: "Update documentation",
                description: "Review and update API documentation",
                priority: "medium",
                assignee: { name: "Jane Smith", color: "var(--tan)" },
                labels: ["docs"],
                dueDate: "2026-03-20",
            },
        ],
    },
    {
        id: "todo",
        title: "To Do",
        status: "todo",
        issues: [
            {
                id: "3",
                title: "Implement dark mode",
                description: "Add dark mode toggle and theme support",
                priority: "high",
                assignee: { name: "Bob Wilson", color: "var(--light-plum)" },
                labels: ["feature", "ui"],
                dueDate: "2026-03-15",
            },
        ],
    },
    {
        id: "in-progress",
        title: "In Progress",
        status: "in progress",
        issues: [
            {
                id: "4",
                title: "Fix login redirect bug",
                description: "Users are not being redirected after login",
                priority: "urgent",
                assignee: { name: "John Doe", color: "var(--plum)" },
                labels: ["bug"],
                dueDate: "2026-03-10",
            },
            {
                id: "5",
                title: "Add form validation",
                description: "Implement client-side validation for signup form",
                priority: "medium",
                assignee: { name: "Alice Brown", color: "var(--tan)" },
                labels: ["feature"],
                dueDate: "2026-03-12",
            },
        ],
    },
    {
        id: "done",
        title: "Done",
        status: "done",
        issues: [
            {
                id: "6",
                title: "Setup CI/CD pipeline",
                description: "Configure GitHub Actions for automated deployment",
                priority: "high",
                assignee: { name: "Tom Davis", color: "var(--plum)" },
                labels: ["devops"],
                dueDate: "2026-03-05",
            },
        ],
    },
];

function KanbanBoardPage() {
    const [columns, setColumns] = useState<KanbanColumn[]>(mockColumns);

    const handleMoveIssue = (issueId: string, targetColumnId: string) => {
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
    };

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
