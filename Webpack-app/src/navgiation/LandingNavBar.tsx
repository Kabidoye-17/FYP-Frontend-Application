import { useNavigate } from 'react-router-dom';
import Icon from '../design_system/Icon';
import Button from '../design_system/Button';
import { BrandName, LeftContainer, RightContainer, NavBarContainer } from './PlainNavBar';

function LandingNavBar() {
  const navigate = useNavigate();

  return (
    <NavBarContainer>
      <LeftContainer>
        <Icon name="HourglassHigh" size={28} color="var(--plum)" weight='regular'/>
        <BrandName>Planora</BrandName>
      </LeftContainer>
      <RightContainer>
        <Button 
          backgroundColor='var(--white)' 
          color='var(--plum)'
          onClick={() => navigate('/login')}
          > 
            Login 
          </Button>
        <Button
          backgroundColor='var(--plum)'
          color='var(--white)'
          onClick={() => navigate('/signup')}
        >
          Sign Up
        </Button>
      </RightContainer>
    </NavBarContainer>
  );
}

export default LandingNavBar;