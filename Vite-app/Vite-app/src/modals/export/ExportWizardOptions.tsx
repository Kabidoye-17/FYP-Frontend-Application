import styled from "styled-components";
import Icon from "../../design_system/Icon";
import type * as PhosphorIcons from "@phosphor-icons/react";

type IconName = keyof typeof PhosphorIcons;

interface ExportField {
    id: string;
    label: string;
    icon: string;
}

interface ExportWizardOptionsProps {
    fields: ExportField[];
    selectedFields: string[];
    onToggleField: (fieldId: string) => void;
    onSelectAll: () => void;
    onDeselectAll: () => void;
}

const Container = styled.div``;

const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.75rem;
`;

const Label = styled.span`
    font-family: "Inter", sans-serif;
    font-size: 0.8125rem;
    font-weight: 500;
    color: var(--text-primary);
`;

const QuickActions = styled.div`
    display: flex;
    gap: 0.5rem;
`;

const QuickAction = styled.button`
    border: none;
    background: none;
    padding: 0;
    font-family: "Inter", sans-serif;
    font-size: 0.75rem;
    color: var(--purple);
    cursor: pointer;

    &:hover {
        text-decoration: underline;
    }
`;

const FieldsList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.375rem;
    max-height: 250px;
    overflow-y: auto;
`;

const FieldItem = styled.label`
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.5rem 0.75rem;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.1s ease;

    &:hover {
        background-color: var(--hover-background);
    }
`;

const Checkbox = styled.input`
    width: 16px;
    height: 16px;
    cursor: pointer;
    accent-color: var(--purple);
`;

const FieldLabel = styled.span`
    font-family: "Inter", sans-serif;
    font-size: 0.8125rem;
    color: var(--text-primary);
`;

function ExportWizardOptions({
    fields,
    selectedFields,
    onToggleField,
    onSelectAll,
    onDeselectAll,
}: Readonly<ExportWizardOptionsProps>) {
    return (
        <Container>
            <Header>
                <Label>Fields to export</Label>
                <QuickActions>
                    <QuickAction type="button" onClick={onSelectAll}>
                        Select all
                    </QuickAction>
                    <QuickAction type="button" onClick={onDeselectAll}>
                        Clear
                    </QuickAction>
                </QuickActions>
            </Header>
            <FieldsList>
                {fields.map((field) => (
                    <FieldItem key={field.id}>
                        <Checkbox
                            type="checkbox"
                            checked={selectedFields.includes(field.id)}
                            onChange={() => onToggleField(field.id)}
                        />
                        <Icon name={field.icon as IconName} size={16} color="var(--text-secondary)" weight="regular" />
                        <FieldLabel>{field.label}</FieldLabel>
                    </FieldItem>
                ))}
            </FieldsList>
        </Container>
    );
}

export default ExportWizardOptions;
