import styled from "styled-components";
import Avatar from "../../design_system/Avatar";
import AvatarGroup, { type User } from "../../design_system/AvatarGroup";
import { forwardRef } from "react";

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

const AssigneeText = styled.span`
    color: var(--text-secondary);
`;

interface SmallAssigneeOpenerProps {
    selectedAssignees: User[];
}

const SmallAssigneeOpener = forwardRef<HTMLButtonElement, SmallAssigneeOpenerProps>(
    ({ selectedAssignees, ...props }, ref) => {
        const hasAssignees = selectedAssignees.length > 0;

        return (
            <OpenerButton ref={ref} {...props}>
                {hasAssignees ? (
                    <AvatarGroup users={selectedAssignees} size="xsmall" maxVisible={3} />
                ) : (
                    <>
                        <Avatar size="xsmall" color="var(--section-background)" name="A" />
                        <AssigneeText>Assignee</AssigneeText>
                    </>
                )}
            </OpenerButton>
        );
    }
);

SmallAssigneeOpener.displayName = "SmallAssigneeOpener";

export default SmallAssigneeOpener;
