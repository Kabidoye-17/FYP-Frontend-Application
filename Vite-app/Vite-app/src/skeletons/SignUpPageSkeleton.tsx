import PlainNavBar from "../navgiation/PlainNavBar";
import Footer from "../footer/Footer";
import { MainContainer } from "../pages/LandingPage";
import SignUpFormSkeleton from "./SignUpFormSkeleton";
import { ButtonContainer } from "../pages/SignUpPage";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

function SignUpPageSkeleton() {
  return (
    <MainContainer>
      <PlainNavBar />
      <SignUpFormSkeleton />
      <ButtonContainer>
        <Skeleton width={150} height={40} borderRadius={4} />
      </ButtonContainer>
      <Footer />
    </MainContainer>
  );
}

export default SignUpPageSkeleton;
