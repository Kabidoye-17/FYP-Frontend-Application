import styled from 'styled-components';
import Icon from '../design_system/Icon';
import Button from '../design_system/Button';
import { useNavigate } from 'react-router-dom';

export const NavBarContainer = styled.nav`
    width: 100%;
    min-height: 4rem;
    background-color: var(--white);
    display: flex;
    flex-direction: row;
    align-items: center;
    border-bottom: 1px solid var(--light-plum);
    position: fixed; /* Changed from sticky to fixed */
    top: 0;
    z-index: 100;
    margin-bottom: 2rem;
    padding: 0.75rem 0;
`;

export const LeftContainer = styled.div`
  width: 20em;
  height: 97%;
  background-color: var(--white);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

`;

export const RightContainer = styled.div`
    width: 100%;
    height: 97%;
    background-color: var(--white);
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 1rem;
    padding-right: 4rem;
`;

export const BrandName = styled.h1`
  font-family: "Roboto Mono", monospace;
  font-weight: 300;
  font-size: 1.5rem;
  color: var(--plum);
`;

function PlainNavBar() {
const navigate = useNavigate();
  return (
    <NavBarContainer>
      <LeftContainer>
        <Button 
            backgroundColor='transparent' 
            icon={<Icon name="HourglassHigh" size={28} color="var(--plum)" weight='regular'/>}
            onClick={() => navigate('/')}
            >
        <BrandName>Planora</BrandName>
        </Button>
      </LeftContainer>
      <RightContainer/>
    </NavBarContainer>
  );
}

export default PlainNavBar;