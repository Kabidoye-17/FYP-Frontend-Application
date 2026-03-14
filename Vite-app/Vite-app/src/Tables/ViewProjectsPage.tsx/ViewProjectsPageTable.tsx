import styled from "styled-components";
import { TableContainer } from "../ViewIssuesPage/ViewIssuesPageTable";
import ViewProjectsPageTableSection from "./ViewProjectsPageTableSection";
import ViewProjectsPageTableSkeleton from "./ViewProjectsPageTableSkeleton";
import EmptyState from "../../design_system/EmptyState";
import Button from "../../design_system/Button";
import { useProjects } from "../../hooks/queries";
import { groupProjectsByStatus } from "../../utils/dataHelpers";

const ErrorContainer = styled.div`
  padding: 2rem;
  display: flex;
  justify-content: center;
`;

function ViewProjectsPageTable() {
  const { data: projects, isLoading, isError, error, refetch } = useProjects();

  if (isLoading) {
    return <ViewProjectsPageTableSkeleton />;
  }

  if (isError) {
    return (
      <ErrorContainer>
        <EmptyState
          icon="Warning"
          title="Failed to load projects"
          description={error?.message || "An error occurred while loading projects"}
          action={<Button onClick={() => refetch()}>Retry</Button>}
        />
      </ErrorContainer>
    );
  }

  if (!projects || projects.length === 0) {
    return (
      <ErrorContainer>
        <EmptyState
          icon="FolderSimple"
          title="No projects yet"
          description="Create your first project to organize your work"
        />
      </ErrorContainer>
    );
  }

  const sections = groupProjectsByStatus(projects);

  return (
    <TableContainer>
      {sections.map((section) => (
        <ViewProjectsPageTableSection
          key={section.title}
          title={section.title}
          projects={section.projects}
        />
      ))}
    </TableContainer>
  );
}

export default ViewProjectsPageTable;
