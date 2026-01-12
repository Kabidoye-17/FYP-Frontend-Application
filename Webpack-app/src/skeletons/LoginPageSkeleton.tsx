import PlainNavBar from "../navigation/PlainNavBar";
import Footer from "../footer/Footer";
import { MainContainer } from "../pages/LandingPage";
import LoginFormSkeleton from "./LoginFormSkeleton";
import { ButtonContainer } from "../pages/SignUpPage";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

function LoginPageSkeleton() {
  return (
    <MainContainer>
      <PlainNavBar />
      <LoginFormSkeleton />
      <ButtonContainer>
        <Skeleton width={180} height={40} borderRadius={4} />
      </ButtonContainer>
      <Footer />
    </MainContainer>
  );
}

export default LoginPageSkeleton;
