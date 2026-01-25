import styled from "styled-components";

const HeaderContainer = styled.div`
    width: 100%;
    height: 60px;
    border-radius: 25px 25px 0 0;
    background-color: var(--plum);
    font-family: 'Inter', sans-serif;
    font-size: 1rem;
    font-weight: 600;
    colour: plum;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 1rem;
    padding-right: 1rem;
    `;

interface ViewPageHeaderProps {
    children?: React.ReactNode;
    button?: React.ReactNode;
}

function ViewPageHeader({ children, button }: Readonly<ViewPageHeaderProps>) {
    return (
        <HeaderContainer>
           {children}
           {button && <div>{button}</div>}
        </HeaderContainer>
    );
}
export default ViewPageHeader;
