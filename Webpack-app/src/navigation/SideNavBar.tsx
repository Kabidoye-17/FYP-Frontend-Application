import styled from "styled-components";

const SideNavBarContainer = styled.div`
    width: 250px;   
    height: 100%;
    background-color: var(--section-background);
    padding: 1rem;
    display: flex;
    flex-direction: column;
`;

function SideNavBar() {
  return (
    <SideNavBarContainer>
      <h2>Side Navigation</h2>
    </SideNavBarContainer>
  );
}   

export default SideNavBar;