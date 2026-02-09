import styled from "styled-components";
import * as Popover from "../../design_system/Popover";
import DatePicker from "../../design_system/DatePicker";

const StyledContent = styled(Popover.Content)`
    z-index: 250;
    background-color: var(--white);
    padding: 0.75rem;
`;

interface TargetDatePickerContentProps {
    selectedDate: Date | null;
    onDateChange: (date: Date | null) => void;
}

function TargetDatePickerContent({ selectedDate, onDateChange }: Readonly<TargetDatePickerContentProps>) {
    return (
        <StyledContent sideOffset={5} align="start">
            <DatePicker
                selectedDate={selectedDate}
                onDateChange={onDateChange}
            />
        </StyledContent>
    );
}

export default TargetDatePickerContent;
