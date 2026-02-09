import styled from "styled-components";
import ProjectDetailPageHeader from "./ProjectDetailPageHeader";
import ProjectDetailBody from "./ProjectDetailBody";
import ProjectDetailSidebar from "./sidebar/ProjectDetailSidebar";
import type { Project, StatusLevel, PriorityLevel } from "./types/projectDetailTypes";

interface ProjectDetailPageLayoutProps {
  project: Project;
  onTitleChange: (title: string) => void;
  onDescriptionChange: (description: string) => void;
  onStatusChange: (status: StatusLevel) => void;
  onPriorityChange: (priority: PriorityLevel) => void;
  onLeadChange: (leadId: string | null) => void;
  onMembersChange: (memberIds: string[]) => void;
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

function ProjectDetailPageLayout({
  project,
  onTitleChange,
  onDescriptionChange,
  onStatusChange,
  onPriorityChange,
  onLeadChange,
  onMembersChange,
  onLabelsChange,
  onTargetDateChange,
  onAddComment,
}: ProjectDetailPageLayoutProps) {
  return (
    <LayoutContainer>
      <ProjectDetailPageHeader projectId={project.id} />
      <MainContent>
        <ProjectDetailBody
          title={project.title}
          description={project.description}
          associatedIssues={project.associatedIssues}
          comments={project.comments}
          onTitleChange={onTitleChange}
          onDescriptionChange={onDescriptionChange}
          onAddComment={onAddComment}
        />
        <ProjectDetailSidebar
          status={project.status}
          priority={project.priority}
          leadId={project.leadId}
          memberIds={project.memberIds}
          labels={project.labels}
          targetDate={project.targetDate}
          createdAt={project.createdAt}
          onStatusChange={onStatusChange}
          onPriorityChange={onPriorityChange}
          onLeadChange={onLeadChange}
          onMembersChange={onMembersChange}
          onLabelsChange={onLabelsChange}
          onTargetDateChange={onTargetDateChange}
        />
      </MainContent>
    </LayoutContainer>
  );
}

export default ProjectDetailPageLayout;
