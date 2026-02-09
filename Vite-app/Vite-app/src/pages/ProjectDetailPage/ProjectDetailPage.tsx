import { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import SideNavBar from "../../navigation/SideNavBar";
import ProjectDetailPageLayout from "./ProjectDetailPageLayout";
import type { Project, Comment, StatusLevel, PriorityLevel } from "./types/projectDetailTypes";
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

// Mock project data for development
const createMockProject = (id: string): Project => ({
  id,
  title: "Website Redesign Project",
  description:
    "Complete overhaul of the company website with a focus on modern design principles and improved user experience.\n\nKey objectives:\n- Modernize the visual design\n- Improve page load performance\n- Implement responsive design for mobile devices\n- Enhance accessibility compliance",
  status: "in progress",
  priority: "high",
  leadId: "1",
  memberIds: ["1", "2", "3"],
  labels: ["label-1", "label-2"],
  targetDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
  associatedIssues: [
    {
      id: "1",
      title: "Implement user authentication flow",
      status: "in progress",
      priority: "high",
    },
    {
      id: "2",
      title: "Design new landing page mockups",
      status: "completed",
      priority: "medium",
    },
    {
      id: "3",
      title: "Set up CI/CD pipeline",
      status: "backlog",
      priority: "low",
    },
    {
      id: "4",
      title: "Create database schema",
      status: "in progress",
      priority: "high",
    },
  ],
  comments: [
    {
      id: "comment-1",
      authorId: "1",
      authorName: mockAssignees[0].name,
      authorColor: mockAssignees[0].color,
      text: "I've completed the initial design review. The new mockups look great!",
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    },
    {
      id: "comment-2",
      authorId: "2",
      authorName: mockAssignees[1].name,
      authorColor: mockAssignees[1].color,
      text: "Thanks! I'll start implementing the frontend components this week.",
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    },
  ],
  createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), // 14 days ago
  updatedAt: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
});

function ProjectDetailPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const [project, setProject] = useState<Project>(() => createMockProject(projectId || "1"));

  const handleTitleChange = (title: string) => {
    setProject((prev) => ({ ...prev, title, updatedAt: new Date() }));
  };

  const handleDescriptionChange = (description: string) => {
    setProject((prev) => ({ ...prev, description, updatedAt: new Date() }));
  };

  const handleStatusChange = (status: StatusLevel) => {
    setProject((prev) => ({ ...prev, status, updatedAt: new Date() }));
  };

  const handlePriorityChange = (priority: PriorityLevel) => {
    setProject((prev) => ({ ...prev, priority, updatedAt: new Date() }));
  };

  const handleLeadChange = (leadId: string | null) => {
    setProject((prev) => ({ ...prev, leadId, updatedAt: new Date() }));
  };

  const handleMembersChange = (memberIds: string[]) => {
    setProject((prev) => ({ ...prev, memberIds, updatedAt: new Date() }));
  };

  const handleLabelsChange = (labels: string[]) => {
    setProject((prev) => ({ ...prev, labels, updatedAt: new Date() }));
  };

  const handleTargetDateChange = (targetDate: Date | null) => {
    setProject((prev) => ({ ...prev, targetDate, updatedAt: new Date() }));
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
    setProject((prev) => ({
      ...prev,
      comments: [...prev.comments, newComment],
      updatedAt: new Date(),
    }));
  };

  return (
    <PageContainer>
      <SideNavBar />
      <ContentContainer>
        <ProjectDetailPageLayout
          project={project}
          onTitleChange={handleTitleChange}
          onDescriptionChange={handleDescriptionChange}
          onStatusChange={handleStatusChange}
          onPriorityChange={handlePriorityChange}
          onLeadChange={handleLeadChange}
          onMembersChange={handleMembersChange}
          onLabelsChange={handleLabelsChange}
          onTargetDateChange={handleTargetDateChange}
          onAddComment={handleAddComment}
        />
      </ContentContainer>
    </PageContainer>
  );
}

export default ProjectDetailPage;
