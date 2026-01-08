import styled from "styled-components";

const FooterContainer = styled.div`
    width: 100%;
    height: 15%;
    background-color: var(--purple);
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
    display: flex;
    align-items: center;
    justify-content: start;
    padding-left: 1rem;
    font-family: 'Inter', sans-serif;
    font-weight: 400;
    font-size: 1.2rem;
    box-shadow:
        rgba(0, 0, 0, 0.24) -3px 0px 8px,
        rgba(0, 0, 0, 0.24) 0px 3px 8px,
        rgba(0, 0, 0, 0.24) 3px 0px 8px;
    color: var(--white);
`;

interface CarouselCardFooterProps {
  footerText?: string;
}

function CarouselCardFooter({ footerText }: Readonly<CarouselCardFooterProps>) {
  return (
    <FooterContainer>
        {footerText}
    </FooterContainer>
  );
}

export default CarouselCardFooter;