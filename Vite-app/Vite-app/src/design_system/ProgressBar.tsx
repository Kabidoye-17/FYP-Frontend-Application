import styled from "styled-components";

interface ProgressBarProps {
    value: number;
    max?: number;
    size?: "small" | "medium" | "large";
    color?: string;
    showLabel?: boolean;
    label?: string;
}

const ProgressContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    width: 100%;
`;

const ProgressLabel = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family: "Inter", sans-serif;
    font-size: 0.75rem;
    color: var(--text-secondary);
`;

const ProgressTrack = styled.div<{ $size: "small" | "medium" | "large" }>`
    width: 100%;
    background-color: var(--section-background);
    border-radius: 999px;
    overflow: hidden;
    height: ${({ $size }) => {
        switch ($size) {
            case "small":
                return "4px";
            case "large":
                return "12px";
            default:
                return "8px";
        }
    }};
`;

const ProgressFill = styled.div<{ $percentage: number; $color: string }>`
    height: 100%;
    width: ${({ $percentage }) => `${Math.min(100, Math.max(0, $percentage))}%`};
    background-color: ${({ $color }) => $color};
    border-radius: 999px;
    transition: width 0.3s ease;
`;

function ProgressBar({
    value,
    max = 100,
    size = "medium",
    color = "var(--plum)",
    showLabel = false,
    label,
}: Readonly<ProgressBarProps>) {
    const percentage = max > 0 ? (value / max) * 100 : 0;

    return (
        <ProgressContainer>
            {showLabel && (
                <ProgressLabel>
                    <span>{label}</span>
                    <span>{Math.round(percentage)}%</span>
                </ProgressLabel>
            )}
            <ProgressTrack $size={size}>
                <ProgressFill $percentage={percentage} $color={color} />
            </ProgressTrack>
        </ProgressContainer>
    );
}

export default ProgressBar;
