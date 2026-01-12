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
    padding-left: 1rem;
    `;

function ViewIssuesPageHeader() {
    return (
        <HeaderContainer>
            Issues
        </HeaderContainer>
    );
}
export default ViewIssuesPageHeader;