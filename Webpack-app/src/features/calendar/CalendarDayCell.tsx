import styled from "styled-components";
import { isToday, isSameMonth, format } from "date-fns";
import type { CalendarEvent } from "./events/CalendarEventChip";
import CalendarEventList from "./events/CalendarEventList";

interface CalendarDayCellProps {
    date: Date;
    currentMonth: Date;
    events: CalendarEvent[];
    onClick?: () => void;
    onEventClick?: (event: CalendarEvent) => void;
}

const Cell = styled.button<{ $isToday: boolean; $isCurrentMonth: boolean }>`
    min-height: 100px;
    padding: 0.5rem;
    border: none;
    border-right: 1px solid var(--border-color);
    border-bottom: 1px solid var(--border-color);
    background-color: ${({ $isCurrentMonth }) =>
        $isCurrentMonth ? "var(--white)" : "var(--section-background)"};
    cursor: pointer;
    text-align: left;
    vertical-align: top;
    transition: background-color 0.15s ease;

    &:hover {
        background-color: var(--hover-background);
    }

    &:nth-child(7n) {
        border-right: none;
    }
`;

const DayNumber = styled.span<{ $isToday: boolean; $isCurrentMonth: boolean }>`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 26px;
    height: 26px;
    font-family: "Inter", sans-serif;
    font-size: 0.8125rem;
    font-weight: ${({ $isToday }) => ($isToday ? 600 : 400)};
    color: ${({ $isCurrentMonth, $isToday }) =>
        $isToday
            ? "var(--white)"
            : $isCurrentMonth
            ? "var(--text-primary)"
            : "var(--text-tertiary)"};
    background-color: ${({ $isToday }) => ($isToday ? "var(--purple)" : "transparent")};
    border-radius: 50%;
`;

const EventsContainer = styled.div`
    margin-top: 0.25rem;
`;

function CalendarDayCell({
    date,
    currentMonth,
    events,
    onClick,
    onEventClick,
}: Readonly<CalendarDayCellProps>) {
    const dayIsToday = isToday(date);
    const dayIsCurrentMonth = isSameMonth(date, currentMonth);

    return (
        <Cell
            $isToday={dayIsToday}
            $isCurrentMonth={dayIsCurrentMonth}
            onClick={onClick}
            type="button"
        >
            <DayNumber $isToday={dayIsToday} $isCurrentMonth={dayIsCurrentMonth}>
                {format(date, "d")}
            </DayNumber>
            {events.length > 0 && (
                <EventsContainer>
                    <CalendarEventList events={events} maxVisible={2} onEventClick={onEventClick} />
                </EventsContainer>
            )}
        </Cell>
    );
}

export default CalendarDayCell;
