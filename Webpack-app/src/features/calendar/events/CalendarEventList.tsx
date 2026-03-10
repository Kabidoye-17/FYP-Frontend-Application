import styled from "styled-components";
import type { CalendarEvent } from "./CalendarEventChip";
import CalendarEventChip from "./CalendarEventChip";
import CalendarEventPopover from "./CalendarEventPopover";

interface CalendarEventListProps {
    events: CalendarEvent[];
    maxVisible?: number;
    onEventClick?: (event: CalendarEvent) => void;
}

const List = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.125rem;
`;

const MoreButton = styled.button`
    border: none;
    background: transparent;
    padding: 0.125rem 0.375rem;
    font-family: "Inter", sans-serif;
    font-size: 0.6875rem;
    font-weight: 500;
    color: var(--text-secondary);
    cursor: pointer;
    text-align: left;

    &:hover {
        color: var(--purple);
    }
`;

function CalendarEventList({
    events,
    maxVisible = 3,
    onEventClick,
}: Readonly<CalendarEventListProps>) {
    const visibleEvents = events.slice(0, maxVisible);
    const remainingCount = events.length - maxVisible;

    return (
        <List>
            {visibleEvents.map((event) => (
                <CalendarEventPopover key={event.id} event={event}>
                    <div>
                        <CalendarEventChip
                            event={event}
                            onClick={() => onEventClick?.(event)}
                        />
                    </div>
                </CalendarEventPopover>
            ))}
            {remainingCount > 0 && (
                <MoreButton type="button">+{remainingCount} more</MoreButton>
            )}
        </List>
    );
}

export default CalendarEventList;
