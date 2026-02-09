import styled from "styled-components";
import * as Dropdown from "../../../design_system/Dropdown";
import SmallAssigneeOpener from "../../../dropdowns/opener/SmallAssigneeOpener";
import AssigneeDropdownContent from "../../../dropdowns/content/AssigneeDropdownContent";
import { mockAssignees } from "../../../utils/assigneeData";

interface SidebarAssigneesFieldProps {
  assignees: string[];
  onAssigneesChange: (assignees: string[]) => void;
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

function SidebarAssigneesField({ assignees, onAssigneesChange }: SidebarAssigneesFieldProps) {
  const selectedAssignees = mockAssignees.filter((a) => assignees.includes(a.id));

  return (
    <FieldContainer>
      <FieldLabel>Assignees</FieldLabel>
      <Dropdown.Root>
        <Dropdown.Trigger asChild>
          <SmallAssigneeOpener selectedAssignees={selectedAssignees} />
        </Dropdown.Trigger>
        <Dropdown.Portal>
          <AssigneeDropdownContent
            assignees={mockAssignees}
            selectedAssignees={assignees}
            onAssigneeChange={onAssigneesChange}
          />
        </Dropdown.Portal>
      </Dropdown.Root>
    </FieldContainer>
  );
}

export default SidebarAssigneesField;
