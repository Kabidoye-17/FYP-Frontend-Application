import styled from "styled-components";

const TextareaContainer = styled.textarea<{ borderColor?: string }>`
    width: 100%;
    height: 100%;
    border: 3px solid ${({ borderColor }) => borderColor || 'var(--light-plum)'};
    border-radius: 5px;
    color: var(--text-primary);
    background-color: var(--white);
    font-family: 'Inter', sans-serif;
    font-size: 1rem;
    padding: 0.75rem;
    resize: none;
    box-sizing: border-box;

    &:focus {
        outline: none;
        border-color: var(--plum);
    }
`;

interface TextareaProps {
    placeholder?: string;
    borderColor?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

function Textarea({ placeholder, borderColor, value, onChange }: Readonly<TextareaProps>) {
    return (
        <TextareaContainer
            placeholder={placeholder}
            borderColor={borderColor}
            value={value}
            onChange={onChange}
        />
    );
}

export default Textarea;
