import styled from "styled-components";
import { useState } from "react";
import MilestoneCard from "../features/milestones/MilestoneCard";
import CreateMilestoneModal from "../modals/milestone/CreateMilestoneModal";
import Button from "../design_system/Button";
import Icon from "../design_system/Icon";
import EmptyState from "../design_system/EmptyState";

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

const mockMilestones: Milestone[] = [
    {
        id: "1",
        title: "v1.0 Release",
        description: "Initial public release with core features",
        dueDate: "2026-03-31",
        status: "open",
        progress: 75,
        issueCount: 20,
        completedIssueCount: 15,
    },
    {
        id: "2",
        title: "Authentication System",
        description: "Complete OAuth2, SSO, and 2FA implementation",
        dueDate: "2026-03-15",
        status: "open",
        progress: 90,
        issueCount: 10,
        completedIssueCount: 9,
    },
    {
        id: "3",
        title: "Dashboard Redesign",
        description: "New dashboard with improved UX and performance",
        dueDate: "2026-04-15",
        status: "open",
        progress: 30,
        issueCount: 15,
        completedIssueCount: 4,
    },
    {
        id: "4",
        title: "Beta Testing",
        description: "Internal beta testing phase completed",
        dueDate: "2026-02-28",
        status: "closed",
        progress: 100,
        issueCount: 25,
        completedIssueCount: 25,
    },
];

function ViewMilestonesPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [milestones] = useState<Milestone[]>(mockMilestones);

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
