import * as Dropdown from "../../design_system/Dropdown";
import Icon from "../../design_system/Icon";
import styled from "styled-components";
import type { TimeframeOption } from "../../pages/RoadmapPage";

const DropdownContent = styled(Dropdown.Content)`
    z-index: 250;
    background-color: var(--white);
`;

const TimeframeItem = styled(Dropdown.Item)`
    position: relative;
    padding-right: 2rem;
`;

const ItemContent = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;

const CheckContainer = styled.div`
    position: absolute;
    right: 0.75rem;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const TimeframeLabel = styled.span`
    text-transform: capitalize;
`;

interface TimeframeDropdownContentProps {
    currentTimeframe: TimeframeOption;
    onTimeframeChange: (timeframe: TimeframeOption) => void;
}

const timeframes: { value: TimeframeOption; label: string; icon: string }[] = [
    { value: "month", label: "Monthly", icon: "CalendarBlank" },
    { value: "quarter", label: "Quarterly", icon: "Calendar" },
    { value: "year", label: "Yearly", icon: "CalendarDots" },
];

function TimeframeDropdownContent({
    currentTimeframe,
    onTimeframeChange,
}: Readonly<TimeframeDropdownContentProps>) {
    return (
        <DropdownContent sideOffset={5} align="end">
            {timeframes.map((timeframe) => {
                const isSelected = timeframe.value === currentTimeframe;

                return (
                    <TimeframeItem
                        key={timeframe.value}
                        onSelect={() => onTimeframeChange(timeframe.value)}
                    >
                        <ItemContent>
                            <Icon
                                name={timeframe.icon as any}
                                size={16}
                                color="var(--text-secondary)"
                                weight="regular"
                            />
                            <TimeframeLabel>{timeframe.label}</TimeframeLabel>
                        </ItemContent>
                        {isSelected && (
                            <CheckContainer>
                                <Icon
                                    name="Check"
                                    size={16}
                                    color="var(--plum)"
                                    weight="bold"
                                />
                            </CheckContainer>
                        )}
                    </TimeframeItem>
                );
            })}
        </DropdownContent>
    );
}

export default TimeframeDropdownContent;
