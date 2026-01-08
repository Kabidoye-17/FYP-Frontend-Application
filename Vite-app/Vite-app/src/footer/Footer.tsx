import styled from "styled-components";
import Icon from "../design_system/Icon";

const FooterContainer = styled.div`
    width: 100%;
    height: 3rem;
    background-color: var(--plum);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.75rem 0;
    font-family: 'Inter', sans-serif;
    font-weight: 100;
    font-size: 0.9rem;
    color: var(--white);
    margin-top: auto;
`;

function Footer() {
  return (
    <FooterContainer><Icon name="Copyright" size={24} color="var(--white)" weight="thin" />2026 Planora. All rights reserved.</FooterContainer>
  );
}   
export default Footer;