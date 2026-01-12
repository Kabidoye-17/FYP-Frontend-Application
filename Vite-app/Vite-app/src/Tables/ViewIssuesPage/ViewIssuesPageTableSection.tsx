import styled from "styled-components";
import * as Table from "../../design_system/Table";
import ViewIssuesPageTableHeader from "../ViewIssuesPage/ViewIssuesPageTableHeader";
import ViewIssuesPageTableRow from "../ViewIssuesPage/ViewIssuesPageTableRow";
import type { Issue } from "../types/contentTypes";

interface ViewIssuesPageTableSectionProps {
  title: string;
  issues: Issue[];
}

export const SectionContainer = styled.div`
  margin-bottom: 1.5rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const SectionTitle = styled.h2`
  font-family: "Inter", sans-serif;
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--plum);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.5rem;
`;

function ViewIssuesPageTableSection({
  title,
  issues,
}: Readonly<ViewIssuesPageTableSectionProps>) {
  return (
    <SectionContainer>
      <SectionTitle>{title}</SectionTitle>
      <Table.Table>
        <ViewIssuesPageTableHeader />
        <Table.Body>
          {issues.map((issue) => (
            <ViewIssuesPageTableRow key={issue.id} issue={issue} />
          ))}
        </Table.Body>
      </Table.Table>
    </SectionContainer>
  );
}

export default ViewIssuesPageTableSection;
