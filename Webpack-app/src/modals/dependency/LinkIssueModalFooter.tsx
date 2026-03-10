import styled from "styled-components";
import Button from "../../design_system/Button";
import Icon from "../../design_system/Icon";

interface LinkIssueModalFooterProps {
    onCancel: () => void;
    onSubmit: () => void;
    isValid: boolean;
}

const Footer = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 0.75rem;
    padding: 1rem 1.25rem;
    border-top: 1px solid var(--border-color);
`;

function LinkIssueModalFooter({
    onCancel,
    onSubmit,
    isValid,
}: Readonly<LinkIssueModalFooterProps>) {
    return (
        <Footer>
            <Button
                backgroundColor="var(--white)"
                color="var(--text-primary)"
                onClick={onCancel}
            >
                Cancel
            </Button>
            <Button
                icon={<Icon name="Link" size={14} color="var(--white)" weight="regular" />}
                backgroundColor="var(--purple)"
                color="var(--white)"
                onClick={onSubmit}
                disabled={!isValid}
            >
                Link Issue
            </Button>
        </Footer>
    );
}

export default LinkIssueModalFooter;
