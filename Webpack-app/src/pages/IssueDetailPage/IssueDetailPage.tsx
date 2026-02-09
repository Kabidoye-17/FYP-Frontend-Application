import { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import SideNavBar from "../../navigation/SideNavBar";
import IssueDetailPageLayout from "./IssueDetailPageLayout";
import type { Issue, Comment, StatusLevel, PriorityLevel } from "./types/issueDetailTypes";
import { mockAssignees } from "../../utils/assigneeData";

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

// Mock issue data for development
const createMockIssue = (id: string): Issue => ({
  id,
  title: "Implement user authentication flow",
  description:
    "We need to implement a complete user authentication flow including login, registration, and password reset functionality.\n\nThis should include:\n- Email/password login\n- OAuth integration (Google, GitHub)\n- Password reset via email\n- Remember me functionality",
  status: "in progress",
  priority: "high",
  assignees: ["1", "2"],
  projectId: "1",
  labels: ["label-1", "label-2"],
  targetDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week from now
  comments: [
    {
      id: "comment-1",
      authorId: "1",
      authorName: mockAssignees[0].name,
      authorColor: mockAssignees[0].color,
      text: "I've started working on the OAuth integration. Should have a PR ready by tomorrow.",
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    },
    {
      id: "comment-2",
      authorId: "2",
      authorName: mockAssignees[1].name,
      authorColor: mockAssignees[1].color,
      text: "Great! Let me know if you need any help with the Google OAuth setup. I've done it before.",
      createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
    },
  ],
  createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
  updatedAt: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
});

function IssueDetailPage() {
  const { issueId } = useParams<{ issueId: string }>();
  const [issue, setIssue] = useState<Issue>(() => createMockIssue(issueId || "1"));

  const handleTitleChange = (title: string) => {
    setIssue((prev) => ({ ...prev, title, updatedAt: new Date() }));
  };

  const handleDescriptionChange = (description: string) => {
    setIssue((prev) => ({ ...prev, description, updatedAt: new Date() }));
  };

  const handleStatusChange = (status: StatusLevel) => {
    setIssue((prev) => ({ ...prev, status, updatedAt: new Date() }));
  };

  const handlePriorityChange = (priority: PriorityLevel) => {
    setIssue((prev) => ({ ...prev, priority, updatedAt: new Date() }));
  };

  const handleAssigneesChange = (assignees: string[]) => {
    setIssue((prev) => ({ ...prev, assignees, updatedAt: new Date() }));
  };

  const handleProjectChange = (projectId: string | null) => {
    setIssue((prev) => ({ ...prev, projectId, updatedAt: new Date() }));
  };

  const handleLabelsChange = (labels: string[]) => {
    setIssue((prev) => ({ ...prev, labels, updatedAt: new Date() }));
  };

  const handleTargetDateChange = (targetDate: Date | null) => {
    setIssue((prev) => ({ ...prev, targetDate, updatedAt: new Date() }));
  };

  const handleAddComment = (text: string) => {
    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      authorId: "1", // Current user ID would come from auth context
      authorName: mockAssignees[0].name,
      authorColor: mockAssignees[0].color,
      text,
      createdAt: new Date(),
    };
    setIssue((prev) => ({
      ...prev,
      comments: [...prev.comments, newComment],
      updatedAt: new Date(),
    }));
  };

  return (
    <PageContainer>
      <SideNavBar />
      <ContentContainer>
        <IssueDetailPageLayout
          issue={issue}
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
