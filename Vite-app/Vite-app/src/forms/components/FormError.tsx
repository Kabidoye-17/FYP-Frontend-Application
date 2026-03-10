import styled from "styled-components";
import Icon from "../../design_system/Icon";

interface FormErrorProps {
    message?: string;
}

const Container = styled.div`
    display: flex;
    align-items: center;
    gap: 0.375rem;
    margin-top: 0.375rem;
`;

const ErrorText = styled.span`
    font-family: "Inter", sans-serif;
    font-size: 0.75rem;
    color: var(--error);
`;

function FormError({ message }: Readonly<FormErrorProps>) {
    if (!message) return null;

    return (
        <Container role="alert">
            <Icon name="Warning" size={14} color="var(--error)" weight="fill" />
            <ErrorText>{message}</ErrorText>
        </Container>
    );
}

export default FormError;
