import styled from "styled-components";

export interface CalendarEvent {
    id: string;
    title: string;
    date: Date;
    type: "issue" | "milestone" | "sprint" | "meeting";
    color?: string;
}

interface CalendarEventChipProps {
    event: CalendarEvent;
    onClick?: () => void;
}

const Chip = styled.button<{ $color: string }>`
    display: flex;
    align-items: center;
    gap: 0.25rem;
    width: 100%;
    padding: 0.125rem 0.375rem;
    border: none;
    border-radius: 4px;
    background-color: ${({ $color }) => $color};
    cursor: pointer;
    text-align: left;
    transition: opacity 0.15s ease;

    &:hover {
        opacity: 0.85;
    }
`;

const ColorDot = styled.div<{ $color: string }>`
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: ${({ $color }) => $color};
    flex-shrink: 0;
`;

const Title = styled.span`
    font-family: "Inter", sans-serif;
    font-size: 0.6875rem;
    font-weight: 500;
    color: var(--text-primary);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const TYPE_COLORS: Record<CalendarEvent["type"], { bg: string; dot: string }> = {
    issue: { bg: "var(--purple-light)", dot: "var(--purple)" },
    milestone: { bg: "var(--success-light)", dot: "var(--success)" },
    sprint: { bg: "var(--blue-light)", dot: "var(--blue)" },
    meeting: { bg: "var(--yellow-light)", dot: "var(--yellow)" },
};

function CalendarEventChip({ event, onClick }: Readonly<CalendarEventChipProps>) {
    const colors = TYPE_COLORS[event.type] ?? TYPE_COLORS.issue;

    return (
        <Chip $color={colors.bg} onClick={onClick} type="button">
            <ColorDot $color={colors.dot} />
            <Title>{event.title}</Title>
        </Chip>
    );
}

export default CalendarEventChip;
