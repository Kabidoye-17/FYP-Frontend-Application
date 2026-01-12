import { useState, useEffect } from "react";
import styled from "styled-components";
import SignUpForm from "../forms/SignUpForm";
import Footer from "../footer/Footer";
import PlainNavBar from "../navigation/PlainNavBar";
import { MainContainer } from "./LandingPage";
import Button from "../design_system/Button";
import { useNavigate } from "react-router-dom";
import SignUpPageSkeleton from "../skeletons/SignUpPageSkeleton";

export const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding-bottom: 1rem;
`;

function SignUpPage() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return <SignUpPageSkeleton />;
    }

    return (
    <MainContainer>
        <PlainNavBar />
        <SignUpForm />
        <ButtonContainer>
            <Button backgroundColor='var(--plum)' color='var(--white)' onClick={() => navigate('/login')}> Log In instead? </Button>
        </ButtonContainer>
        <Footer />

    </MainContainer>
    );
}
export default SignUpPage;