import styled from "styled-components";
import ViewIssuesPageHeader from "../navigation/Headers/ViewPageHeader";
import ViewIssuesPageTable from "../Tables/ViewIssuesPage/ViewIssuesPageTable";

export const PageContainer = styled.div`
    height: 100vh;
    width: 100%;
    background-color: var(--page-background);
    display: flex;
    flex-direction: column;
    box-shadow:
      0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -2px rgba(0, 0, 0, 0.1);
`;

export const TableScrollContainer = styled.div`
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
`;

function ViewIssuesPage() {
  return (
    <PageContainer>
      <ViewIssuesPageHeader>Issues</ViewIssuesPageHeader>
      <TableScrollContainer>
        <ViewIssuesPageTable />
      </TableScrollContainer>
    </PageContainer>
  );
}
export default ViewIssuesPage;