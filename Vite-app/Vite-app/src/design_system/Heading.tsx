import styled from 'styled-components';


const HeadingText = styled.h1<{ $colour?: string }>`
    font-family: 'Inter', sans-serif;
    font-weight: 700;
    font-size: 3rem; 
    padding-bottom: 1rem;
    color: ${props => props.$colour || 'var(--tan)'};
    background-color: transparent;
`;

interface HeadingProps {
    children: React.ReactNode;
    colour?: string;
}

function Heading({ children, colour }: Readonly<HeadingProps>) {
    return (    
        <HeadingText $colour={colour}>{children}</HeadingText>
    );
}

export default Heading;