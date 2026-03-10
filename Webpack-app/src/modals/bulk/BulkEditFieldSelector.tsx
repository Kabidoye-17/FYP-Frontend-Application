import styled from "styled-components";
import Icon from "../../design_system/Icon";
import type * as PhosphorIcons from "@phosphor-icons/react";

type IconName = keyof typeof PhosphorIcons;

interface BulkEditField {
    id: string;
    label: string;
    icon: string;
}

interface BulkEditFieldSelectorProps {
    fields: BulkEditField[];
    selectedFields: string[];
    onToggleField: (fieldId: string) => void;
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;

const Label = styled.span`
    font-family: "Inter", sans-serif;
    font-size: 0.75rem;
    font-weight: 500;
    color: var(--text-secondary);
`;

const FieldGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.5rem;
`;

const FieldButton = styled.button<{ $selected: boolean }>`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.625rem 0.75rem;
    border: 1px solid
        ${({ $selected }) => ($selected ? "var(--purple)" : "var(--border-color)")};
    border-radius: 8px;
    background-color: ${({ $selected }) =>
        $selected ? "var(--purple-light)" : "var(--white)"};
    cursor: pointer;
    transition: all 0.15s ease;

    &:hover {
        border-color: var(--purple);
    }
`;

const FieldLabel = styled.span`
    font-family: "Inter", sans-serif;
    font-size: 0.8125rem;
    color: var(--text-primary);
`;

const CheckMark = styled.div<{ $visible: boolean }>`
    margin-left: auto;
    opacity: ${({ $visible }) => ($visible ? 1 : 0)};
`;

function BulkEditFieldSelector({
    fields,
    selectedFields,
    onToggleField,
}: Readonly<BulkEditFieldSelectorProps>) {
    return (
        <Container>
            <Label>Select fields to edit</Label>
            <FieldGrid>
                {fields.map((field) => {
                    const isSelected = selectedFields.includes(field.id);
                    return (
                        <FieldButton
                            key={field.id}
                            type="button"
                            $selected={isSelected}
                            onClick={() => onToggleField(field.id)}
                        >
                            <Icon
                                name={field.icon as IconName}
                                size={16}
                                color={isSelected ? "var(--purple)" : "var(--text-secondary)"}
                                weight="regular"
                            />
                            <FieldLabel>{field.label}</FieldLabel>
                            <CheckMark $visible={isSelected}>
                                <Icon name="Check" size={14} color="var(--purple)" weight="bold" />
                            </CheckMark>
                        </FieldButton>
                    );
                })}
            </FieldGrid>
        </Container>
    );
}

export default BulkEditFieldSelector;
