import styled from "styled-components";
import IssueDetailPageHeader from "./IssueDetailPageHeader";
import IssueDetailBody from "./body/IssueDetailBody";
import IssueDetailSidebar from "./sidebar/IssueDetailSidebar";
import type { Issue, StatusLevel, PriorityLevel } from "./types/issueDetailTypes";

interface IssueDetailPageLayoutProps {
  issue: Issue;
  onTitleChange: (title: string) => void;
  onDescriptionChange: (description: string) => void;
  onStatusChange: (status: StatusLevel) => void;
  onPriorityChange: (priority: PriorityLevel) => void;
  onAssigneesChange: (assignees: string[]) => void;
  onProjectChange: (projectId: string | null) => void;
  onLabelsChange: (labels: string[]) => void;
  onTargetDateChange: (date: Date | null) => void;
  onAddComment: (text: string) => void;
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

function IssueDetailPageLayout({
  issue,
  onTitleChange,
  onDescriptionChange,
  onStatusChange,
  onPriorityChange,
  onAssigneesChange,
  onProjectChange,
  onLabelsChange,
  onTargetDateChange,
  onAddComment,
}: IssueDetailPageLayoutProps) {
  return (
    <LayoutContainer>
      <IssueDetailPageHeader issueId={issue.id} />
      <MainContent>
        <IssueDetailBody
          title={issue.title}
          description={issue.description}
          comments={issue.comments}
          onTitleChange={onTitleChange}
          onDescriptionChange={onDescriptionChange}
          onAddComment={onAddComment}
        />
        <IssueDetailSidebar
          status={issue.status}
          priority={issue.priority}
          assignees={issue.assignees}
          projectId={issue.projectId}
          labels={issue.labels}
          targetDate={issue.targetDate}
          createdAt={issue.createdAt}
          onStatusChange={onStatusChange}
          onPriorityChange={onPriorityChange}
          onAssigneesChange={onAssigneesChange}
          onProjectChange={onProjectChange}
          onLabelsChange={onLabelsChange}
          onTargetDateChange={onTargetDateChange}
        />
      </MainContent>
    </LayoutContainer>
  );
}

export default IssueDetailPageLayout;
