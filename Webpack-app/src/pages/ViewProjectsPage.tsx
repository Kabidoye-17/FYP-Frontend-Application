import ViewPageHeader from "../navigation/Headers/ViewPageHeader";
import ViewProjectsPageTable from "../Tables/ViewProjectsPage.tsx/ViewProjectsPageTable";
import { PageContainer, TableScrollContainer } from "./ViewIssuesPage";


function ViewProjectsPage() {
    return   (<PageContainer>
      <ViewPageHeader>Projects</ViewPageHeader>
      <TableScrollContainer>
        <ViewProjectsPageTable/>
      </TableScrollContainer>
    </PageContainer>
    );
}

export default ViewProjectsPage;