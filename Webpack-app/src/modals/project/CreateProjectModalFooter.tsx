import styled from "styled-components";

const FooterContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem;
    border-top: 1px solid var(--section-background);
`;

const CancelButton = styled.button`
    background: transparent;
    border: none;
    color: var(--text-secondary);
    font-family: 'Inter', sans-serif;
    font-size: 0.875rem;
    font-weight: 500;
    padding: 0.5rem 1rem;
    cursor: pointer;
    border-radius: 6px;

    &:hover {
        background-color: var(--section-background);
    }

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;

const CreateButton = styled.button<{ $isValid: boolean }>`
    background-color: ${({ $isValid }) => ($isValid ? 'var(--plum)' : 'var(--section-background)')};
    border: none;
    color: ${({ $isValid }) => ($isValid ? 'var(--white)' : 'var(--text-secondary)')};
    font-family: 'Inter', sans-serif;
    font-size: 0.875rem;
    font-weight: 500;
    padding: 0.5rem 1rem;
    cursor: ${({ $isValid }) => ($isValid ? 'pointer' : 'not-allowed')};
    border-radius: 6px;
    transition: background-color 0.2s ease;

    &:hover {
        background-color: ${({ $isValid }) => ($isValid ? 'var(--purple)' : 'var(--section-background)')};
    }

    &:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }
`;

interface CreateProjectModalFooterProps {
    onCancel: () => void;
    onSubmit: () => void;
    isSubmitting?: boolean;
    hasName: boolean;
    hasDescription: boolean;
}

function CreateProjectModalFooter({
    onCancel,
    onSubmit,
    isSubmitting = false,
    hasName,
    hasDescription,
}: Readonly<CreateProjectModalFooterProps>) {
    const isValid = hasName && hasDescription;

    return (
        <FooterContainer>
            <CancelButton onClick={onCancel} disabled={isSubmitting}>
                Cancel
            </CancelButton>
            <CreateButton
                $isValid={isValid}
                onClick={onSubmit}
                disabled={!isValid || isSubmitting}
            >
                {isSubmitting ? 'Creating...' : 'Create Project'}
            </CreateButton>
        </FooterContainer>
    );
}

export default CreateProjectModalFooter;
