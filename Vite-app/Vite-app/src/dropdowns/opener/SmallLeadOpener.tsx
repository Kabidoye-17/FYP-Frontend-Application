import styled from "styled-components";
import Avatar from "../../design_system/Avatar";
import { forwardRef } from "react";
import type { User } from "../../utils/assigneeData";

const OpenerButton = styled.button`
    all: unset;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 0.75rem;
    height: 40px;
    background-color: var(--white);
    border: 1px solid var(--section-background);
    border-radius: 6px;
    cursor: pointer;
    font-family: 'Inter', sans-serif;
    font-size: 0.875rem;
    color: var(--text-primary);
    transition: background-color 0.15s ease;
    min-width: 80px;
    box-sizing: border-box;

    &:hover {
        background-color: var(--section-background);
    }

    &:focus {
        outline: 2px solid var(--plum);
        outline-offset: 2px;
    }
`;

const LeadText = styled.span<{ $empty?: boolean }>`
    color: ${(props) => (props.$empty ? "var(--text-secondary)" : "var(--text-primary)")};
`;

interface SmallLeadOpenerProps {
    selectedLead: User | null;
}

const SmallLeadOpener = forwardRef<HTMLButtonElement, SmallLeadOpenerProps>(
    ({ selectedLead, ...props }, ref) => {
        return (
            <OpenerButton ref={ref} {...props}>
                {selectedLead ? (
                    <>
                        <Avatar size="xsmall" color={selectedLead.color} name={selectedLead.name} />
                        <LeadText>{selectedLead.name}</LeadText>
                    </>
                ) : (
                    <>
                        <Avatar size="xsmall" color="var(--section-background)" name="L" />
                        <LeadText $empty>Lead</LeadText>
                    </>
                )}
            </OpenerButton>
        );
    }
);

SmallLeadOpener.displayName = "SmallLeadOpener";

export default SmallLeadOpener;
