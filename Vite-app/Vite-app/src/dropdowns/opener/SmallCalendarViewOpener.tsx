import styled from "styled-components";
import Icon from "../../design_system/Icon";
import type * as PhosphorIcons from "@phosphor-icons/react";

type IconName = keyof typeof PhosphorIcons;

interface SmallCalendarViewOpenerProps {
    value: "month" | "week" | "day";
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

const VIEW_ICONS: Record<"month" | "week" | "day", IconName> = {
    month: "CalendarBlank",
    week: "Columns",
    day: "CalendarCheck",
};

function SmallCalendarViewOpener({ value, onClick }: Readonly<SmallCalendarViewOpenerProps>) {
    return (
        <StyledButton onClick={onClick} type="button">
            <Icon name={VIEW_ICONS[value]} size={16} color="var(--text-secondary)" weight="regular" />
            <Label>{value}</Label>
            <Icon name="CaretDown" size={14} color="var(--text-secondary)" weight="regular" />
        </StyledButton>
    );
}

export default SmallCalendarViewOpener;
