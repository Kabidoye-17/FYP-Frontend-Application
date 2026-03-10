import styled from "styled-components";
import Icon from "../../../design_system/Icon";

interface SidebarSprintDatesFieldProps {
    startDate: string;
    endDate: string;
    onChange: (startDate: string, endDate: string) => void;
}

const DatesContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
`;

const DateRow = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;

const DateLabel = styled.span`
    font-family: "Inter", sans-serif;
    font-size: 0.75rem;
    color: var(--text-secondary);
    min-width: 40px;
`;

const DateValue = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-family: "Inter", sans-serif;
    font-size: 0.875rem;
    color: var(--text-primary);
`;

const DurationBadge = styled.div`
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    padding: 0.25rem 0.5rem;
    background-color: var(--section-background);
    border-radius: 4px;
    font-family: "Inter", sans-serif;
    font-size: 0.75rem;
    color: var(--text-secondary);
`;

function SidebarSprintDatesField({
    startDate,
    endDate,
}: SidebarSprintDatesFieldProps) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(days / 7);

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    };

    return (
        <DatesContainer>
            <DateRow>
                <DateLabel>Start</DateLabel>
                <DateValue>
                    <Icon name="Calendar" size={14} color="var(--text-secondary)" weight="regular" />
                    {formatDate(startDate)}
                </DateValue>
            </DateRow>
            <DateRow>
                <DateLabel>End</DateLabel>
                <DateValue>
                    <Icon name="Calendar" size={14} color="var(--text-secondary)" weight="regular" />
                    {formatDate(endDate)}
                </DateValue>
            </DateRow>
            <DurationBadge>
                <Icon name="Clock" size={12} color="var(--text-secondary)" weight="regular" />
                {weeks > 0 ? `${weeks} week${weeks > 1 ? "s" : ""}` : `${days} days`}
            </DurationBadge>
        </DatesContainer>
    );
}

export default SidebarSprintDatesField;
