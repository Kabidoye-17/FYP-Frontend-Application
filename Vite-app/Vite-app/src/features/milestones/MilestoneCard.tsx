import styled from "styled-components";
import MilestoneCardHeader from "./MilestoneCardHeader";
import MilestoneCardBody from "./MilestoneCardBody";
import MilestoneCardFooter from "./MilestoneCardFooter";
import type { Milestone } from "../../pages/ViewMilestonesPage";

interface MilestoneCardProps {
    milestone: Milestone;
}

const CardContainer = styled.div`
    display: flex;
    flex-direction: column;
    background-color: var(--white);
    border: 1px solid var(--section-background);
    border-radius: 12px;
    overflow: hidden;
    transition: box-shadow 0.15s ease, transform 0.15s ease;

    &:hover {
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        transform: translateY(-2px);
    }
`;

function MilestoneCard({ milestone }: MilestoneCardProps) {
    return (
        <CardContainer>
            <MilestoneCardHeader
                title={milestone.title}
                status={milestone.status}
                dueDate={milestone.dueDate}
            />
            <MilestoneCardBody
                description={milestone.description}
                progress={milestone.progress}
            />
            <MilestoneCardFooter
                issueCount={milestone.issueCount}
                completedIssueCount={milestone.completedIssueCount}
            />
        </CardContainer>
    );
}

export default MilestoneCard;
