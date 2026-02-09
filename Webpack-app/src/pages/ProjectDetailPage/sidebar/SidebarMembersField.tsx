import styled from "styled-components";
import * as Dropdown from "../../../design_system/Dropdown";
import SmallMembersOpener from "../../../dropdowns/opener/SmallMembersOpener";
import MembersDropdownContent from "../../../dropdowns/content/MembersDropdownContent";
import { mockAssignees } from "../../../utils/assigneeData";

interface SidebarMembersFieldProps {
  memberIds: string[];
  onMembersChange: (memberIds: string[]) => void;
}

const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const FieldLabel = styled.span`
  font-family: "Inter", sans-serif;
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.025em;
`;

function SidebarMembersField({ memberIds, onMembersChange }: SidebarMembersFieldProps) {
  const selectedMembers = mockAssignees.filter((a) => memberIds.includes(a.id));

  return (
    <FieldContainer>
      <FieldLabel>Members</FieldLabel>
      <Dropdown.Root>
        <Dropdown.Trigger asChild>
          <SmallMembersOpener selectedMembers={selectedMembers} />
        </Dropdown.Trigger>
        <Dropdown.Portal>
          <MembersDropdownContent
            users={mockAssignees}
            selectedMemberIds={memberIds}
            onMembersChange={onMembersChange}
          />
        </Dropdown.Portal>
      </Dropdown.Root>
    </FieldContainer>
  );
}

export default SidebarMembersField;
