import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Icon from "../../../design_system/Icon";
import { getStatusIcon, getPriorityIcon } from "../../../utils/issueIconMaps";
import type { AssociatedIssue } from "../types/projectDetailTypes";

interface AssociatedIssueItemProps {
  issue: AssociatedIssue;
}

const ItemContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  height: 48px;
  box-sizing: border-box;
  cursor: pointer;
  border-radius: 6px;
  transition: background-color 0.15s ease;

  &:hover {
    background-color: var(--section-background);
  }
`;

const StatusIconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const IssueTitle = styled.span`
  flex: 1;
  font-family: "Inter", sans-serif;
  font-size: 0.875rem;
  color: var(--text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const PriorityIconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

function AssociatedIssueItem({ issue }: AssociatedIssueItemProps) {
  const navigate = useNavigate();
  const statusIcon = getStatusIcon(issue.status);
  const priorityIcon = getPriorityIcon(issue.priority);

  const handleClick = () => {
    navigate(`/home/issues/${issue.id}`);
  };

  return (
    <ItemContainer onClick={handleClick}>
      <StatusIconContainer>
        {statusIcon && (
          <Icon
            name={statusIcon.iconName as any}
            color={statusIcon.color}
            size={16}
            weight={statusIcon.weight}
          />
        )}
      </StatusIconContainer>
      <IssueTitle>{issue.title}</IssueTitle>
      <PriorityIconContainer>
        {priorityIcon && (
          <Icon
            name={priorityIcon.iconName as any}
            color={priorityIcon.color}
            size={16}
            weight={priorityIcon.weight}
          />
        )}
      </PriorityIconContainer>
    </ItemContainer>
  );
}

export default AssociatedIssueItem;
