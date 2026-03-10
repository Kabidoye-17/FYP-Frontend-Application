import styled from "styled-components";
import Button from "../../design_system/Button";
import Icon from "../../design_system/Icon";

interface InviteTeamMemberModalFooterProps {
    onCancel: () => void;
    onSubmit: () => void;
    isSubmitting: boolean;
    isValid: boolean;
}

const Footer = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 0.75rem;
    padding: 1rem 1.25rem;
    border-top: 1px solid var(--border-color);
`;

function InviteTeamMemberModalFooter({
    onCancel,
    onSubmit,
    isSubmitting,
    isValid,
}: Readonly<InviteTeamMemberModalFooterProps>) {
    return (
        <Footer>
            <Button
                backgroundColor="var(--white)"
                color="var(--text-primary)"
                onClick={onCancel}
                disabled={isSubmitting}
            >
                Cancel
            </Button>
            <Button
                icon={<Icon name="PaperPlaneTilt" size={14} color="var(--white)" weight="regular" />}
                backgroundColor="var(--purple)"
                color="var(--white)"
                onClick={onSubmit}
                disabled={!isValid || isSubmitting}
            >
                {isSubmitting ? "Sending..." : "Send Invite"}
            </Button>
        </Footer>
    );
}

export default InviteTeamMemberModalFooter;
