import styled from "styled-components";

const WeekRow = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    border-bottom: 1px solid var(--border-color);
`;

const DayLabel = styled.div`
    padding: 0.75rem;
    font-family: "Inter", sans-serif;
    font-size: 0.6875rem;
    font-weight: 600;
    color: var(--text-secondary);
    text-transform: uppercase;
    text-align: center;
    background-color: var(--section-background);
`;

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function CalendarWeekRow() {
    return (
        <WeekRow>
            {WEEKDAYS.map((day) => (
                <DayLabel key={day}>{day}</DayLabel>
            ))}
        </WeekRow>
    );
}

export default CalendarWeekRow;
