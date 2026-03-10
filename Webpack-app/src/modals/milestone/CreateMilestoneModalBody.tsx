import styled from "styled-components";
import Input from "../../design_system/Input";
import Textarea from "../../design_system/Textarea";
import DatePicker from "../../design_system/DatePicker";
import type { MilestoneFormData } from "./CreateMilestoneModal";

interface CreateMilestoneModalBodyProps {
    formData: MilestoneFormData;
    onChange: (field: keyof MilestoneFormData, value: string | Date | null) => void;
}

const BodyContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    overflow-y: auto;
    flex: 1;
`;

const FormField = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;

const FieldLabel = styled.label`
    font-family: "Inter", sans-serif;
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--text-secondary);
    text-transform: uppercase;
    letter-spacing: 0.05em;
`;

function CreateMilestoneModalBody({
    formData,
    onChange,
}: Readonly<CreateMilestoneModalBodyProps>) {
    return (
        <BodyContainer>
            <FormField>
                <FieldLabel>Title</FieldLabel>
                <Input
                    type="text"
                    placeholder="e.g., v1.0 Release"
                    value={formData.title}
                    onChange={(e) => onChange("title", e.target.value)}
                />
            </FormField>

            <FormField>
                <FieldLabel>Due Date</FieldLabel>
                <DatePicker
                    selectedDate={formData.dueDate}
                    onDateChange={(date: Date | null) => onChange("dueDate", date)}
                />
            </FormField>

            <FormField>
                <FieldLabel>Description (Optional)</FieldLabel>
                <Textarea
                    placeholder="What's the goal of this milestone?"
                    value={formData.description}
                    onChange={(e) => onChange("description", e.target.value)}
                />
            </FormField>
        </BodyContainer>
    );
}

export default CreateMilestoneModalBody;
