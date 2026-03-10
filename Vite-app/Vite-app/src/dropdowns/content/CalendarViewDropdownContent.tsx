import styled from "styled-components";
import * as Dropdown from "../../design_system/Dropdown";
import Icon from "../../design_system/Icon";
import type * as PhosphorIcons from "@phosphor-icons/react";

type IconName = keyof typeof PhosphorIcons;

interface CalendarViewDropdownContentProps {
    value: "month" | "week" | "day";
    onValueChange: (value: "month" | "week" | "day") => void;
}

const ItemContent = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;

const ItemLabel = styled.span`
    font-family: "Inter", sans-serif;
    font-size: 0.8125rem;
    color: var(--text-primary);
`;

const VIEWS = [
    { value: "month" as const, label: "Month view", icon: "CalendarBlank" as IconName },
    { value: "week" as const, label: "Week view", icon: "Columns" as IconName },
    { value: "day" as const, label: "Day view", icon: "CalendarCheck" as IconName },
];

function CalendarViewDropdownContent({
    value,
    onValueChange,
}: Readonly<CalendarViewDropdownContentProps>) {
    return (
        <Dropdown.Content sideOffset={5} align="start">
            {VIEWS.map((view) => (
                <Dropdown.Item
                    key={view.value}
                    onSelect={() => onValueChange(view.value)}
                >
                    <ItemContent>
                        <Icon
                            name={view.icon}
                            size={16}
                            color={value === view.value ? "var(--purple)" : "var(--text-secondary)"}
                            weight="regular"
                        />
                        <ItemLabel>{view.label}</ItemLabel>
                        {value === view.value && (
                            <Icon name="Check" size={14} color="var(--purple)" weight="bold" />
                        )}
                    </ItemContent>
                </Dropdown.Item>
            ))}
        </Dropdown.Content>
    );
}

export default CalendarViewDropdownContent;
