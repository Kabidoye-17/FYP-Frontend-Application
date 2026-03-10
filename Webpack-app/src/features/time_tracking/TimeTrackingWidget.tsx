import styled from "styled-components";
import Icon from "../../design_system/Icon";
import ProgressBar from "../../design_system/ProgressBar";

interface TimeTrackingWidgetProps {
    estimate: number | null; // in hours
    logged: number; // in hours
    onOpenTimeLog: () => void;
}

const WidgetContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    padding: 1rem;
    background-color: var(--section-background);
    border-radius: 8px;
`;

const WidgetHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const HeaderTitle = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-family: "Inter", sans-serif;
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--text-secondary);
    text-transform: uppercase;
    letter-spacing: 0.05em;
`;

const LogButton = styled.button`
    display: flex;
    align-items: center;
    gap: 0.25rem;
    padding: 0.375rem 0.5rem;
    background-color: var(--white);
    border: 1px solid var(--section-background);
    border-radius: 4px;
    font-family: "Inter", sans-serif;
    font-size: 0.625rem;
    font-weight: 500;
    color: var(--plum);
    cursor: pointer;

    &:hover {
        background-color: var(--light-plum);
    }
`;

const TimeDisplay = styled.div`
    display: flex;
    align-items: baseline;
    gap: 0.25rem;
`;

const TimeValue = styled.span`
    font-family: "Inter", sans-serif;
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--text-primary);
`;

const TimeUnit = styled.span`
    font-family: "Inter", sans-serif;
    font-size: 0.875rem;
    color: var(--text-secondary);
`;

const EstimateText = styled.span`
    font-family: "Inter", sans-serif;
    font-size: 0.875rem;
    color: var(--text-secondary);
`;

const ProgressSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
`;

const ProgressLabel = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const ProgressText = styled.span`
    font-family: "Inter", sans-serif;
    font-size: 0.75rem;
    color: var(--text-secondary);
`;

const ProgressPercentage = styled.span<{ $isOverBudget: boolean }>`
    font-family: "Inter", sans-serif;
    font-size: 0.75rem;
    font-weight: 600;
    color: ${({ $isOverBudget }) => ($isOverBudget ? "var(--error-red)" : "var(--plum)")};
`;

function TimeTrackingWidget({
    estimate,
    logged,
    onOpenTimeLog,
}: TimeTrackingWidgetProps) {
    const formatTime = (hours: number) => {
        const h = Math.floor(hours);
        const m = Math.round((hours - h) * 60);
        if (h === 0) return { value: m, unit: "m" };
        if (m === 0) return { value: h, unit: "h" };
        return { value: `${h}h ${m}`, unit: "m" };
    };

    const loggedTime = formatTime(logged);
    const percentage = estimate ? Math.round((logged / estimate) * 100) : 0;
    const isOverBudget = estimate ? logged > estimate : false;

    return (
        <WidgetContainer>
            <WidgetHeader>
                <HeaderTitle>
                    <Icon name="Clock" size={14} color="var(--plum)" weight="fill" />
                    Time Tracking
                </HeaderTitle>
                <LogButton onClick={onOpenTimeLog}>
                    <Icon name="Plus" size={10} color="currentColor" weight="bold" />
                    Log
                </LogButton>
            </WidgetHeader>

            <TimeDisplay>
                <TimeValue>{loggedTime.value}</TimeValue>
                <TimeUnit>{loggedTime.unit}</TimeUnit>
                {estimate && (
                    <EstimateText>/ {estimate}h estimated</EstimateText>
                )}
            </TimeDisplay>

            {estimate && (
                <ProgressSection>
                    <ProgressLabel>
                        <ProgressText>Budget used</ProgressText>
                        <ProgressPercentage $isOverBudget={isOverBudget}>
                            {percentage}%{isOverBudget && " (over budget)"}
                        </ProgressPercentage>
                    </ProgressLabel>
                    <ProgressBar
                        value={Math.min(percentage, 100)}
                        size="small"
                        color={isOverBudget ? "var(--error-red)" : "var(--plum)"}
                    />
                </ProgressSection>
            )}
        </WidgetContainer>
    );
}

export default TimeTrackingWidget;
