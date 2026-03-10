import styled from "styled-components";
import Icon from "../../design_system/Icon";
import type { FilterCondition } from "./FilterBar";

interface FilterChipProps {
    filter: FilterCondition;
    onRemove: () => void;
}

const ChipContainer = styled.div`
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
    padding: 0.375rem 0.5rem;
    background-color: var(--light-plum);
    border-radius: 6px;
    font-family: "Inter", sans-serif;
    font-size: 0.75rem;
`;

const FieldName = styled.span`
    color: var(--text-secondary);
`;

const Operator = styled.span`
    color: var(--plum);
    font-weight: 500;
`;

const Value = styled.span`
    color: var(--text-primary);
    font-weight: 500;
`;

const RemoveButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
    padding: 0;
    background: transparent;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    color: var(--text-secondary);
    margin-left: 0.125rem;

    &:hover {
        background-color: var(--plum);
        color: var(--white);
    }
`;

const operatorLabels: Record<string, string> = {
    equals: "is",
    not_equals: "is not",
    contains: "contains",
    not_contains: "doesn't contain",
    greater_than: ">",
    less_than: "<",
    is_empty: "is empty",
    is_not_empty: "is not empty",
};

function FilterChip({ filter, onRemove }: FilterChipProps) {
    return (
        <ChipContainer>
            <FieldName>{filter.field}</FieldName>
            <Operator>{operatorLabels[filter.operator] || filter.operator}</Operator>
            {filter.value && <Value>{filter.value}</Value>}
            <RemoveButton onClick={onRemove}>
                <Icon name="X" size={10} color="currentColor" weight="bold" />
            </RemoveButton>
        </ChipContainer>
    );
}

export default FilterChip;
