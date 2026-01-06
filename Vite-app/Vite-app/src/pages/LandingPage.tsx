import styled from 'styled-components';
import LandingNavBar from '../navgiation/LandingNavBar';
import Button from '../design_system/Button';
import Footer from '../Footer';
import Carousel from '../Carousel/Carousel';


const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background-color: #FFFBF7;
`;

const BodyContainer = styled.div`
    width: 100%;
    height: 100%;
    background-color: #FFFBF7;
`;

const HeroSection = styled.section`
    display: flex;
    flex-direction: row;
    align-items: start;
    padding-left: 4em;
    padding-top: 4rem;
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
const HeroHeading = styled.h1`
    font-family: 'Inter', sans-serif;
    font-weight: 700;
    font-size: 3rem; 
    padding-bottom: 1rem;   
    color: #E3C18A;
`;

const HeroSubheading = styled.h2`
    font-family: 'Inter', sans-serif;
    font-weight: 300;
    font-size: 1.5rem;    
    color: #727272ff;  
`;
const HeroButton = styled.div`
    width: 100%;
    display: flex;
    justify-content: start;
    padding-top: 2rem;
    align-items: start;
`;

function LandingPage() {

  return (
      <MainContainer>
        <LandingNavBar />

        <BodyContainer>
            <HeroSection>
                <HeroImage src='/targetIcon.png' alt="Target icon" />
                <HeroTextContainer>
                    <HeroHeading>Planora is a simple, powerful planning for your product team.</HeroHeading>
                    <HeroSubheading>Always hit your targets</HeroSubheading>
                    <HeroButton><Button backgroundColor='#E3C18A' color='#ffffff'>Get Started</Button></HeroButton>
                </HeroTextContainer>
            </HeroSection>
            <Carousel/>
        </BodyContainer>
        <Footer/>
      </MainContainer>
  );
}

export default LandingPage;