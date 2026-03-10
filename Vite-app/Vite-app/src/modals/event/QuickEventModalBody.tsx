import styled from "styled-components";
import { format } from "date-fns";
import Icon from "../../design_system/Icon";

interface QuickEventModalBodyProps {
    title: string;
    onTitleChange: (title: string) => void;
    date: Date;
    onDateChange: (date: Date) => void;
    type: "issue" | "milestone" | "sprint" | "meeting";
    onTypeChange: (type: "issue" | "milestone" | "sprint" | "meeting") => void;
}

const Body = styled.div`
    padding: 1rem 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const Field = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.375rem;
`;

const Label = styled.label`
    font-family: "Inter", sans-serif;
    font-size: 0.75rem;
    font-weight: 500;
    color: var(--text-secondary);
`;

const Input = styled.input`
    padding: 0.625rem 0.75rem;
    border: 1px solid var(--border-color);
    border-radius: 8px;
    font-family: "Inter", sans-serif;
    font-size: 0.875rem;
    color: var(--text-primary);
    transition: border-color 0.15s ease, box-shadow 0.15s ease;

    &:focus {
        outline: none;
        border-color: var(--purple);
        box-shadow: 0 0 0 3px var(--purple-light);
    }

    &::placeholder {
        color: var(--text-tertiary);
    }
`;

const Row = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
`;

const DateInput = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.625rem 0.75rem;
    border: 1px solid var(--border-color);
    border-radius: 8px;
    background-color: var(--white);
`;

const DateText = styled.span`
    font-family: "Inter", sans-serif;
    font-size: 0.875rem;
    color: var(--text-primary);
`;

const TypeSelect = styled.select`
    padding: 0.625rem 0.75rem;
    border: 1px solid var(--border-color);
    border-radius: 8px;
    font-family: "Inter", sans-serif;
    font-size: 0.875rem;
    color: var(--text-primary);
    background-color: var(--white);
    cursor: pointer;

    &:focus {
        outline: none;
        border-color: var(--purple);
        box-shadow: 0 0 0 3px var(--purple-light);
    }
`;

function QuickEventModalBody({
    title,
    onTitleChange,
    date,
    type,
    onTypeChange,
}: Readonly<QuickEventModalBodyProps>) {
    return (
        <Body>
            <Field>
                <Label htmlFor="event-title">Title</Label>
                <Input
                    id="event-title"
                    type="text"
                    value={title}
                    onChange={(e) => onTitleChange(e.target.value)}
                    placeholder="Enter event title..."
                    autoFocus
                />
            </Field>
            <Row>
                <Field>
                    <Label>Date</Label>
                    <DateInput>
                        <Icon name="Calendar" size={16} color="var(--text-secondary)" weight="regular" />
                        <DateText>{format(date, "MMM d, yyyy")}</DateText>
                    </DateInput>
                </Field>
                <Field>
                    <Label htmlFor="event-type">Type</Label>
                    <TypeSelect
                        id="event-type"
                        value={type}
                        onChange={(e) => onTypeChange(e.target.value as typeof type)}
                    >
                        <option value="issue">Issue</option>
                        <option value="milestone">Milestone</option>
                        <option value="sprint">Sprint</option>
                        <option value="meeting">Meeting</option>
                    </TypeSelect>
                </Field>
            </Row>
        </Body>
    );
}

export default QuickEventModalBody;
