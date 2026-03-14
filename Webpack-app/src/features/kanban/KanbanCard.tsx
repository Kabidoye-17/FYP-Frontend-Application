import styled from "styled-components";
import KanbanCardDetails from "./KanbanCardDetails";
import Avatar from "../../design_system/Avatar";
import Icon from "../../design_system/Icon";
import type { KanbanIssue } from "../../utils/dataHelpers";

interface KanbanCardProps {
    issue: KanbanIssue;
}

const CardContainer = styled.div`
    background-color: var(--white);
    border: 1px solid var(--section-background);
    border-radius: 8px;
    padding: 0.75rem;
    cursor: grab;
    transition: box-shadow 0.15s ease, transform 0.15s ease;

    &:hover {
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        transform: translateY(-1px);
    }

    &:active {
        cursor: grabbing;
    }
`;

const CardHeader = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
`;

const PriorityIndicator = styled.div<{ $priority: KanbanIssue["priority"] }>`
    width: 4px;
    height: 100%;
    min-height: 16px;
    border-radius: 2px;
    background-color: ${({ $priority }) => {
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
`;

const CardTitle = styled.h4`
    font-family: "Inter", sans-serif;
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--text-primary);
    margin: 0;
    flex: 1;
    line-height: 1.4;
`;

const CardFooter = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 0.75rem;
`;

const Labels = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 0.25rem;
`;

const Label = styled.span`
    padding: 0.125rem 0.375rem;
    background-color: var(--light-plum);
    border-radius: 4px;
    font-family: "Inter", sans-serif;
    font-size: 0.625rem;
    font-weight: 500;
    color: var(--plum);
    text-transform: uppercase;
`;

const AssigneeSection = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;

const DueDate = styled.span<{ $isOverdue: boolean }>`
    display: flex;
    align-items: center;
    gap: 0.25rem;
    font-family: "Inter", sans-serif;
    font-size: 0.75rem;
    color: ${({ $isOverdue }) => ($isOverdue ? "var(--error-red)" : "var(--text-secondary)")};
`;

function KanbanCard({ issue }: KanbanCardProps) {
    const handleDragStart = (e: React.DragEvent) => {
        e.dataTransfer.setData("issueId", issue.id);
    };

    const isOverdue = issue.dueDate ? new Date(issue.dueDate) < new Date() : false;

    return (
        <CardContainer draggable onDragStart={handleDragStart}>
            <CardHeader>
                <PriorityIndicator $priority={issue.priority} />
                <CardTitle>{issue.title}</CardTitle>
            </CardHeader>

            <KanbanCardDetails description={issue.description} />

            <CardFooter>
                <Labels>
                    {issue.labels.slice(0, 2).map((label) => (
                        <Label key={label}>{label}</Label>
                    ))}
                </Labels>
                <AssigneeSection>
                    {issue.dueDate && (
                        <DueDate $isOverdue={isOverdue}>
                            <Icon
                                name="Calendar"
                                size={12}
                                color={isOverdue ? "var(--error-red)" : "var(--text-secondary)"}
                                weight="regular"
                            />
                            {new Date(issue.dueDate).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                            })}
                        </DueDate>
                    )}
                    {issue.assignee && (
                        <Avatar
                            size="xsmall"
                            color={issue.assignee.color}
                            name={issue.assignee.name}
                        />
                    )}
                </AssigneeSection>
            </CardFooter>
        </CardContainer>
    );
}

export default KanbanCard;
