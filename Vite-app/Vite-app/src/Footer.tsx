import styled from "styled-components";
import Icon from "./design_system/Icon";

const FooterContainer = styled.div`
    width: 100%;
    height: 3rem;
    background-color: #B24F9F;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.75rem 0;
    font-family: 'Inter', sans-serif;
    font-weight: 100;
    font-size: 0.9rem;
    color: #ffffff;
`;

function Footer() {
  return (
    <FooterContainer><Icon name="Copyright" size={24} color="#ffffff" weight="thin" />2026 Planora. All rights reserved.</FooterContainer>
  );
}   
export default Footer;