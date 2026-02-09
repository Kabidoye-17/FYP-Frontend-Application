import styled from "styled-components";
import * as Popover from "../../../design_system/Popover";
import SmallTargetDateOpener from "../../../dropdowns/opener/SmallTargetDateOpener";
import TargetDatePickerContent from "../../../dropdowns/content/TargetDatePickerContent";

interface SidebarTargetDateFieldProps {
  targetDate: Date | null;
  onTargetDateChange: (date: Date | null) => void;
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

function SidebarTargetDateField({ targetDate, onTargetDateChange }: SidebarTargetDateFieldProps) {
  return (
    <FieldContainer>
      <FieldLabel>Target Date</FieldLabel>
      <Popover.Root>
        <Popover.Trigger asChild>
          <SmallTargetDateOpener selectedDate={targetDate} />
        </Popover.Trigger>
        <Popover.Portal>
          <TargetDatePickerContent
            selectedDate={targetDate}
            onDateChange={onTargetDateChange}
          />
        </Popover.Portal>
      </Popover.Root>
    </FieldContainer>
  );
}

export default SidebarTargetDateField;
