import styled from "styled-components";
import { useState } from "react";
import * as Dropdown from "../../design_system/Dropdown";
import * as Popover from "../../design_system/Popover";
import SmallStatusOpener from "../../dropdowns/opener/SmallStatusOpener";
import StatusDropdownContent from "../../dropdowns/content/StatusDropdownContent";
import SmallPriorityOpener from "../../dropdowns/opener/SmallPriorityOpener";
import PriorityDropdownContent from "../../dropdowns/content/PriorityDropdownContent";
import SmallAssigneeOpener from "../../dropdowns/opener/SmallAssigneeOpener";
import AssigneeDropdownContent from "../../dropdowns/content/AssigneeDropdownContent";
import SmallProjectOpener from "../../dropdowns/opener/SmallProjectOpener";
import ProjectDropdownContent from "../../dropdowns/content/ProjectDropdownContent";
import SmallLabelsOpener from "../../dropdowns/opener/SmallLabelsOpener";
import LabelsDropdownContent from "../../dropdowns/content/LabelsDropdownContent";
import SmallTargetDateOpener from "../../dropdowns/opener/SmallTargetDateOpener";
import TargetDatePickerContent from "../../dropdowns/content/TargetDatePickerContent";
import { mockAssignees } from "../../utils/assigneeData";
import { mockProjects } from "../../utils/projectData";
import { mockLabels, type Label } from "../../utils/labelData";
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

const HeadingInput = styled.input`
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

const BodyTextarea = styled.textarea`
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


interface IssueFormData {
    heading: string;
    body: string;
    status: StatusLevel;
    priority: PriorityLevel;
    assignees: string[];
    projectId: string | null;
    labels: string[];
    targetDate: Date | null;
}

interface CreateIssueModalBodyProps {
    formData: IssueFormData;
    onChange: (field: keyof IssueFormData, value: string | string[] | Date | null) => void;
}

function CreateIssueModalBody({ formData, onChange }: Readonly<CreateIssueModalBodyProps>) {
    const [labels, setLabels] = useState<Label[]>(mockLabels);

    return (
        <BodyContainer>
            <HeadingInput
                type="text"
                placeholder="Issue Title"
                value={formData.heading}
                onChange={(e) => onChange("heading", e.target.value)}
            />
            <Divider />
            <BodyTextarea
                placeholder="Description"
                value={formData.body}
                onChange={(e) => onChange("body", e.target.value)}
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
                        <SmallAssigneeOpener
                            selectedAssignees={mockAssignees.filter((a) =>
                                formData.assignees.includes(a.id)
                            )}
                        />
                    </Dropdown.Trigger>
                    <Dropdown.Portal>
                        <AssigneeDropdownContent
                            assignees={mockAssignees}
                            selectedAssignees={formData.assignees}
                            onAssigneeChange={(ids) => onChange("assignees", ids)}
                        />
                    </Dropdown.Portal>
                </Dropdown.Root>
                <Dropdown.Root>
                    <Dropdown.Trigger asChild>
                        <SmallProjectOpener
                            selectedProject={mockProjects.find((p) => p.id === formData.projectId) || null}
                        />
                    </Dropdown.Trigger>
                    <Dropdown.Portal>
                        <ProjectDropdownContent
                            projects={mockProjects}
                            selectedProjectId={formData.projectId}
                            onProjectChange={(id) => onChange("projectId", id)}
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
                            onLabelsUpdate={setLabels}
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

export default CreateIssueModalBody;
