import styled from "styled-components";
import Button from "../../design_system/Button";
import Icon from "../../design_system/Icon";

interface BulkEditModalFooterProps {
    onCancel: () => void;
    onApply: () => void;
    isApplying: boolean;
    canApply: boolean;
}

const Footer = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 0.75rem;
    padding: 1rem 1.25rem;
    border-top: 1px solid var(--border-color);
`;

function BulkEditModalFooter({
    onCancel,
    onApply,
    isApplying,
    canApply,
}: Readonly<BulkEditModalFooterProps>) {
    return (
        <Footer>
            <Button
                backgroundColor="var(--white)"
                color="var(--text-primary)"
                onClick={onCancel}
                disabled={isApplying}
            >
                Cancel
            </Button>
            <Button
                icon={<Icon name="Check" size={14} color="var(--white)" weight="bold" />}
                backgroundColor="var(--purple)"
                color="var(--white)"
                onClick={onApply}
                disabled={!canApply || isApplying}
            >
                {isApplying ? "Applying..." : "Apply Changes"}
            </Button>
        </Footer>
    );
}

export default BulkEditModalFooter;
