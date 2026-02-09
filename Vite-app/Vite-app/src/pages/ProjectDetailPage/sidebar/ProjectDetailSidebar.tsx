import styled from "styled-components";
import SidebarStatusField from "../../IssueDetailPage/sidebar/SidebarStatusField";
import SidebarPriorityField from "../../IssueDetailPage/sidebar/SidebarPriorityField";
import SidebarLeadField from "./SidebarLeadField";
import SidebarMembersField from "./SidebarMembersField";
import SidebarLabelsField from "../../IssueDetailPage/sidebar/SidebarLabelsField";
import SidebarTargetDateField from "../../IssueDetailPage/sidebar/SidebarTargetDateField";
import type { StatusLevel, PriorityLevel } from "../types/projectDetailTypes";

interface ProjectDetailSidebarProps {
  status: StatusLevel;
  priority: PriorityLevel;
  leadId: string | null;
  memberIds: string[];
  labels: string[];
  targetDate: Date | null;
  createdAt: Date;
  onStatusChange: (status: StatusLevel) => void;
  onPriorityChange: (priority: PriorityLevel) => void;
  onLeadChange: (leadId: string | null) => void;
  onMembersChange: (memberIds: string[]) => void;
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

function ProjectDetailSidebar({
  status,
  priority,
  leadId,
  memberIds,
  labels,
  targetDate,
  createdAt,
  onStatusChange,
  onPriorityChange,
  onLeadChange,
  onMembersChange,
  onLabelsChange,
  onTargetDateChange,
}: ProjectDetailSidebarProps) {
  return (
    <SidebarContainer>
      <SidebarStatusField status={status} onStatusChange={onStatusChange} />
      <SidebarPriorityField priority={priority} onPriorityChange={onPriorityChange} />
      <SidebarLeadField leadId={leadId} onLeadChange={onLeadChange} />
      <SidebarMembersField memberIds={memberIds} onMembersChange={onMembersChange} />
      <SidebarLabelsField labels={labels} onLabelsChange={onLabelsChange} />
      <SidebarTargetDateField targetDate={targetDate} onTargetDateChange={onTargetDateChange} />
      <CreatedInfo>
        <CreatedText>Created on {formatDate(createdAt)}</CreatedText>
      </CreatedInfo>
    </SidebarContainer>
  );
}

export default ProjectDetailSidebar;
