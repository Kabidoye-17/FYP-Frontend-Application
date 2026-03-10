import styled from "styled-components";
import {
    startOfMonth,
    endOfMonth,
    startOfWeek,
    endOfWeek,
    eachDayOfInterval,
    isSameDay,
} from "date-fns";
import CalendarDayCell from "./CalendarDayCell";
import type { CalendarEvent } from "./events/CalendarEventChip";

interface CalendarGridProps {
    currentDate: Date;
    events: CalendarEvent[];
    onDayClick?: (date: Date) => void;
    onEventClick?: (event: CalendarEvent) => void;
}

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
`;

function CalendarGrid({
    currentDate,
    events,
    onDayClick,
    onEventClick,
}: Readonly<CalendarGridProps>) {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const calendarStart = startOfWeek(monthStart);
    const calendarEnd = endOfWeek(monthEnd);

    const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

    const getEventsForDay = (date: Date) =>
        events.filter((event) => isSameDay(event.date, date));

    return (
        <Grid>
            {days.map((day) => (
                <CalendarDayCell
                    key={day.toISOString()}
                    date={day}
                    currentMonth={currentDate}
                    events={getEventsForDay(day)}
                    onClick={() => onDayClick?.(day)}
                    onEventClick={onEventClick}
                />
            ))}
        </Grid>
    );
}

export default CalendarGrid;
