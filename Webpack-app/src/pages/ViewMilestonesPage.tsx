import styled from "styled-components";
import { useState } from "react";
import MilestoneCard from "../features/milestones/MilestoneCard";
import CreateMilestoneModal from "../modals/milestone/CreateMilestoneModal";
import Button from "../design_system/Button";
import Icon from "../design_system/Icon";
import EmptyState from "../design_system/EmptyState";
import { useMilestones } from "../hooks/queries";

export interface Milestone {
    id: string;
    title: string;
    description: string;
    dueDate: string;
    status: "open" | "closed";
    progress: number;
    issueCount: number;
    completedIssueCount: number;
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
`;

const PageHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    border-bottom: 1px solid var(--section-background);
`;

const PageTitle = styled.h1`
    font-family: "Inter", sans-serif;
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--text-primary);
    margin: 0;
`;

const CreateButton = styled(Button)`
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;

const MilestonesGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 1rem;
    padding: 1rem;
    overflow-y: auto;
    flex: 1;
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

function ViewMilestonesPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { data: apiMilestones, isLoading, isError, error, refetch } = useMilestones();

    // Transform API milestones to component format
    const milestones: Milestone[] = apiMilestones?.map(m => ({
        id: m.id,
        title: m.title,
        description: m.description || '',
        dueDate: m.dueDate?.split('T')[0] || '',
        status: m.status === 'closed' ? 'closed' : 'open',
        issueCount: m.issues?.length || 0,
        completedIssueCount: m.issues?.filter(i => i.status === 'done' || i.status === 'completed').length || 0,
        progress: m.issues?.length
            ? Math.round((m.issues.filter(i => i.status === 'done' || i.status === 'completed').length / m.issues.length) * 100)
            : 0,
    })) || [];

    if (isLoading) {
        return (
            <PageContainer>
                <PageHeader>
                    <PageTitle>Milestones</PageTitle>
                    <CreateButton onClick={() => setIsModalOpen(true)}>
                        <Icon name="Plus" size={16} color="currentColor" weight="bold" />
                        New Milestone
                    </CreateButton>
                </PageHeader>
                <LoadingContainer>Loading milestones...</LoadingContainer>
                <CreateMilestoneModal open={isModalOpen} onOpenChange={setIsModalOpen} />
            </PageContainer>
        );
    }

    if (isError) {
        return (
            <PageContainer>
                <PageHeader>
                    <PageTitle>Milestones</PageTitle>
                    <CreateButton onClick={() => setIsModalOpen(true)}>
                        <Icon name="Plus" size={16} color="currentColor" weight="bold" />
                        New Milestone
                    </CreateButton>
                </PageHeader>
                <ErrorContainer>
                    <EmptyState
                        icon="Warning"
                        title="Failed to load milestones"
                        description={error?.message || "An error occurred while loading milestones"}
                        action={<Button onClick={() => refetch()}>Retry</Button>}
                    />
                </ErrorContainer>
                <CreateMilestoneModal open={isModalOpen} onOpenChange={setIsModalOpen} />
            </PageContainer>
        );
    }

    return (
        <PageContainer>
            <PageHeader>
                <PageTitle>Milestones</PageTitle>
                <CreateButton onClick={() => setIsModalOpen(true)}>
                    <Icon name="Plus" size={16} color="currentColor" weight="bold" />
                    New Milestone
                </CreateButton>
            </PageHeader>
            {milestones.length === 0 ? (
                <EmptyState
                    icon="Flag"
                    title="No milestones yet"
                    description="Create your first milestone to track major project goals and releases."
                    action={
                        <Button onClick={() => setIsModalOpen(true)}>Create Milestone</Button>
                    }
                />
            ) : (
                <MilestonesGrid>
                    {milestones.map((milestone) => (
                        <MilestoneCard key={milestone.id} milestone={milestone} />
                    ))}
                </MilestonesGrid>
            )}
            <CreateMilestoneModal open={isModalOpen} onOpenChange={setIsModalOpen} />
        </PageContainer>
    );
}

export default ViewMilestonesPage;
