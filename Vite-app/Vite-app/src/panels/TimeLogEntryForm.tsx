import styled from "styled-components";
import { useState } from "react";
import Input from "../design_system/Input";
import Icon from "../design_system/Icon";

interface TimeLogEntryFormProps {
    onSubmit: (description: string, duration: number) => void;
    onCancel: () => void;
}

const FormContainer = styled.div`
    padding: 1rem;
    border-bottom: 1px solid var(--section-background);
    background-color: var(--section-background);
`;

const FormField = styled.div`
    margin-bottom: 0.75rem;

    &:last-of-type {
        margin-bottom: 1rem;
    }
`;

const FieldLabel = styled.label`
    display: block;
    font-family: "Inter", sans-serif;
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--text-secondary);
    margin-bottom: 0.375rem;
`;

const DurationInputs = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;

const DurationInput = styled.input`
    width: 70px;
    padding: 0.5rem;
    border: 1px solid var(--section-background);
    border-radius: 6px;
    font-family: "Inter", sans-serif;
    font-size: 0.875rem;
    text-align: center;
    background-color: var(--white);

    &:focus {
        outline: 2px solid var(--plum);
        outline-offset: -1px;
    }
`;

const DurationLabel = styled.span`
    font-family: "Inter", sans-serif;
    font-size: 0.75rem;
    color: var(--text-secondary);
`;

const ButtonGroup = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
`;

const CancelButton = styled.button`
    padding: 0.5rem 0.75rem;
    background: transparent;
    border: none;
    border-radius: 6px;
    font-family: "Inter", sans-serif;
    font-size: 0.75rem;
    color: var(--text-secondary);
    cursor: pointer;

    &:hover {
        background-color: var(--white);
    }
`;

const SubmitButton = styled.button`
    display: flex;
    align-items: center;
    gap: 0.25rem;
    padding: 0.5rem 0.75rem;
    background-color: var(--plum);
    color: var(--white);
    border: none;
    border-radius: 6px;
    font-family: "Inter", sans-serif;
    font-size: 0.75rem;
    font-weight: 500;
    cursor: pointer;

    &:hover {
        opacity: 0.9;
    }

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;

function TimeLogEntryForm({ onSubmit, onCancel }: TimeLogEntryFormProps) {
    const [description, setDescription] = useState("");
    const [hours, setHours] = useState("");
    const [minutes, setMinutes] = useState("");

    const handleSubmit = () => {
        const totalMinutes = (parseInt(hours) || 0) * 60 + (parseInt(minutes) || 0);
        if (description.trim() && totalMinutes > 0) {
            onSubmit(description.trim(), totalMinutes);
        }
    };

    const isValid = description.trim() && (parseInt(hours) || 0) + (parseInt(minutes) || 0) > 0;

    return (
        <FormContainer>
            <FormField>
                <FieldLabel>Description</FieldLabel>
                <Input
                    type="text"
                    placeholder="What did you work on?"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </FormField>
            <FormField>
                <FieldLabel>Duration</FieldLabel>
                <DurationInputs>
                    <DurationInput
                        type="number"
                        min="0"
                        placeholder="0"
                        value={hours}
                        onChange={(e) => setHours(e.target.value)}
                    />
                    <DurationLabel>hours</DurationLabel>
                    <DurationInput
                        type="number"
                        min="0"
                        max="59"
                        placeholder="0"
                        value={minutes}
                        onChange={(e) => setMinutes(e.target.value)}
                    />
                    <DurationLabel>minutes</DurationLabel>
                </DurationInputs>
            </FormField>
            <ButtonGroup>
                <CancelButton onClick={onCancel}>Cancel</CancelButton>
                <SubmitButton onClick={handleSubmit} disabled={!isValid}>
                    <Icon name="Plus" size={14} color="currentColor" weight="bold" />
                    Log Time
                </SubmitButton>
            </ButtonGroup>
        </FormContainer>
    );
}

export default TimeLogEntryForm;
