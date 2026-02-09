import styled from "styled-components";
import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import SideNavBar from "../navigation/SideNavBar";
import ViewPageHeader from "../navigation/Headers/ViewPageHeader";
import { PageContainer as PageContentWrapper, TableScrollContainer } from "./ViewIssuesPage";
import Button from "../design_system/Button";
import Icon from "../design_system/Icon";
import CreateIssueModal from "../modals/issue/CreateIssueModal";
import CreateProjectModal from "../modals/project/CreateProjectModal";

const PageContainer = styled.div`
    display: flex;
    flex-direction: row;    
    height: 100%;
`;

const ContentContainer = styled.div`
    width: 100%;
    height: 100vh;
    background-color: var(--page-background);
    color: white;
`;



function HomePage() {
  const location = useLocation();
  const currentPageTitle = location.pathname.includes('issues') ? 'Issues' : 'Projects';
  const isIssuesPage = location.pathname.includes('issues');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  return (
    <PageContainer>
      <SideNavBar />
      <ContentContainer>
        <PageContentWrapper>
          <ViewPageHeader
            button={
              <Button
                backgroundColor='white'
                color='var(--plum)'
                rightIcon={<Icon name="Plus" size={20} color="var(--plum)" weight='bold' />}
                onClick={() => setIsCreateModalOpen(true)}
              >
                {isIssuesPage ? 'Create Issue' : 'Create Project'}
              </Button>
            }
          >
            {currentPageTitle}
          </ViewPageHeader>
          <TableScrollContainer>
            <Outlet />
          </TableScrollContainer>
        </PageContentWrapper>
        {isIssuesPage ? (
          <CreateIssueModal
            open={isCreateModalOpen}
            onOpenChange={setIsCreateModalOpen}
          />
        ) : (
          <CreateProjectModal
            open={isCreateModalOpen}
            onOpenChange={setIsCreateModalOpen}
          />
        )}
      </ContentContainer>
    </PageContainer>
  );
}
export default HomePage;