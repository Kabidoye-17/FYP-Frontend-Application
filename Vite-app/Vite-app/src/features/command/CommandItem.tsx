import styled from "styled-components";
import { Command } from "cmdk";
import type { ReactNode } from "react";

interface CommandItemProps {
    value: string;
    onSelect: () => void;
    icon?: ReactNode;
    label: string;
    shortcut?: string[];
    disabled?: boolean;
}

const StyledItem = styled(Command.Item)`
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.625rem 1rem;
    cursor: pointer;
    border-radius: 8px;
    margin: 0 0.5rem;
    transition: background-color 0.1s ease;

    &[data-selected="true"] {
        background-color: var(--hover-background);
    }

    &[data-disabled="true"] {
        opacity: 0.5;
        cursor: not-allowed;
    }

    &:hover:not([data-disabled="true"]) {
        background-color: var(--hover-background);
    }
`;

const IconWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    color: var(--text-secondary);
`;

const Label = styled.span`
    flex: 1;
    font-family: "Inter", sans-serif;
    font-size: 0.875rem;
    color: var(--text-primary);
`;

const ShortcutWrapper = styled.div`
    display: flex;
    gap: 0.25rem;
`;

const ShortcutKey = styled.kbd`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 22px;
    height: 22px;
    padding: 0 0.375rem;
    font-family: "SF Mono", Monaco, Consolas, monospace;
    font-size: 0.6875rem;
    font-weight: 500;
    color: var(--text-secondary);
    background-color: var(--section-background);
    border: 1px solid var(--border-color);
    border-radius: 4px;
`;

function CommandItem({
    value,
    onSelect,
    icon,
    label,
    shortcut,
    disabled = false,
}: Readonly<CommandItemProps>) {
    return (
        <StyledItem value={value} onSelect={onSelect} disabled={disabled}>
            {icon && <IconWrapper>{icon}</IconWrapper>}
            <Label>{label}</Label>
            {shortcut && (
                <ShortcutWrapper>
                    {shortcut.map((key) => (
                        <ShortcutKey key={key}>{key}</ShortcutKey>
                    ))}
                </ShortcutWrapper>
            )}
        </StyledItem>
    );
}

export default CommandItem;
