import styled from "styled-components";

interface SprintProgressBarProps {
    completedPoints: number;
    totalPoints: number;
    issuesByStatus: {
        done: number;
        inProgress: number;
        todo: number;
        backlog: number;
    };
}

const ProgressContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const ProgressHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const ProgressStats = styled.div`
    display: flex;
    align-items: baseline;
    gap: 0.25rem;
`;

const ProgressValue = styled.span`
    font-family: "Inter", sans-serif;
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--text-primary);
`;

const ProgressTotal = styled.span`
    font-family: "Inter", sans-serif;
    font-size: 0.875rem;
    color: var(--text-secondary);
`;

const ProgressPercentage = styled.span`
    font-family: "Inter", sans-serif;
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--plum);
`;

const ProgressTrack = styled.div`
    display: flex;
    height: 12px;
    background-color: var(--section-background);
    border-radius: 6px;
    overflow: hidden;
`;

const ProgressSegment = styled.div<{ $width: number; $color: string }>`
    width: ${({ $width }) => `${$width}%`};
    background-color: ${({ $color }) => $color};
    transition: width 0.3s ease;
`;

const StatusLegend = styled.div`
    display: flex;
    gap: 1.5rem;
    flex-wrap: wrap;
`;

const StatusItem = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;

const StatusDot = styled.div<{ $color: string }>`
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: ${({ $color }) => $color};
`;

const StatusLabel = styled.span`
    font-family: "Inter", sans-serif;
    font-size: 0.75rem;
    color: var(--text-secondary);
`;

const StatusCount = styled.span`
    font-family: "Inter", sans-serif;
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--text-primary);
`;

function SprintProgressBar({
    completedPoints,
    totalPoints,
    issuesByStatus,
}: SprintProgressBarProps) {
    const percentage = totalPoints > 0 ? Math.round((completedPoints / totalPoints) * 100) : 0;
    const total =
        issuesByStatus.done +
        issuesByStatus.inProgress +
        issuesByStatus.todo +
        issuesByStatus.backlog;

    const getWidth = (count: number) => (total > 0 ? (count / total) * 100 : 0);

    return (
        <ProgressContainer>
            <ProgressHeader>
                <ProgressStats>
                    <ProgressValue>{completedPoints}</ProgressValue>
                    <ProgressTotal>/ {totalPoints} points</ProgressTotal>
                </ProgressStats>
                <ProgressPercentage>{percentage}% complete</ProgressPercentage>
            </ProgressHeader>

            <ProgressTrack>
                <ProgressSegment $width={getWidth(issuesByStatus.done)} $color="var(--success-green)" />
                <ProgressSegment $width={getWidth(issuesByStatus.inProgress)} $color="var(--plum)" />
                <ProgressSegment $width={getWidth(issuesByStatus.todo)} $color="var(--tan)" />
                <ProgressSegment $width={getWidth(issuesByStatus.backlog)} $color="var(--text-secondary)" />
            </ProgressTrack>

            <StatusLegend>
                <StatusItem>
                    <StatusDot $color="var(--success-green)" />
                    <StatusLabel>Done</StatusLabel>
                    <StatusCount>{issuesByStatus.done}</StatusCount>
                </StatusItem>
                <StatusItem>
                    <StatusDot $color="var(--plum)" />
                    <StatusLabel>In Progress</StatusLabel>
                    <StatusCount>{issuesByStatus.inProgress}</StatusCount>
                </StatusItem>
                <StatusItem>
                    <StatusDot $color="var(--tan)" />
                    <StatusLabel>To Do</StatusLabel>
                    <StatusCount>{issuesByStatus.todo}</StatusCount>
                </StatusItem>
                <StatusItem>
                    <StatusDot $color="var(--text-secondary)" />
                    <StatusLabel>Backlog</StatusLabel>
                    <StatusCount>{issuesByStatus.backlog}</StatusCount>
                </StatusItem>
            </StatusLegend>
        </ProgressContainer>
    );
}

export default SprintProgressBar;
