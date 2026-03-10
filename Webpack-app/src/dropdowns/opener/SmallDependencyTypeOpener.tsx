import styled from "styled-components";
import Icon from "../../design_system/Icon";
import type * as PhosphorIcons from "@phosphor-icons/react";

type IconName = keyof typeof PhosphorIcons;
type DependencyType = "blocks" | "blocked-by" | "relates-to" | "duplicates";

interface SmallDependencyTypeOpenerProps {
    value: DependencyType;
    onClick?: () => void;
}

const StyledButton = styled.button`
    display: flex;
    align-items: center;
    gap: 0.375rem;
    padding: 0.375rem 0.625rem;
    border: 1px solid var(--border-color);
    border-radius: 6px;
    background-color: var(--white);
    cursor: pointer;
    transition: background-color 0.15s ease, border-color 0.15s ease;

    &:hover {
        background-color: var(--hover-background);
        border-color: var(--text-tertiary);
    }
`;

const Label = styled.span`
    font-family: "Inter", sans-serif;
    font-size: 0.8125rem;
    font-weight: 500;
    color: var(--text-primary);
    text-transform: capitalize;
`;

const TYPE_CONFIG: Record<DependencyType, { icon: IconName; color: string }> = {
    blocks: { icon: "Prohibit", color: "var(--error)" },
    "blocked-by": { icon: "Warning", color: "var(--warning)" },
    "relates-to": { icon: "Link", color: "var(--blue)" },
    duplicates: { icon: "Copy", color: "var(--text-secondary)" },
};

function SmallDependencyTypeOpener({ value, onClick }: Readonly<SmallDependencyTypeOpenerProps>) {
    const config = TYPE_CONFIG[value];

    return (
        <StyledButton onClick={onClick} type="button">
            <Icon name={config.icon} size={16} color={config.color} weight="regular" />
            <Label>{value.replace("-", " ")}</Label>
            <Icon name="CaretDown" size={14} color="var(--text-secondary)" weight="regular" />
        </StyledButton>
    );
}

export default SmallDependencyTypeOpener;
