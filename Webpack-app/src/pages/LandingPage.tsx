import styled from 'styled-components';
import LandingNavBar from '../navigation/LandingNavBar';
import Button from '../design_system/Button';
import Footer from '../footer/Footer';
import Carousel from '../features/carousel_feature/Carousel';
import Heading from '../design_system/Heading';
import { useNavigate } from 'react-router';


export const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
    background-color: var(--page-background);
`;

const BodyContainer = styled.div`
    width: 100%;
    flex: 1;
    background-color: var(--page-background);
`;

const HeroSection = styled.section`
    display: flex;
    flex-direction: row;
    align-items: start;
    padding-left: 4em;
    padding-top: 6rem;
    justify-content: center;
    height: 25rem;
`;

const HeroImage = styled.img`
    height: 14em;
    width: 14em;
    margin-right: 4rem;

`;
const HeroTextContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: center;  
`;

const HeroSubheading = styled.h2`
    font-family: 'Inter', sans-serif;
    font-weight: 300;
    font-size: 1.5rem;    
    color: var(--text-secondary);  
`;
const HeroButton = styled.div`
    width: 100%;
    display: flex;
    justify-content: start;
    padding-top: 2rem;
    align-items: start;
`;

function LandingPage() {
    const navigate = useNavigate();

  return (
      <MainContainer>
        <LandingNavBar />

        <BodyContainer>
            <HeroSection>
                <HeroImage src='/targetIcon.png' alt="Target icon" />
                <HeroTextContainer>
                    <Heading>Planora is a simple, powerful planning for your product team.</Heading>
                    <HeroSubheading>Always hit your targets</HeroSubheading>
                    <HeroButton><Button backgroundColor='var(--tan)' color='var(--white)' onClick={() => navigate('/loginandregister')}>Get Started</Button></HeroButton>
                </HeroTextContainer>
            </HeroSection>
            <Carousel/>
        </BodyContainer>
        <Footer/>
      </MainContainer>
  );
}

export default LandingPage;