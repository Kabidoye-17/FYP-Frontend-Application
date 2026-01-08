import styled from "styled-components"; 

const LabelContainer = styled.label<{ $backgroundColor?: string; $color?: string }>`
    background-color: ${({ $backgroundColor }) => $backgroundColor || 'transparent'};
    color: ${({ $color }) => $color || 'var(--white)'};
    font-family: 'Inter', sans-serif;
    font-size: 1rem;
    font-weight: 700;
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
`;

interface LabelProps {
    children?: React.ReactNode;
    backgroundColor?: string;
    color?: string;
}

function Label({ children, backgroundColor, color }: Readonly<LabelProps>) {
  return <LabelContainer $backgroundColor={backgroundColor} $color={color}>{children}</LabelContainer>;
}

export default Label;