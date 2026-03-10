import styled from "styled-components";

interface FilterBuilderModalBodyProps {
    field: string;
    operator: string;
    value: string;
    onFieldChange: (field: string) => void;
    onOperatorChange: (operator: string) => void;
    onValueChange: (value: string) => void;
}

const BodyContainer = styled.div`
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
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

const Select = styled.select`
    padding: 0.625rem 0.75rem;
    border: 1px solid var(--section-background);
    border-radius: 6px;
    font-family: "Inter", sans-serif;
    font-size: 0.875rem;
    color: var(--text-primary);
    background-color: var(--white);
    cursor: pointer;

    &:focus {
        outline: 2px solid var(--plum);
        outline-offset: -1px;
    }
`;

const Input = styled.input`
    padding: 0.625rem 0.75rem;
    border: 1px solid var(--section-background);
    border-radius: 6px;
    font-family: "Inter", sans-serif;
    font-size: 0.875rem;
    color: var(--text-primary);

    &:focus {
        outline: 2px solid var(--plum);
        outline-offset: -1px;
    }

    &::placeholder {
        color: var(--text-secondary);
    }
`;

const fields = [
    { value: "status", label: "Status" },
    { value: "priority", label: "Priority" },
    { value: "assignee", label: "Assignee" },
    { value: "label", label: "Label" },
    { value: "project", label: "Project" },
    { value: "sprint", label: "Sprint" },
    { value: "due_date", label: "Due Date" },
    { value: "created_date", label: "Created Date" },
];

const operators: Record<string, { value: string; label: string }[]> = {
    default: [
        { value: "equals", label: "is" },
        { value: "not_equals", label: "is not" },
        { value: "is_empty", label: "is empty" },
        { value: "is_not_empty", label: "is not empty" },
    ],
    text: [
        { value: "equals", label: "is" },
        { value: "not_equals", label: "is not" },
        { value: "contains", label: "contains" },
        { value: "not_contains", label: "doesn't contain" },
        { value: "is_empty", label: "is empty" },
        { value: "is_not_empty", label: "is not empty" },
    ],
    date: [
        { value: "equals", label: "is" },
        { value: "greater_than", label: "is after" },
        { value: "less_than", label: "is before" },
        { value: "is_empty", label: "is empty" },
        { value: "is_not_empty", label: "is not empty" },
    ],
};

function FilterBuilderModalBody({
    field,
    operator,
    value,
    onFieldChange,
    onOperatorChange,
    onValueChange,
}: FilterBuilderModalBodyProps) {
    const getOperators = () => {
        if (field === "due_date" || field === "created_date") {
            return operators.date;
        }
        if (field === "assignee" || field === "label") {
            return operators.text;
        }
        return operators.default;
    };

    const needsValue = operator && operator !== "is_empty" && operator !== "is_not_empty";

    return (
        <BodyContainer>
            <FormField>
                <FieldLabel>Field</FieldLabel>
                <Select
                    value={field}
                    onChange={(e) => {
                        onFieldChange(e.target.value);
                        onOperatorChange("");
                        onValueChange("");
                    }}
                >
                    <option value="">Select a field...</option>
                    {fields.map((f) => (
                        <option key={f.value} value={f.value}>
                            {f.label}
                        </option>
                    ))}
                </Select>
            </FormField>

            {field && (
                <FormField>
                    <FieldLabel>Condition</FieldLabel>
                    <Select
                        value={operator}
                        onChange={(e) => onOperatorChange(e.target.value)}
                    >
                        <option value="">Select a condition...</option>
                        {getOperators().map((op) => (
                            <option key={op.value} value={op.value}>
                                {op.label}
                            </option>
                        ))}
                    </Select>
                </FormField>
            )}

            {needsValue && (
                <FormField>
                    <FieldLabel>Value</FieldLabel>
                    <Input
                        type={
                            field === "due_date" || field === "created_date"
                                ? "date"
                                : "text"
                        }
                        placeholder="Enter value..."
                        value={value}
                        onChange={(e) => onValueChange(e.target.value)}
                    />
                </FormField>
            )}
        </BodyContainer>
    );
}

export default FilterBuilderModalBody;
