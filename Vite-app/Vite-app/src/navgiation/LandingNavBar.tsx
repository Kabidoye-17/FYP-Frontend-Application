import styled from 'styled-components';
import Icon from '../design_system/Icon';
import Button from '../design_system/Button';

const NavBarContainer = styled.nav`
  width: 100%;
  min-height: 4rem;
  background-color: #ffffff;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-bottom: 1px solid #d47ec3ff;
  position: sticky;
  top: 0;
  z-index: 100;
  margin-bottom: 2rem;
  padding: 0.75rem 0;
`;

const LeftContainer = styled.div`
  width: 20em;
  height: 97%;
  background-color: #FFFEFC;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

`;

const RightContainer = styled.div`
    width: 100%;
    height: 97%;
    background-color: #FFFEFC;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 1rem;
    padding-right: 4rem;
`;

const BrandName = styled.h1`
  font-family: "Roboto Mono", monospace;
  font-weight: 300;
  font-size: 1.5rem;
  color: #B24F9F;
`;

function LandingNavBar() {
  return (
    <NavBarContainer>
      <LeftContainer>
        <Icon name="HourglassHigh" size={28} color="#B24F9F" weight='regular'/>
        <BrandName>Planora</BrandName>
      </LeftContainer>
      <RightContainer>
        <Button backgroundColor='#ffffff' color='#B24F9F'> Login </Button>
        <Button backgroundColor='#B24F9F' color='#ffffff'> Sign Up </Button>
      </RightContainer>
    </NavBarContainer>
  );
}

export default LandingNavBar;