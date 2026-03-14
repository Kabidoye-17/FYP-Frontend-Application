import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import SideNavBar from "../../navigation/SideNavBar";
import IssueDetailPageLayout from "./IssueDetailPageLayout";
import EmptyState from "../../design_system/EmptyState";
import Button from "../../design_system/Button";
import type { StatusLevel, PriorityLevel } from "./types/issueDetailTypes";
import type { IssueStatus, IssuePriority } from "../../types/api.types";
import { useIssue, useUpdateIssue, useAddComment } from "../../hooks/queries";

const PageContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
`;

const ContentContainer = styled.div`
  width: 100%;
  height: 100vh;
  background-color: var(--page-background);
`;

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-color: var(--page-background);
`;

const ErrorContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 2rem;
  background-color: var(--page-background);
`;

function IssueDetailPage() {
  const { issueId } = useParams<{ issueId: string }>();
  const navigate = useNavigate();

  const { data: issue, isLoading, isError, error } = useIssue(issueId || '');
  const updateIssue = useUpdateIssue();
  const addComment = useAddComment();

  // Transform API issue to component format
  const transformedIssue = issue ? {
    id: issue.id,
    title: issue.title,
    description: issue.description || '',
    status: issue.status as StatusLevel,
    priority: issue.priority as PriorityLevel,
    assignees: issue.assignees?.map(a => a.id) || [],
    projectId: issue.projectId,
    labels: issue.labels?.map(l => l.id) || [],
    targetDate: issue.targetDate ? new Date(issue.targetDate) : null,
    comments: issue.comments?.map(c => ({
      id: c.id,
      authorId: c.authorId,
      authorName: c.authorName,
      authorColor: c.authorColor,
      text: c.text,
      createdAt: new Date(c.createdAt),
    })) || [],
    createdAt: new Date(issue.createdAt),
    updatedAt: new Date(issue.updatedAt),
  } : null;

  const handleTitleChange = (title: string) => {
    if (issueId) {
      updateIssue.mutate({ id: issueId, data: { title } });
    }
  };

  const handleDescriptionChange = (description: string) => {
    if (issueId) {
      updateIssue.mutate({ id: issueId, data: { description } });
    }
  };

  const handleStatusChange = (status: StatusLevel) => {
    if (issueId) {
      updateIssue.mutate({ id: issueId, data: { status: status as IssueStatus } });
    }
  };

  const handlePriorityChange = (priority: PriorityLevel) => {
    if (issueId) {
      updateIssue.mutate({ id: issueId, data: { priority: priority as IssuePriority } });
    }
  };

  const handleAssigneesChange = (assignees: string[]) => {
    if (issueId) {
      updateIssue.mutate({ id: issueId, data: { assigneeIds: assignees } });
    }
  };

  const handleProjectChange = (projectId: string | null) => {
    if (issueId) {
      updateIssue.mutate({ id: issueId, data: { projectId } });
    }
  };

  const handleLabelsChange = (labels: string[]) => {
    if (issueId) {
      updateIssue.mutate({ id: issueId, data: { labelIds: labels } });
    }
  };

  const handleTargetDateChange = (targetDate: Date | null) => {
    if (issueId) {
      updateIssue.mutate({
        id: issueId,
        data: { targetDate: targetDate?.toISOString() || null }
      });
    }
  };

  const handleAddComment = (text: string) => {
    if (issueId) {
      addComment.mutate({ issueId, content: text });
    }
  };

  if (isLoading) {
    return (
      <PageContainer>
        <SideNavBar />
        <ContentContainer>
          <LoadingContainer>
            Loading issue...
          </LoadingContainer>
        </ContentContainer>
      </PageContainer>
    );
  }

  if (isError || !transformedIssue) {
    return (
      <PageContainer>
        <SideNavBar />
        <ContentContainer>
          <ErrorContainer>
            <EmptyState
              icon="Warning"
              title="Issue not found"
              description={error?.message || "The issue you're looking for doesn't exist or you don't have access to it."}
              action={<Button onClick={() => navigate('/home/issues')}>Back to Issues</Button>}
            />
          </ErrorContainer>
        </ContentContainer>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <SideNavBar />
      <ContentContainer>
        <IssueDetailPageLayout
          issue={transformedIssue}
          onTitleChange={handleTitleChange}
          onDescriptionChange={handleDescriptionChange}
          onStatusChange={handleStatusChange}
          onPriorityChange={handlePriorityChange}
          onAssigneesChange={handleAssigneesChange}
          onProjectChange={handleProjectChange}
          onLabelsChange={handleLabelsChange}
          onTargetDateChange={handleTargetDateChange}
          onAddComment={handleAddComment}
        />
      </ContentContainer>
    </PageContainer>
  );
}

export default IssueDetailPage;
