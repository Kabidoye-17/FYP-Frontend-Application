import styled from "styled-components";

const HeaderContainer = styled.div`
    width: 100%;
    height: 25%;
    border-bottom: 1px solid var(--purple);
    background-color: var(--purple);
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    display: flex;
    align-items: center;
    justify-content: start;
    padding-left: 1rem;
    font-family: 'Inter', sans-serif;
    font-weight: 400;
    font-size: 1.2rem;
    color: var(--white);
    box-shadow:
        rgba(0, 0, 0, 0.24) -3px 0px 8px,
        rgba(0, 0, 0, 0.24) 0px -3px 8px,
        rgba(0, 0, 0, 0.24) 3px 0px 8px;
`;

interface CarouselCardHeaderProps {
  title?: string;
}

function CarouselCardHeader({ title }: Readonly<CarouselCardHeaderProps>) {
  return (
    <HeaderContainer>{title}</HeaderContainer>
  );
}
export default CarouselCardHeader;