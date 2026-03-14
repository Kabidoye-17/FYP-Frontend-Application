import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import SideNavBar from "../../navigation/SideNavBar";
import ProjectDetailPageLayout from "./ProjectDetailPageLayout";
import EmptyState from "../../design_system/EmptyState";
import Button from "../../design_system/Button";
import type { StatusLevel, PriorityLevel, Comment } from "./types/projectDetailTypes";
import type { ProjectStatus, ProjectPriority } from "../../types/api.types";
import { useProject, useUpdateProject } from "../../hooks/queries";

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

function ProjectDetailPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();

  const { data: project, isLoading, isError, error } = useProject(projectId || '');
  const updateProject = useUpdateProject();

  // Transform API project to component format
  const transformedProject = project ? {
    id: project.id,
    title: project.title || project.name,
    description: project.description || '',
    status: project.status as StatusLevel,
    priority: project.priority as PriorityLevel,
    leadId: project.leadId,
    memberIds: project.memberIds || [],
    labels: project.labels?.map(l => l.id) || [],
    targetDate: project.targetDate ? new Date(project.targetDate) : null,
    associatedIssues: project.associatedIssues?.map(i => ({
      id: i.id,
      title: i.title,
      status: i.status as StatusLevel,
      priority: i.priority as PriorityLevel,
    })) || [],
    comments: [] as Comment[], // Projects don't have comments in the API
    createdAt: new Date(project.createdAt),
    updatedAt: new Date(project.updatedAt),
  } : null;

  const handleTitleChange = (title: string) => {
    if (projectId) {
      updateProject.mutate({ id: projectId, data: { title } });
    }
  };

  const handleDescriptionChange = (description: string) => {
    if (projectId) {
      updateProject.mutate({ id: projectId, data: { description } });
    }
  };

  const handleStatusChange = (status: StatusLevel) => {
    if (projectId) {
      updateProject.mutate({ id: projectId, data: { status: status as ProjectStatus } });
    }
  };

  const handlePriorityChange = (priority: PriorityLevel) => {
    if (projectId) {
      updateProject.mutate({ id: projectId, data: { priority: priority as ProjectPriority } });
    }
  };

  const handleLeadChange = (leadId: string | null) => {
    if (projectId) {
      updateProject.mutate({ id: projectId, data: { leadId } });
    }
  };

  const handleMembersChange = (memberIds: string[]) => {
    if (projectId) {
      updateProject.mutate({ id: projectId, data: { memberIds } });
    }
  };

  const handleLabelsChange = (labels: string[]) => {
    if (projectId) {
      updateProject.mutate({ id: projectId, data: { labelIds: labels } });
    }
  };

  const handleTargetDateChange = (targetDate: Date | null) => {
    if (projectId) {
      updateProject.mutate({
        id: projectId,
        data: { targetDate: targetDate?.toISOString() || null }
      });
    }
  };

  const handleAddComment = (text: string) => {
    // Projects don't have comments in the API - could be added later
    console.log('Add comment:', text);
  };

  if (isLoading) {
    return (
      <PageContainer>
        <SideNavBar />
        <ContentContainer>
          <LoadingContainer>
            Loading project...
          </LoadingContainer>
        </ContentContainer>
      </PageContainer>
    );
  }

  if (isError || !transformedProject) {
    return (
      <PageContainer>
        <SideNavBar />
        <ContentContainer>
          <ErrorContainer>
            <EmptyState
              icon="Warning"
              title="Project not found"
              description={error?.message || "The project you're looking for doesn't exist or you don't have access to it."}
              action={<Button onClick={() => navigate('/home/projects')}>Back to Projects</Button>}
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
        <ProjectDetailPageLayout
          project={transformedProject}
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
