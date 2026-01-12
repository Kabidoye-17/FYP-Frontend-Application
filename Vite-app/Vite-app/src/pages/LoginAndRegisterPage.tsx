import styled from "styled-components";
import Heading from '../design_system/Heading';
import { MainContainer } from "./LandingPage";
import Button from "../design_system/Button";
import { useNavigate } from "react-router";
import PlainNavBar from "../navigation/PlainNavBar";
import Footer from "../footer/Footer";

const ContentWrapper = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
`;

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 2rem;
`;


function LoginAndRegisterPage() {
    const navigate = useNavigate();
  return (
    <MainContainer>
    <PlainNavBar />
      <ContentWrapper>
        <Heading  colour="var(--plum)"> Welcome to Planora! </Heading>
        <ButtonContainer>
          <Button backgroundColor='var(--plum)' color='var(--white)' onClick={() => navigate('/login')}> Login </Button>
          <Button backgroundColor='var(--white)' color='var(--plum)' onClick={() => navigate('/signup')}> Register </Button>
        </ButtonContainer>
      </ContentWrapper>
      <Footer />
    </MainContainer>
  );
}

export default LoginAndRegisterPage;
