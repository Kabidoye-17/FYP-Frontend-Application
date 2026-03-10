import styled from "styled-components";
import { format } from "date-fns";
import Button from "../../design_system/Button";
import Icon from "../../design_system/Icon";

interface CalendarMonthNavigationProps {
    currentDate: Date;
    onPreviousMonth: () => void;
    onNextMonth: () => void;
    onToday: () => void;
}

const Container = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;

const MonthLabel = styled.span`
    font-family: "Inter", sans-serif;
    font-size: 1rem;
    font-weight: 600;
    color: var(--text-primary);
    min-width: 160px;
    text-align: center;
`;

const NavButtons = styled.div`
    display: flex;
    gap: 0.25rem;
`;

function CalendarMonthNavigation({
    currentDate,
    onPreviousMonth,
    onNextMonth,
    onToday,
}: Readonly<CalendarMonthNavigationProps>) {
    return (
        <Container>
            <Button
                backgroundColor="var(--white)"
                color="var(--text-primary)"
                onClick={onToday}
            >
                Today
            </Button>
            <NavButtons>
                <Button
                    icon={<Icon name="CaretLeft" size={18} color="var(--text-primary)" weight="regular" />}
                    IconOnly
                    backgroundColor="var(--white)"
                    onClick={onPreviousMonth}
                />
                <Button
                    icon={<Icon name="CaretRight" size={18} color="var(--text-primary)" weight="regular" />}
                    IconOnly
                    backgroundColor="var(--white)"
                    onClick={onNextMonth}
                />
            </NavButtons>
            <MonthLabel>{format(currentDate, "MMMM yyyy")}</MonthLabel>
        </Container>
    );
}

export default CalendarMonthNavigation;
