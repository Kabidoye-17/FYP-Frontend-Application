import styled from "styled-components";
import SidebarStatusField from "./SidebarStatusField";
import SidebarPriorityField from "./SidebarPriorityField";
import SidebarAssigneesField from "./SidebarAssigneesField";
import SidebarProjectField from "./SidebarProjectField";
import SidebarLabelsField from "./SidebarLabelsField";
import SidebarTargetDateField from "./SidebarTargetDateField";
import type { StatusLevel, PriorityLevel } from "../types/issueDetailTypes";

interface IssueDetailSidebarProps {
  status: StatusLevel;
  priority: PriorityLevel;
  assignees: string[];
  projectId: string | null;
  labels: string[];
  targetDate: Date | null;
  createdAt: Date;
  onStatusChange: (status: StatusLevel) => void;
  onPriorityChange: (priority: PriorityLevel) => void;
  onAssigneesChange: (assignees: string[]) => void;
  onProjectChange: (projectId: string | null) => void;
  onLabelsChange: (labels: string[]) => void;
  onTargetDateChange: (date: Date | null) => void;
}

const SidebarContainer = styled.aside`
  width: 280px;
  flex-shrink: 0;
  padding: 2rem 1.5rem;
  border-left: 1px solid var(--section-background);
  background-color: var(--white);
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  overflow-y: auto;
`;

const CreatedInfo = styled.div`
  margin-top: auto;
  padding-top: 1.5rem;
  border-top: 1px solid var(--section-background);
`;

const CreatedText = styled.p`
  margin: 0;
  font-family: "Inter", sans-serif;
  font-size: 0.75rem;
  color: var(--text-secondary);
`;

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function IssueDetailSidebar({
  status,
  priority,
  assignees,
  projectId,
  labels,
  targetDate,
  createdAt,
  onStatusChange,
  onPriorityChange,
  onAssigneesChange,
  onProjectChange,
  onLabelsChange,
  onTargetDateChange,
}: IssueDetailSidebarProps) {
  return (
    <SidebarContainer>
      <SidebarStatusField status={status} onStatusChange={onStatusChange} />
      <SidebarPriorityField priority={priority} onPriorityChange={onPriorityChange} />
      <SidebarAssigneesField assignees={assignees} onAssigneesChange={onAssigneesChange} />
      <SidebarProjectField projectId={projectId} onProjectChange={onProjectChange} />
      <SidebarLabelsField labels={labels} onLabelsChange={onLabelsChange} />
      <SidebarTargetDateField targetDate={targetDate} onTargetDateChange={onTargetDateChange} />
      <CreatedInfo>
        <CreatedText>Created on {formatDate(createdAt)}</CreatedText>
      </CreatedInfo>
    </SidebarContainer>
  );
}

export default IssueDetailSidebar;
