import styled from "styled-components";
import ViewIssuesPageTableSection from "../ViewIssuesPage/ViewIssuesPageTableSection";
import ViewIssuesPageTableSkeleton from "./ViewIssuesPageTableSkeleton";
import EmptyState from "../../design_system/EmptyState";
import Button from "../../design_system/Button";
import { useIssues } from "../../hooks/queries";
import { groupIssuesByStatus } from "../../utils/dataHelpers";

export const TableContainer = styled.div`
  width: 100%;
  padding: 1rem;
`;

const ErrorContainer = styled.div`
  padding: 2rem;
  display: flex;
  justify-content: center;
`;

function ViewIssuesPageTable() {
  const { data: issues, isLoading, isError, error, refetch } = useIssues();

  if (isLoading) {
    return <ViewIssuesPageTableSkeleton />;
  }

  if (isError) {
    return (
      <ErrorContainer>
        <EmptyState
          icon="Warning"
          title="Failed to load issues"
          description={error?.message || "An error occurred while loading issues"}
          action={<Button onClick={() => refetch()}>Retry</Button>}
        />
      </ErrorContainer>
    );
  }

  if (!issues || issues.length === 0) {
    return (
      <ErrorContainer>
        <EmptyState
          icon="Circle"
          title="No issues yet"
          description="Create your first issue to start tracking work"
        />
      </ErrorContainer>
    );
  }

  const sections = groupIssuesByStatus(issues);

  return (
    <TableContainer>
      {sections.map((section) => (
        <ViewIssuesPageTableSection
          key={section.title}
          title={section.title}
          issues={section.issues}
        />
      ))}
    </TableContainer>
  );
}

export default ViewIssuesPageTable;
