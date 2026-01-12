import styled from "styled-components";
import { Outlet, useLocation } from "react-router-dom";
import SideNavBar from "../navigation/SideNavBar";
import ViewPageHeader from "../navigation/Headers/ViewPageHeader";
import { PageContainer as PageContentWrapper, TableScrollContainer } from "./ViewIssuesPage";

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

  return (
    <PageContainer>
      <SideNavBar />
      <ContentContainer>
        <PageContentWrapper>
          <ViewPageHeader>{currentPageTitle}</ViewPageHeader>
          <TableScrollContainer>
            <Outlet />
          </TableScrollContainer>
        </PageContentWrapper>
      </ContentContainer>
    </PageContainer>
  );
}
export default HomePage;