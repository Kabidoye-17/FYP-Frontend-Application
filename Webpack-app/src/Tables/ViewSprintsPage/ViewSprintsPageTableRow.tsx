import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import * as Table from "../../design_system/Table";
import ProgressBar from "../../design_system/ProgressBar";
import Icon from "../../design_system/Icon";
import type { Sprint } from "./ViewSprintsPageTable";

interface ViewSprintsPageTableRowProps {
    sprint: Sprint;
}

const ClickableRow = styled(Table.Row)`
    cursor: pointer;
`;

const Cell = styled(Table.Cell)`
    font-family: "Inter", sans-serif;
    font-size: 0.875rem;
    color: var(--text-primary);
    padding: 0.75rem 1rem;
`;

const SprintName = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 500;
`;

const StatusBadge = styled.span<{ $status: Sprint["status"] }>`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: ${({ $status }) => {
        switch ($status) {
            case "active":
                return "var(--success-green)";
            case "completed":
                return "var(--plum)";
            default:
                return "var(--text-secondary)";
        }
    }};
`;

const ProgressCell = styled.div`
    width: 100px;
`;

const IssueCount = styled.div`
    display: flex;
    align-items: center;
    gap: 0.25rem;
    color: var(--text-secondary);
`;

function ViewSprintsPageTableRow({ sprint }: Readonly<ViewSprintsPageTableRowProps>) {
    const navigate = useNavigate();

    const handleRowClick = () => {
        navigate(`/home/sprints/${sprint.id}`);
    };

    const progressPercentage =
        sprint.issueCount > 0
            ? (sprint.completedIssues / sprint.issueCount) * 100
            : 0;

    return (
        <ClickableRow onClick={handleRowClick}>
            <Cell>
                <SprintName>
                    <StatusBadge $status={sprint.status} />
                    {sprint.name}
                </SprintName>
            </Cell>
            <Cell>{sprint.teamName}</Cell>
            <Cell>{sprint.startDate}</Cell>
            <Cell>{sprint.endDate}</Cell>
            <Cell>
                <ProgressCell>
                    <ProgressBar
                        value={progressPercentage}
                        size="small"
                        color={sprint.status === "completed" ? "var(--plum)" : "var(--success-green)"}
                    />
                </ProgressCell>
            </Cell>
            <Cell>
                <IssueCount>
                    <Icon name="ListChecks" size={14} color="var(--text-secondary)" weight="regular" />
                    {sprint.completedIssues}/{sprint.issueCount}
                </IssueCount>
            </Cell>
        </ClickableRow>
    );
}

export default ViewSprintsPageTableRow;
