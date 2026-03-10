import styled from "styled-components";
import Input from "../../design_system/Input";
import Textarea from "../../design_system/Textarea";
import DatePicker from "../../design_system/DatePicker";
import type { SprintFormData } from "./CreateSprintModal";

interface CreateSprintModalBodyProps {
    formData: SprintFormData;
    onChange: (field: keyof SprintFormData, value: string | Date | null) => void;
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

const DateRow = styled.div`
    display: flex;
    gap: 1rem;

    & > * {
        flex: 1;
    }
`;

function CreateSprintModalBody({
    formData,
    onChange,
}: Readonly<CreateSprintModalBodyProps>) {
    return (
        <BodyContainer>
            <FormField>
                <FieldLabel>Sprint Name</FieldLabel>
                <Input
                    type="text"
                    placeholder="e.g., Sprint 24 - Q1 Features"
                    value={formData.name}
                    onChange={(e) => onChange("name", e.target.value)}
                />
            </FormField>

            <DateRow>
                <FormField>
                    <FieldLabel>Start Date</FieldLabel>
                    <DatePicker
                        selectedDate={formData.startDate}
                        onDateChange={(date: Date | null) => onChange("startDate", date)}
                    />
                </FormField>
                <FormField>
                    <FieldLabel>End Date</FieldLabel>
                    <DatePicker
                        selectedDate={formData.endDate}
                        onDateChange={(date: Date | null) => onChange("endDate", date)}
                    />
                </FormField>
            </DateRow>

            <FormField>
                <FieldLabel>Sprint Goal (Optional)</FieldLabel>
                <Textarea
                    placeholder="What's the main objective for this sprint?"
                    value={formData.goal}
                    onChange={(e) => onChange("goal", e.target.value)}
                />
            </FormField>
        </BodyContainer>
    );
}

export default CreateSprintModalBody;
