import styled from "styled-components";
import CalendarMonthNavigation from "./CalendarMonthNavigation";
import Button from "../../design_system/Button";
import Icon from "../../design_system/Icon";

interface CalendarHeaderProps {
    currentDate: Date;
    onPreviousMonth: () => void;
    onNextMonth: () => void;
    onToday: () => void;
    onAddEvent: () => void;
}

const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 1.5rem;
    border-bottom: 1px solid var(--border-color);
    background-color: var(--white);
`;

const TitleSection = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
`;

const Title = styled.h2`
    font-family: "Inter", sans-serif;
    font-size: 1.125rem;
    font-weight: 600;
    color: var(--text-primary);
    margin: 0;
`;

function CalendarHeader({
    currentDate,
    onPreviousMonth,
    onNextMonth,
    onToday,
    onAddEvent,
}: Readonly<CalendarHeaderProps>) {
    return (
        <Header>
            <TitleSection>
                <Title>Calendar</Title>
                <CalendarMonthNavigation
                    currentDate={currentDate}
                    onPreviousMonth={onPreviousMonth}
                    onNextMonth={onNextMonth}
                    onToday={onToday}
                />
            </TitleSection>
            <Button
                icon={<Icon name="Plus" size={16} color="var(--white)" weight="bold" />}
                backgroundColor="var(--purple)"
                color="var(--white)"
                onClick={onAddEvent}
            >
                Add event
            </Button>
        </Header>
    );
}

export default CalendarHeader;
