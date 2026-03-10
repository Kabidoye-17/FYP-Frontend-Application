import styled from "styled-components";
import ProgressBar from "../../design_system/ProgressBar";

interface MilestoneCardBodyProps {
    description: string;
    progress: number;
}

const BodyContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
`;

const Description = styled.p`
    font-family: "Inter", sans-serif;
    font-size: 0.875rem;
    color: var(--text-secondary);
    margin: 0;
    line-height: 1.5;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
`;

const ProgressContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
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

const ProgressPercentage = styled.span`
    font-family: "Inter", sans-serif;
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--plum);
`;

function MilestoneCardBody({ description, progress }: MilestoneCardBodyProps) {
    return (
        <BodyContainer>
            <Description>{description}</Description>
            <ProgressContainer>
                <ProgressLabel>
                    <ProgressText>Progress</ProgressText>
                    <ProgressPercentage>{progress}%</ProgressPercentage>
                </ProgressLabel>
                <ProgressBar
                    value={progress}
                    size="small"
                    color={progress === 100 ? "var(--success-green)" : "var(--plum)"}
                />
            </ProgressContainer>
        </BodyContainer>
    );
}

export default MilestoneCardBody;
