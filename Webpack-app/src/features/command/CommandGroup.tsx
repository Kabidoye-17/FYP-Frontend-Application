import styled from "styled-components";
import { Command } from "cmdk";
import type { ReactNode } from "react";

interface CommandGroupProps {
    heading: string;
    children: ReactNode;
}

const StyledGroup = styled(Command.Group)`
    padding: 0.5rem 0;

    &:not(:last-child) {
        border-bottom: 1px solid var(--border-color);
    }
`;

const GroupHeading = styled.div`
    padding: 0.375rem 1rem 0.5rem;
    font-family: "Inter", sans-serif;
    font-size: 0.6875rem;
    font-weight: 600;
    color: var(--text-tertiary);
    text-transform: uppercase;
    letter-spacing: 0.05em;
`;

function CommandGroup({ heading, children }: Readonly<CommandGroupProps>) {
    return (
        <StyledGroup>
            <GroupHeading>{heading}</GroupHeading>
            {children}
        </StyledGroup>
    );
}

export default CommandGroup;
