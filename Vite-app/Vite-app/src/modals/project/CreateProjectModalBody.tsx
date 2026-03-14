import styled from "styled-components";
import * as Dropdown from "../../design_system/Dropdown";
import * as Popover from "../../design_system/Popover";
import SmallStatusOpener from "../../dropdowns/opener/SmallStatusOpener";
import StatusDropdownContent from "../../dropdowns/content/StatusDropdownContent";
import SmallPriorityOpener from "../../dropdowns/opener/SmallPriorityOpener";
import PriorityDropdownContent from "../../dropdowns/content/PriorityDropdownContent";
import SmallLeadOpener from "../../dropdowns/opener/SmallLeadOpener";
import LeadDropdownContent from "../../dropdowns/content/LeadDropdownContent";
import SmallMembersOpener from "../../dropdowns/opener/SmallMembersOpener";
import MembersDropdownContent from "../../dropdowns/content/MembersDropdownContent";
import SmallLabelsOpener from "../../dropdowns/opener/SmallLabelsOpener";
import LabelsDropdownContent from "../../dropdowns/content/LabelsDropdownContent";
import SmallTargetDateOpener from "../../dropdowns/opener/SmallTargetDateOpener";
import TargetDatePickerContent from "../../dropdowns/content/TargetDatePickerContent";
import { useTeam, useLabels, useCreateLabel } from "../../hooks/queries";
import type { StatusLevel, PriorityLevel } from "../../utils/issueIconMaps";

const BodyContainer = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    padding: 1rem;
    gap: 0;
    background-color: var(--white);
`;

const NameInput = styled.input`
    width: 100%;
    border: none;
    background: transparent;
    color: var(--text-primary);
    font-family: 'Inter', sans-serif;
    font-size: 1.125rem;
    font-weight: 600;
    padding: 0.75rem;
    outline: none;

    &::placeholder {
        color: var(--text-secondary);
        opacity: 0.5;
    }
`;

const Divider = styled.div`
    width: 100%;
    height: 1px;
    background-color: var(--section-background);
    margin: 0.5rem 0;
`;

const DescriptionTextarea = styled.textarea`
    flex: 1;
    width: 100%;
    border: none;
    background: transparent;
    color: var(--text-primary);
    font-family: 'Inter', sans-serif;
    font-size: 0.9375rem;
    padding: 0.75rem;
    resize: none;
    outline: none;

    &::placeholder {
        color: var(--text-secondary);
        opacity: 0.5;
    }
`;

const DropdownSection = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
    padding-top: 0.75rem;
    padding-left: 0.5rem;
    border-top: 1px solid var(--section-background);
    margin-top: auto;
`;


interface ProjectFormData {
    name: string;
    description: string;
    status: StatusLevel;
    priority: PriorityLevel;
    leadId: string | null;
    memberIds: string[];
    labels: string[];
    targetDate: Date | null;
}

interface CreateProjectModalBodyProps {
    formData: ProjectFormData;
    onChange: (field: keyof ProjectFormData, value: string | string[] | Date | null) => void;
}

function CreateProjectModalBody({ formData, onChange }: Readonly<CreateProjectModalBodyProps>) {
    const { data: teamMembers = [] } = useTeam();
    const { data: allLabels = [] } = useLabels();
    const createLabel = useCreateLabel();

    // Transform data to the format expected by dropdowns
    const users = teamMembers.map(m => ({ id: m.id, name: m.name, color: m.color }));
    const labels = allLabels.map(l => ({ id: l.id, name: l.name, color: l.color }));

    const handleLabelsUpdate = (updatedLabels: { id: string; name: string; color: string }[]) => {
        // Create any new labels
        const newLabels = updatedLabels.filter(
            label => !allLabels.some(existing => existing.id === label.id)
        );
        newLabels.forEach(label => {
            createLabel.mutate({ name: label.name, color: label.color });
        });
    };

    return (
        <BodyContainer>
            <NameInput
                type="text"
                placeholder="Project Name"
                value={formData.name}
                onChange={(e) => onChange("name", e.target.value)}
            />
            <Divider />
            <DescriptionTextarea
                placeholder="Description"
                value={formData.description}
                onChange={(e) => onChange("description", e.target.value)}
            />
            <DropdownSection>
                <Dropdown.Root>
                    <Dropdown.Trigger asChild>
                        <SmallStatusOpener status={formData.status} />
                    </Dropdown.Trigger>
                    <Dropdown.Portal>
                        <StatusDropdownContent
                            currentStatus={formData.status}
                            onStatusChange={(status) => onChange("status", status)}
                        />
                    </Dropdown.Portal>
                </Dropdown.Root>
                <Dropdown.Root>
                    <Dropdown.Trigger asChild>
                        <SmallPriorityOpener priority={formData.priority} />
                    </Dropdown.Trigger>
                    <Dropdown.Portal>
                        <PriorityDropdownContent
                            currentPriority={formData.priority}
                            onPriorityChange={(priority) => onChange("priority", priority)}
                        />
                    </Dropdown.Portal>
                </Dropdown.Root>
                <Dropdown.Root>
                    <Dropdown.Trigger asChild>
                        <SmallLeadOpener
                            selectedLead={users.find((a) => a.id === formData.leadId) || null}
                        />
                    </Dropdown.Trigger>
                    <Dropdown.Portal>
                        <LeadDropdownContent
                            users={users}
                            selectedLeadId={formData.leadId}
                            onLeadChange={(id) => onChange("leadId", id)}
                        />
                    </Dropdown.Portal>
                </Dropdown.Root>
                <Dropdown.Root>
                    <Dropdown.Trigger asChild>
                        <SmallMembersOpener
                            selectedMembers={users.filter((a) =>
                                formData.memberIds.includes(a.id)
                            )}
                        />
                    </Dropdown.Trigger>
                    <Dropdown.Portal>
                        <MembersDropdownContent
                            users={users}
                            selectedMemberIds={formData.memberIds}
                            onMembersChange={(ids) => onChange("memberIds", ids)}
                        />
                    </Dropdown.Portal>
                </Dropdown.Root>
                <Dropdown.Root>
                    <Dropdown.Trigger asChild>
                        <SmallLabelsOpener
                            selectedLabels={labels.filter((l) =>
                                formData.labels.includes(l.id)
                            )}
                        />
                    </Dropdown.Trigger>
                    <Dropdown.Portal>
                        <LabelsDropdownContent
                            labels={labels}
                            selectedLabels={formData.labels}
                            onLabelChange={(ids) => onChange("labels", ids)}
                            onLabelsUpdate={handleLabelsUpdate}
                        />
                    </Dropdown.Portal>
                </Dropdown.Root>
                <Popover.Root>
                    <Popover.Trigger asChild>
                        <SmallTargetDateOpener selectedDate={formData.targetDate} />
                    </Popover.Trigger>
                    <Popover.Portal>
                        <TargetDatePickerContent
                            selectedDate={formData.targetDate}
                            onDateChange={(date) => onChange("targetDate", date)}
                        />
                    </Popover.Portal>
                </Popover.Root>
            </DropdownSection>
        </BodyContainer>
    );
}

export default CreateProjectModalBody;
