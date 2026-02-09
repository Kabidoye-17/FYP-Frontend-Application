import { useState } from "react";
import styled from "styled-components";
import Icon from "./Icon";

interface DatePickerProps {
    selectedDate: Date | null;
    onDateChange: (date: Date | null) => void;
    minDate?: Date;
    maxDate?: Date;
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 280px;
    user-select: none;
`;

const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem;
    margin-bottom: 0.5rem;
`;

const MonthYearLabel = styled.span`
    font-family: 'Inter', sans-serif;
    font-size: 0.9375rem;
    font-weight: 600;
    color: var(--text-primary);
`;

const NavButton = styled.button`
    all: unset;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.15s ease;

    &:hover {
        background-color: var(--page-background);
    }

    &:focus {
        outline: 2px solid var(--plum);
        outline-offset: 2px;
    }
`;

const WeekdaysRow = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    margin-bottom: 0.25rem;
`;

const WeekdayLabel = styled.span`
    font-family: 'Inter', sans-serif;
    font-size: 0.75rem;
    font-weight: 500;
    color: var(--text-secondary);
    text-align: center;
    padding: 0.25rem;
`;

const DaysGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 2px;
`;

const DayButton = styled.button<{
    $isSelected: boolean;
    $isToday: boolean;
    $isOutsideMonth: boolean;
}>`
    all: unset;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: 4px;
    cursor: pointer;
    font-family: 'Inter', sans-serif;
    font-size: 0.875rem;
    transition: background-color 0.15s ease;

    color: ${({ $isSelected, $isOutsideMonth }) =>
        $isSelected
            ? 'var(--white)'
            : $isOutsideMonth
                ? 'var(--text-secondary)'
                : 'var(--text-primary)'};

    background-color: ${({ $isSelected }) =>
        $isSelected ? 'var(--plum)' : 'transparent'};

    border: ${({ $isToday, $isSelected }) =>
        $isToday && !$isSelected ? '1px solid var(--plum)' : '1px solid transparent'};

    &:hover {
        background-color: ${({ $isSelected }) =>
            $isSelected ? 'var(--plum)' : 'var(--page-background)'};
    }

    &:focus {
        outline: 2px solid var(--plum);
        outline-offset: 2px;
    }
`;

const Footer = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 0.5rem;
    margin-top: 0.5rem;
    border-top: 1px solid var(--page-background);
`;

const FooterButton = styled.button`
    all: unset;
    font-family: 'Inter', sans-serif;
    font-size: 0.8125rem;
    font-weight: 500;
    color: var(--plum);
    cursor: pointer;
    padding: 0.375rem 0.75rem;
    border-radius: 4px;
    transition: background-color 0.15s ease;

    &:hover {
        background-color: var(--page-background);
    }

    &:focus {
        outline: 2px solid var(--plum);
        outline-offset: 2px;
    }
`;

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

function getDaysInMonth(year: number, month: number): number {
    return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number): number {
    return new Date(year, month, 1).getDay();
}

function isSameDay(date1: Date, date2: Date): boolean {
    return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
    );
}

function DatePicker({ selectedDate, onDateChange }: Readonly<DatePickerProps>) {
    const today = new Date();
    const [viewDate, setViewDate] = useState(() => {
        return selectedDate || today;
    });

    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();

    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = getFirstDayOfMonth(year, month);
    const daysInPrevMonth = getDaysInMonth(year, month - 1);

    const monthYearLabel = new Intl.DateTimeFormat('en-US', {
        month: 'long',
        year: 'numeric',
    }).format(viewDate);

    const handlePrevMonth = () => {
        setViewDate(new Date(year, month - 1, 1));
    };

    const handleNextMonth = () => {
        setViewDate(new Date(year, month + 1, 1));
    };

    const handleDayClick = (date: Date) => {
        onDateChange(date);
    };

    const handleTodayClick = () => {
        setViewDate(today);
        onDateChange(today);
    };

    const handleClearClick = () => {
        onDateChange(null);
    };

    const calendarDays: { date: Date; isOutsideMonth: boolean }[] = [];

    // Previous month days
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
        const day = daysInPrevMonth - i;
        calendarDays.push({
            date: new Date(year, month - 1, day),
            isOutsideMonth: true,
        });
    }

    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
        calendarDays.push({
            date: new Date(year, month, day),
            isOutsideMonth: false,
        });
    }

    // Next month days (fill to 42 cells for 6 rows)
    const remainingDays = 42 - calendarDays.length;
    for (let day = 1; day <= remainingDays; day++) {
        calendarDays.push({
            date: new Date(year, month + 1, day),
            isOutsideMonth: true,
        });
    }

    return (
        <Container>
            <Header>
                <NavButton onClick={handlePrevMonth} aria-label="Previous month">
                    <Icon name="CaretLeft" size={16} color="var(--text-primary)" />
                </NavButton>
                <MonthYearLabel>{monthYearLabel}</MonthYearLabel>
                <NavButton onClick={handleNextMonth} aria-label="Next month">
                    <Icon name="CaretRight" size={16} color="var(--text-primary)" />
                </NavButton>
            </Header>

            <WeekdaysRow>
                {WEEKDAYS.map((day) => (
                    <WeekdayLabel key={day}>{day}</WeekdayLabel>
                ))}
            </WeekdaysRow>

            <DaysGrid>
                {calendarDays.map(({ date, isOutsideMonth }, index) => {
                    const isSelected = selectedDate ? isSameDay(date, selectedDate) : false;
                    const isToday = isSameDay(date, today);

                    return (
                        <DayButton
                            key={index}
                            $isSelected={isSelected}
                            $isToday={isToday}
                            $isOutsideMonth={isOutsideMonth}
                            onClick={() => handleDayClick(date)}
                            type="button"
                            aria-label={date.toLocaleDateString()}
                        >
                            {date.getDate()}
                        </DayButton>
                    );
                })}
            </DaysGrid>

            <Footer>
                <FooterButton onClick={handleTodayClick} type="button">
                    Today
                </FooterButton>
                <FooterButton onClick={handleClearClick} type="button">
                    Clear
                </FooterButton>
            </Footer>
        </Container>
    );
}

export default DatePicker;
