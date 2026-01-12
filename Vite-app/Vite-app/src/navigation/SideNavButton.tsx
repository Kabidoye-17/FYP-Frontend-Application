import styled from "styled-components";

const ButtonContainer = styled.button`
    width: inherit;
    height: 3rem;
    display: flex;  
    align-items: center;
    justify-content: start;
    background-color: var(--section-background);
    border: none;
    font-family: 'Inter', sans-serif;
    font-size: .75rem;
    font-weight: 500;
    padding-left: 1rem;
    gap: 1rem;
    box-shadow: rgba(17, 17, 26, 0.1) 0px 1px 0px;
    cursor: pointer;
    

 & {
  transition: transform 0.2s ease, filter 0.2s ease;
}

&:hover {
  transform: translateY(-3px); /* moves up by 3px */
  filter: brightness(0.95);
}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

interface SideNavButtonProps {
    title: string;
    icon?: React.ReactNode;
}

function SideNavButton({ title, icon,
  ...props }: Readonly<SideNavButtonProps>) {
    return (
        <ButtonContainer {...props}>
            {icon}
            {title}
        </ButtonContainer>
    );
}

export default SideNavButton;