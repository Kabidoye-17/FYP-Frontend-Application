import styled from "styled-components";
import type { ReactNode } from "react";
import FormError from "./FormError";

interface FormFieldProps {
    label: string;
    htmlFor: string;
    error?: string;
    required?: boolean;
    hint?: string;
    children: ReactNode;
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.375rem;
`;

const LabelRow = styled.div`
    display: flex;
    align-items: center;
    gap: 0.25rem;
`;

const Label = styled.label`
    font-family: "Inter", sans-serif;
    font-size: 0.8125rem;
    font-weight: 500;
    color: var(--text-primary);
`;

const RequiredIndicator = styled.span`
    color: var(--error);
`;

const Hint = styled.p`
    font-family: "Inter", sans-serif;
    font-size: 0.6875rem;
    color: var(--text-tertiary);
    margin: 0;
`;

function FormField({
    label,
    htmlFor,
    error,
    required,
    hint,
    children,
}: Readonly<FormFieldProps>) {
    return (
        <Container>
            <LabelRow>
                <Label htmlFor={htmlFor}>{label}</Label>
                {required && <RequiredIndicator>*</RequiredIndicator>}
            </LabelRow>
            {children}
            {hint && !error && <Hint>{hint}</Hint>}
            <FormError message={error} />
        </Container>
    );
}

export default FormField;
