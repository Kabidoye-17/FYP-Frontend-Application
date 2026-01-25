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
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
function Input({ placeholder, type, borderColor, value, onChange }: Readonly<InputProps>) {
    return (
        <InputContainer
            placeholder={placeholder}
            type={type}
            borderColor={borderColor}
            value={value}
            onChange={onChange}
        />
    );
}   

export default Input;