import { useState } from "react";
import styled from "styled-components";
import * as Dropdown from "../../../design_system/Dropdown";
import SmallLabelsOpener from "../../../dropdowns/opener/SmallLabelsOpener";
import LabelsDropdownContent from "../../../dropdowns/content/LabelsDropdownContent";
import { mockLabels, type Label } from "../../../utils/labelData";

interface SidebarLabelsFieldProps {
  labels: string[];
  onLabelsChange: (labels: string[]) => void;
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

function SidebarLabelsField({ labels, onLabelsChange }: SidebarLabelsFieldProps) {
  const [allLabels, setAllLabels] = useState<Label[]>(mockLabels);
  const selectedLabels = allLabels.filter((l) => labels.includes(l.id));

  return (
    <FieldContainer>
      <FieldLabel>Labels</FieldLabel>
      <Dropdown.Root>
        <Dropdown.Trigger asChild>
          <SmallLabelsOpener selectedLabels={selectedLabels} />
        </Dropdown.Trigger>
        <Dropdown.Portal>
          <LabelsDropdownContent
            labels={allLabels}
            selectedLabels={labels}
            onLabelChange={onLabelsChange}
            onLabelsUpdate={setAllLabels}
          />
        </Dropdown.Portal>
      </Dropdown.Root>
    </FieldContainer>
  );
}

export default SidebarLabelsField;
