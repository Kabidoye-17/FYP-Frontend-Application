import styled from "styled-components";
import * as Dropdown from "../../../design_system/Dropdown";
import SmallPriorityOpener from "../../../dropdowns/opener/SmallPriorityOpener";
import PriorityDropdownContent from "../../../dropdowns/content/PriorityDropdownContent";
import type { PriorityLevel } from "../types/issueDetailTypes";

interface SidebarPriorityFieldProps {
  priority: PriorityLevel;
  onPriorityChange: (priority: PriorityLevel) => void;
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

function SidebarPriorityField({ priority, onPriorityChange }: SidebarPriorityFieldProps) {
  return (
    <FieldContainer>
      <FieldLabel>Priority</FieldLabel>
      <Dropdown.Root>
        <Dropdown.Trigger asChild>
          <SmallPriorityOpener priority={priority} />
        </Dropdown.Trigger>
        <Dropdown.Portal>
          <PriorityDropdownContent
            currentPriority={priority}
            onPriorityChange={onPriorityChange}
          />
        </Dropdown.Portal>
      </Dropdown.Root>
    </FieldContainer>
  );
}

export default SidebarPriorityField;
