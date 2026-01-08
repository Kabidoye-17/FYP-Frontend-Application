import styled from "styled-components";

const InputContainer = styled.input<{ borderColor?: string }>`
    width: 21em;
    height: 3em;
    border: 3px solid  ${({ borderColor }) => borderColor || 'var(--light-plum)'};
    border-radius: 5px;
    color: var(--text-primary);
    background-color: var(--white);
    font-family: 'Inter', sans-serif;
    font-size: 1rem;
`;
interface InputProps {
    placeholder?: string;
    type: string;
    borderColor?: string;
}
function Input({ placeholder, type }: Readonly<InputProps>) {
    return (    
        <InputContainer  placeholder={placeholder} type={type} />
    );
}   

export default Input;