import styled from "styled-components";
import SprintDetailPageHeader from "./SprintDetailPageHeader";
import SprintDetailBody from "./body/SprintDetailBody";
import SprintDetailSidebar from "./sidebar/SprintDetailSidebar";
import type { SprintDetail } from "./SprintDetailPage";

interface SprintDetailPageLayoutProps {
    sprint: SprintDetail;
    onNameChange: (name: string) => void;
    onGoalChange: (goal: string) => void;
    onStatusChange: (status: SprintDetail["status"]) => void;
    onDatesChange: (startDate: string, endDate: string) => void;
}

const LayoutContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    background-color: var(--white);
`;

const MainContent = styled.div`
    display: flex;
    flex: 1;
    overflow: hidden;
`;

function SprintDetailPageLayout({
    sprint,
    onNameChange,
    onGoalChange,
    onStatusChange,
    onDatesChange,
}: SprintDetailPageLayoutProps) {
    return (
        <LayoutContainer>
            <SprintDetailPageHeader sprintName={sprint.name} />
            <MainContent>
                <SprintDetailBody
                    sprint={sprint}
                    onNameChange={onNameChange}
                    onGoalChange={onGoalChange}
                />
                <SprintDetailSidebar
                    status={sprint.status}
                    startDate={sprint.startDate}
                    endDate={sprint.endDate}
                    teamName={sprint.teamName}
                    createdAt={sprint.createdAt}
                    onStatusChange={onStatusChange}
                    onDatesChange={onDatesChange}
                />
            </MainContent>
        </LayoutContainer>
    );
}

export default SprintDetailPageLayout;
