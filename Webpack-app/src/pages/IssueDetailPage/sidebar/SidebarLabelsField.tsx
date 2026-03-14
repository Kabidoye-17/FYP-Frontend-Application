import styled from "styled-components";
import * as Dropdown from "../../../design_system/Dropdown";
import SmallLabelsOpener from "../../../dropdowns/opener/SmallLabelsOpener";
import LabelsDropdownContent from "../../../dropdowns/content/LabelsDropdownContent";
import { useLabels, useCreateLabel } from "../../../hooks/queries";

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
  const { data: allLabels = [] } = useLabels();
  const createLabel = useCreateLabel();

  // Transform to the format expected by the dropdown
  const labelList = allLabels.map(l => ({
    id: l.id,
    name: l.name,
    color: l.color,
  }));

  const selectedLabels = labelList.filter((l) => labels.includes(l.id));

  const handleLabelsUpdate = (updatedLabels: { id: string; name: string; color: string }[]) => {
    // Find new labels that need to be created
    const newLabels = updatedLabels.filter(
      label => !allLabels.some(existing => existing.id === label.id)
    );

    // Create any new labels
    newLabels.forEach(label => {
      createLabel.mutate({ name: label.name, color: label.color });
    });
  };

  return (
    <FieldContainer>
      <FieldLabel>Labels</FieldLabel>
      <Dropdown.Root>
        <Dropdown.Trigger asChild>
          <SmallLabelsOpener selectedLabels={selectedLabels} />
        </Dropdown.Trigger>
        <Dropdown.Portal>
          <LabelsDropdownContent
            labels={labelList}
            selectedLabels={labels}
            onLabelChange={onLabelsChange}
            onLabelsUpdate={handleLabelsUpdate}
          />
        </Dropdown.Portal>
      </Dropdown.Root>
    </FieldContainer>
  );
}

export default SidebarLabelsField;
