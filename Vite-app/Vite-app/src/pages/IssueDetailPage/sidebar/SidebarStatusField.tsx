import styled from "styled-components";
import * as Dropdown from "../../../design_system/Dropdown";
import SmallStatusOpener from "../../../dropdowns/opener/SmallStatusOpener";
import StatusDropdownContent from "../../../dropdowns/content/StatusDropdownContent";
import type { StatusLevel } from "../types/issueDetailTypes";

interface SidebarStatusFieldProps {
  status: StatusLevel;
  onStatusChange: (status: StatusLevel) => void;
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

function SidebarStatusField({ status, onStatusChange }: SidebarStatusFieldProps) {
  return (
    <FieldContainer>
      <FieldLabel>Status</FieldLabel>
      <Dropdown.Root>
        <Dropdown.Trigger asChild>
          <SmallStatusOpener status={status} />
        </Dropdown.Trigger>
        <Dropdown.Portal>
          <StatusDropdownContent
            currentStatus={status}
            onStatusChange={onStatusChange}
          />
        </Dropdown.Portal>
      </Dropdown.Root>
    </FieldContainer>
  );
}

export default SidebarStatusField;
