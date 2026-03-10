import styled from "styled-components";

interface WorkloadCapacityBarProps {
    assigned: number;
    capacity: number;
}

const BarContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 0.75rem;
    flex: 1;
`;

const BarTrack = styled.div`
    flex: 1;
    height: 8px;
    background-color: var(--section-background);
    border-radius: 4px;
    overflow: hidden;
    position: relative;
`;

const BarFill = styled.div<{ $percentage: number; $status: "under" | "at" | "over" }>`
    height: 100%;
    width: ${({ $percentage }) => `${Math.min(100, $percentage)}%`};
    background-color: ${({ $status }) => {
        switch ($status) {
            case "over":
                return "var(--error-red)";
            case "at":
                return "var(--warning-orange)";
            default:
                return "var(--success-green)";
        }
    }};
    border-radius: 4px;
    transition: width 0.3s ease;
`;

const CapacityMarker = styled.div`
    position: absolute;
    right: 0;
    top: -2px;
    bottom: -2px;
    width: 2px;
    background-color: var(--text-primary);
    opacity: 0.3;
`;

const CapacityLabel = styled.div<{ $status: "under" | "at" | "over" }>`
    display: flex;
    align-items: center;
    gap: 0.25rem;
    min-width: 100px;
    font-family: "Inter", sans-serif;
    font-size: 0.75rem;
    color: ${({ $status }) => {
        switch ($status) {
            case "over":
                return "var(--error-red)";
            case "at":
                return "var(--warning-orange)";
            default:
                return "var(--text-secondary)";
        }
    }};
`;

const PointsValue = styled.span`
    font-weight: 600;
    color: var(--text-primary);
`;

function WorkloadCapacityBar({ assigned, capacity }: WorkloadCapacityBarProps) {
    const percentage = capacity > 0 ? (assigned / capacity) * 100 : 0;

    const getStatus = (): "under" | "at" | "over" => {
        if (percentage >= 100) return "over";
        if (percentage >= 80) return "at";
        return "under";
    };

    const status = getStatus();

    return (
        <BarContainer>
            <BarTrack>
                <BarFill $percentage={percentage} $status={status} />
                <CapacityMarker />
            </BarTrack>
            <CapacityLabel $status={status}>
                <PointsValue>{assigned}</PointsValue>
                <span>/ {capacity} pts</span>
            </CapacityLabel>
        </BarContainer>
    );
}

export default WorkloadCapacityBar;
