import styled from "styled-components";
import ViewIssuesPageHeader from "../navigation/Headers/ViewIssuesPageHeader";
import { Table } from "../design_system/Table";
import ViewIssuesPageTable from "../Tables/ViewIssuesPageTable";

const PageContainer = styled.div`
    height: 100vh;
    width: 100%;
    background-color: var(--page-background);
    display: flex;
    flex-direction: column;
`;

const TableScrollContainer = styled.div`
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
`;

function ViewIssuesPage() {
  return (
    <PageContainer>
      <ViewIssuesPageHeader />
      <TableScrollContainer>
        <ViewIssuesPageTable />
      </TableScrollContainer>
    </PageContainer>
  );
}
export default ViewIssuesPage;