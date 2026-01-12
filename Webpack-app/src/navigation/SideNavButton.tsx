import styled from "styled-components";

const ButtonContainer = styled.button<{ $isActive?: boolean }>`
    width: inherit;
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: start;
    background-color: ${props => props.$isActive ? 'var(--light-plum)' : 'var(--section-background)'};
    color: ${props => props.$isActive ? 'var(--white)' : 'var(--text-primary)'};
    border: none;
    font-family: 'Inter', sans-serif;
    font-size: .75rem;
    font-weight: 500;
    padding-left: 1rem;
    gap: 1rem;
    box-shadow: rgba(17, 17, 26, 0.1) 0px 1px 0px;
    cursor: pointer;


 & {
  transition: transform 0.2s ease, filter 0.2s ease, background-color 0.2s ease;
}

&:hover {
  transform: translateY(-3px);
  filter: brightness(0.95);
  background-color: ${props => props.$isActive ? 'var(--plum)' : 'var(--section-background)'};
}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

interface SideNavButtonProps {
    title: string;
    icon?: React.ReactNode;
    onClick?: () => void;
    isActive?: boolean;
}

function SideNavButton({ title, icon, isActive,
  ...props }: Readonly<SideNavButtonProps>) {
    return (
        <ButtonContainer $isActive={isActive} {...props}>
            {icon}
            {title}
        </ButtonContainer>
    );
}

export default SideNavButton;