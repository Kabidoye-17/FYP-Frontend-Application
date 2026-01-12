import { useState, useEffect } from "react";
import Footer from "../footer/Footer";
import PlainNavBar from "../navigation/PlainNavBar";
import LoginForm from "../forms/LoginForm";
import { MainContainer } from "./LandingPage";
import Button from "../design_system/Button";
import { ButtonContainer } from "./SignUpPage";
import { useNavigate } from "react-router-dom";
import LoginPageSkeleton from "../skeletons/LoginPageSkeleton";

function LoginPage() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return <LoginPageSkeleton />;
    }

  return (
  <MainContainer>
    <PlainNavBar />
    <LoginForm />
    <ButtonContainer>
        <Button backgroundColor='var(--plum)' color='var(--white)' onClick={() => navigate('/signup')}> Sign Up instead? </Button>
    </ButtonContainer>
    <Footer />
  </MainContainer>
  );
}
export default LoginPage;