import styled from "styled-components";
import type { ReactNode } from "react";

interface FormSectionProps {
    title?: string;
    description?: string;
    children: ReactNode;
}

const Section = styled.fieldset`
    border: none;
    padding: 0;
    margin: 0;

    & + & {
        margin-top: 1.5rem;
        padding-top: 1.5rem;
        border-top: 1px solid var(--border-color);
    }
`;

const Header = styled.div`
    margin-bottom: 1rem;
`;

const Title = styled.legend`
    font-family: "Inter", sans-serif;
    font-size: 0.9375rem;
    font-weight: 600;
    color: var(--text-primary);
    padding: 0;
`;

const Description = styled.p`
    font-family: "Inter", sans-serif;
    font-size: 0.8125rem;
    color: var(--text-secondary);
    margin: 0.25rem 0 0 0;
`;

const Content = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

function FormSection({ title, description, children }: Readonly<FormSectionProps>) {
    return (
        <Section>
            {(title || description) && (
                <Header>
                    {title && <Title>{title}</Title>}
                    {description && <Description>{description}</Description>}
                </Header>
            )}
            <Content>{children}</Content>
        </Section>
    );
}

export default FormSection;
