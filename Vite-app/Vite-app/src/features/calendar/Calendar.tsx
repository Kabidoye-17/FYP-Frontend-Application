import { useState } from "react";
import styled from "styled-components";
import { addMonths, subMonths, startOfToday } from "date-fns";
import CalendarHeader from "./CalendarHeader";
import CalendarWeekRow from "./CalendarWeekRow";
import CalendarGrid from "./CalendarGrid";
import type { CalendarEvent } from "./events/CalendarEventChip";

interface CalendarProps {
    events?: CalendarEvent[];
    onAddEvent?: (date?: Date) => void;
    onEventClick?: (event: CalendarEvent) => void;
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    background-color: var(--white);
    border-radius: 12px;
    border: 1px solid var(--border-color);
    overflow: hidden;
`;

const CalendarContent = styled.div`
    flex: 1;
    overflow-y: auto;
`;

function Calendar({ events = [], onAddEvent, onEventClick }: Readonly<CalendarProps>) {
    const [currentDate, setCurrentDate] = useState(startOfToday());

    const handlePreviousMonth = () => {
        setCurrentDate((prev) => subMonths(prev, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate((prev) => addMonths(prev, 1));
    };

    const handleToday = () => {
        setCurrentDate(startOfToday());
    };

    const handleDayClick = (date: Date) => {
        onAddEvent?.(date);
    };

    return (
        <Container>
            <CalendarHeader
                currentDate={currentDate}
                onPreviousMonth={handlePreviousMonth}
                onNextMonth={handleNextMonth}
                onToday={handleToday}
                onAddEvent={() => onAddEvent?.()}
            />
            <CalendarContent>
                <CalendarWeekRow />
                <CalendarGrid
                    currentDate={currentDate}
                    events={events}
                    onDayClick={handleDayClick}
                    onEventClick={onEventClick}
                />
            </CalendarContent>
        </Container>
    );
}

export default Calendar;
