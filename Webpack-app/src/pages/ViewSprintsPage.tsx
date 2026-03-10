import styled from "styled-components";
import { useState } from "react";
import ViewSprintsPageTable from "../Tables/ViewSprintsPage/ViewSprintsPageTable";
import CreateSprintModal from "../modals/sprint/CreateSprintModal";
import Button from "../design_system/Button";
import Icon from "../design_system/Icon";

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

function ViewSprintsPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <PageContainer>
            <PageHeader>
                <PageTitle>Sprints</PageTitle>
                <CreateButton onClick={() => setIsModalOpen(true)}>
                    <Icon name="Plus" size={16} color="currentColor" weight="bold" />
                    New Sprint
                </CreateButton>
            </PageHeader>
            <ViewSprintsPageTable />
            <CreateSprintModal open={isModalOpen} onOpenChange={setIsModalOpen} />
        </PageContainer>
    );
}

export default ViewSprintsPage;
