import styled from "styled-components";
import SideNavBar from "../navigation/SideNavBar";
import PlainNavBar from "../navigation/PlainNavBar";
import ViewIssuesPage from "./ViewIssuesPage";

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
  return (
    <PageContainer>
        <SideNavBar />
      <ContentContainer>
        <ViewIssuesPage />
      </ContentContainer>
    </PageContainer>

  );
}
export default HomePage;