import styled from "styled-components";
import SideNavBar from "../navigation/SideNavBar";

const PageContainer = styled.div`
    display: flex;
    flex-direction: row;    
    height: 100%;
`;

const ContentContainer = styled.div`
    padding: 2rem;
    background-color: var(--page-background);
`;



function HomePage() {
  return (
    <PageContainer>
        <SideNavBar />
      <ContentContainer>
        <h1>Welcome to the Home Page</h1>
      </ContentContainer>
    </PageContainer>

  );
}
export default HomePage;