import styled from "styled-components";
import * as Dropdown from "../../design_system/Dropdown";
import Icon from "../../design_system/Icon";
import type * as PhosphorIcons from "@phosphor-icons/react";

type IconName = keyof typeof PhosphorIcons;
type DependencyType = "blocks" | "blocked-by" | "relates-to" | "duplicates";

interface DependencyTypeDropdownContentProps {
    value: DependencyType;
    onValueChange: (value: DependencyType) => void;
}

const ItemContent = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex: 1;
`;

const ItemLabel = styled.span`
    font-family: "Inter", sans-serif;
    font-size: 0.8125rem;
    color: var(--text-primary);
    flex: 1;
`;

const TYPE_OPTIONS = [
    {
        value: "blocks" as const,
        label: "Blocks",
        icon: "Prohibit" as IconName,
        color: "var(--error)",
        description: "This issue blocks another",
    },
    {
        value: "blocked-by" as const,
        label: "Blocked by",
        icon: "Warning" as IconName,
        color: "var(--warning)",
        description: "This issue is blocked by another",
    },
    {
        value: "relates-to" as const,
        label: "Relates to",
        icon: "Link" as IconName,
        color: "var(--blue)",
        description: "Issues are related",
    },
    {
        value: "duplicates" as const,
        label: "Duplicates",
        icon: "Copy" as IconName,
        color: "var(--text-secondary)",
        description: "This is a duplicate of another",
    },
];

function DependencyTypeDropdownContent({
    value,
    onValueChange,
}: Readonly<DependencyTypeDropdownContentProps>) {
    return (
        <Dropdown.Content sideOffset={5} align="start">
            {TYPE_OPTIONS.map((option) => (
                <Dropdown.Item key={option.value} onSelect={() => onValueChange(option.value)}>
                    <ItemContent>
                        <Icon name={option.icon} size={16} color={option.color} weight="regular" />
                        <ItemLabel>{option.label}</ItemLabel>
                        {value === option.value && (
                            <Icon name="Check" size={14} color="var(--purple)" weight="bold" />
                        )}
                    </ItemContent>
                </Dropdown.Item>
            ))}
        </Dropdown.Content>
    );
}

export default DependencyTypeDropdownContent;
