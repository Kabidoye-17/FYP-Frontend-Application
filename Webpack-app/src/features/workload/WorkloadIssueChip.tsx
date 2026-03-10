import styled from "styled-components";
import Icon from "../../design_system/Icon";
import type { WorkloadIssue } from "../../pages/WorkloadPage";

interface WorkloadIssueChipProps {
    issue: WorkloadIssue;
}

const ChipContainer = styled.div<{ $priority: WorkloadIssue["priority"] }>`
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
    padding: 0.375rem 0.5rem;
    background-color: var(--section-background);
    border-radius: 6px;
    border-left: 3px solid ${({ $priority }) => {
        switch ($priority) {
            case "urgent":
                return "var(--error-red)";
            case "high":
                return "var(--warning-orange)";
            case "medium":
                return "var(--plum)";
            default:
                return "var(--text-secondary)";
        }
    }};
    cursor: pointer;
    transition: background-color 0.15s ease;

    &:hover {
        background-color: var(--light-plum);
    }
`;

const IssueTitle = styled.span`
    font-family: "Inter", sans-serif;
    font-size: 0.75rem;
    color: var(--text-primary);
    max-width: 150px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

const PointsBadge = styled.span`
    display: inline-flex;
    align-items: center;
    gap: 0.125rem;
    padding: 0.125rem 0.25rem;
    background-color: var(--white);
    border-radius: 3px;
    font-family: "Inter", sans-serif;
    font-size: 0.625rem;
    font-weight: 600;
    color: var(--plum);
`;

function WorkloadIssueChip({ issue }: WorkloadIssueChipProps) {
    return (
        <ChipContainer $priority={issue.priority}>
            <IssueTitle>{issue.title}</IssueTitle>
            <PointsBadge>
                <Icon name="Lightning" size={10} color="var(--plum)" weight="fill" />
                {issue.storyPoints}
            </PointsBadge>
        </ChipContainer>
    );
}

export default WorkloadIssueChip;
