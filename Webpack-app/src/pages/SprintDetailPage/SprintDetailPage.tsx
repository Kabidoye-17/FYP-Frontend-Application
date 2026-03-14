import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import SprintDetailPageLayout from "./SprintDetailPageLayout";
import EmptyState from "../../design_system/EmptyState";
import Button from "../../design_system/Button";
import { useSprint, useUpdateSprint } from "../../hooks/queries";

export interface SprintDetail {
    id: string;
    name: string;
    goal: string;
    status: "planned" | "active" | "completed";
    startDate: string;
    endDate: string;
    teamId: string;
    teamName: string;
    issues: SprintIssue[];
    createdAt: string;
}

export interface SprintIssue {
    id: string;
    title: string;
    status: "backlog" | "todo" | "in progress" | "done";
    priority: "low" | "medium" | "high" | "urgent";
    assignee: {
        name: string;
        color: string;
    } | null;
    storyPoints: number;
}

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: var(--page-background);
`;

const ErrorContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 2rem;
  background-color: var(--page-background);
`;

function SprintDetailPage() {
    const { sprintId } = useParams();
    const navigate = useNavigate();

    const { data: sprint, isLoading, isError, error } = useSprint(sprintId || '');
    const updateSprint = useUpdateSprint();

    // Transform API sprint to component format
    const transformedSprint: SprintDetail | null = sprint ? {
        id: sprint.id,
        name: sprint.name,
        goal: sprint.goal || '',
        status: (sprint.status === 'planning' ? 'planned' : sprint.status) as SprintDetail['status'],
        startDate: sprint.startDate?.split('T')[0] || '',
        endDate: sprint.endDate?.split('T')[0] || '',
        teamId: 'team-1',
        teamName: 'Engineering',
        createdAt: sprint.createdAt?.split('T')[0] || '',
        issues: sprint.issues?.map(issue => ({
            id: issue.id,
            title: issue.title,
            status: issue.status as SprintIssue['status'],
            priority: issue.priority as SprintIssue['priority'],
            assignee: null, // Brief issues don't include assignee
            storyPoints: 0, // Would need to be fetched from full issue
        })) || [],
    } : null;

    const handleNameChange = (name: string) => {
        if (sprintId) {
            updateSprint.mutate({ id: sprintId, data: { name } });
        }
    };

    const handleGoalChange = (goal: string) => {
        if (sprintId) {
            updateSprint.mutate({ id: sprintId, data: { goal } });
        }
    };

    const handleStatusChange = (status: SprintDetail["status"]) => {
        if (sprintId) {
            // Map 'planned' back to 'planning' for API
            const apiStatus = status === 'planned' ? 'planning' : status;
            updateSprint.mutate({ id: sprintId, data: { status: apiStatus as any } });
        }
    };

    const handleDatesChange = (startDate: string, endDate: string) => {
        if (sprintId) {
            updateSprint.mutate({
                id: sprintId,
                data: {
                    startDate: startDate || null,
                    endDate: endDate || null
                }
            });
        }
    };

    if (isLoading) {
        return <LoadingContainer>Loading sprint...</LoadingContainer>;
    }

    if (isError || !transformedSprint) {
        return (
            <ErrorContainer>
                <EmptyState
                    icon="Warning"
                    title="Sprint not found"
                    description={error?.message || "The sprint you're looking for doesn't exist."}
                    action={<Button onClick={() => navigate('/home/sprints')}>Back to Sprints</Button>}
                />
            </ErrorContainer>
        );
    }

    return (
        <SprintDetailPageLayout
            sprint={transformedSprint}
            onNameChange={handleNameChange}
            onGoalChange={handleGoalChange}
            onStatusChange={handleStatusChange}
            onDatesChange={handleDatesChange}
        />
    );
}

export default SprintDetailPage;
