import * as Dropdown from "../../design_system/Dropdown";
import Icon from "../../design_system/Icon";
import Avatar from "../../design_system/Avatar";
import SearchBar from "../../design_system/SearchBar";
import styled from "styled-components";
import { useState } from "react";
import type { User } from "../../utils/assigneeData";

const ModalDropdownContent = styled(Dropdown.Content)`
    z-index: 250;
    background-color: var(--white);
    min-width: 280px;
    padding: 0;
`;

const SearchBarContainer = styled.div`
    position: sticky;
    top: 0;
    z-index: 1;
    background-color: var(--white);
    padding: 0.5rem;
    border-bottom: 1px solid var(--section-background);
`;

const AssigneeListContainer = styled.div`
    max-height: 320px;
    overflow-y: auto;
    padding: 0.5rem;
`;

const AssigneeItem = styled(Dropdown.CheckboxItem)`
    position: relative;
    padding-right: 2rem;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
`;

const ItemContent = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;

const AssigneeName = styled.span`
    font-size: 0.875rem;
    color: var(--text-primary);
`;

const CheckContainer = styled.div`
    position: absolute;
    right: 0.75rem;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const EmptyState = styled.div`
    padding: 1rem;
    text-align: center;
    font-family: "Inter", sans-serif;
    font-size: 0.875rem;
    color: var(--text-secondary);
`;

interface AssigneeDropdownContentProps {
    assignees: User[];
    selectedAssignees: string[];
    onAssigneeChange: (assigneeIds: string[]) => void;
}

function AssigneeDropdownContent({
    assignees,
    selectedAssignees,
    onAssigneeChange,
}: Readonly<AssigneeDropdownContentProps>) {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredAssignees = assignees.filter((assignee) =>
        assignee.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleToggleAssignee = (assigneeId: string) => {
        const isSelected = selectedAssignees.includes(assigneeId);
        if (isSelected) {
            onAssigneeChange(selectedAssignees.filter((id) => id !== assigneeId));
        } else {
            onAssigneeChange([...selectedAssignees, assigneeId]);
        }
    };

    return (
        <ModalDropdownContent sideOffset={5} align="start">
            <SearchBarContainer>
                <SearchBar
                    placeholder="Search assignees..."
                    value={searchTerm}
                    onChange={setSearchTerm}
                    size="compact"
                />
            </SearchBarContainer>
            <AssigneeListContainer>
                {filteredAssignees.length === 0 ? (
                    <EmptyState>No assignees found</EmptyState>
                ) : (
                    filteredAssignees.map((assignee) => {
                        const isSelected = selectedAssignees.includes(assignee.id);

                        return (
                            <AssigneeItem
                                key={assignee.id}
                                checked={isSelected}
                                onCheckedChange={() => handleToggleAssignee(assignee.id)}
                            >
                                <ItemContent>
                                    <Avatar size="xsmall" color={assignee.color} name={assignee.name} />
                                    <AssigneeName>{assignee.name}</AssigneeName>
                                </ItemContent>
                                {isSelected && (
                                    <CheckContainer>
                                        <Icon
                                            name="Check"
                                            size={16}
                                            color="var(--plum)"
                                            weight="bold"
                                        />
                                    </CheckContainer>
                                )}
                            </AssigneeItem>
                        );
                    })
                )}
            </AssigneeListContainer>
        </ModalDropdownContent>
    );
}

export default AssigneeDropdownContent;
