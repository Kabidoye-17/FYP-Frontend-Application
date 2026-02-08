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

const MembersListContainer = styled.div`
    max-height: 320px;
    overflow-y: auto;
    padding: 0.5rem;
`;

const MemberItem = styled(Dropdown.CheckboxItem)`
    position: relative;
    padding-right: 2rem;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
`;

const ItemContent = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;

const MemberName = styled.span`
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

interface MembersDropdownContentProps {
    users: User[];
    selectedMemberIds: string[];
    onMembersChange: (memberIds: string[]) => void;
}

function MembersDropdownContent({
    users,
    selectedMemberIds,
    onMembersChange,
}: Readonly<MembersDropdownContentProps>) {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleToggleMember = (userId: string) => {
        const isSelected = selectedMemberIds.includes(userId);
        if (isSelected) {
            onMembersChange(selectedMemberIds.filter((id) => id !== userId));
        } else {
            onMembersChange([...selectedMemberIds, userId]);
        }
    };

    return (
        <ModalDropdownContent sideOffset={5} align="start">
            <SearchBarContainer>
                <SearchBar
                    placeholder="Search members..."
                    value={searchTerm}
                    onChange={setSearchTerm}
                    size="compact"
                />
            </SearchBarContainer>
            <MembersListContainer>
                {filteredUsers.length === 0 ? (
                    <EmptyState>No members found</EmptyState>
                ) : (
                    filteredUsers.map((user) => {
                        const isSelected = selectedMemberIds.includes(user.id);

                        return (
                            <MemberItem
                                key={user.id}
                                checked={isSelected}
                                onCheckedChange={() => handleToggleMember(user.id)}
                            >
                                <ItemContent>
                                    <Avatar size="xsmall" color={user.color} name={user.name} />
                                    <MemberName>{user.name}</MemberName>
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
                            </MemberItem>
                        );
                    })
                )}
            </MembersListContainer>
        </ModalDropdownContent>
    );
}

export default MembersDropdownContent;
