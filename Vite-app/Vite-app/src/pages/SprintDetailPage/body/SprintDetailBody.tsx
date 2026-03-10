import styled from "styled-components";
import SprintProgressBar from "./SprintProgressBar";
import SprintBurndownChart from "./SprintBurndownChart";
import type { SprintDetail } from "../SprintDetailPage";

interface SprintDetailBodyProps {
    sprint: SprintDetail;
    onNameChange: (name: string) => void;
    onGoalChange: (goal: string) => void;
}

const BodyContainer = styled.div`
    flex: 1;
    padding: 1.5rem;
    overflow-y: auto;
`;

const SprintTitle = styled.input`
    font-family: "Inter", sans-serif;
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--text-primary);
    border: none;
    background: transparent;
    width: 100%;
    padding: 0;
    margin-bottom: 0.5rem;

    &:focus {
        outline: none;
    }

    &::placeholder {
        color: var(--text-secondary);
    }
`;

const SprintGoal = styled.textarea`
    font-family: "Inter", sans-serif;
    font-size: 0.875rem;
    color: var(--text-secondary);
    border: none;
    background: transparent;
    width: 100%;
    resize: none;
    padding: 0;
    margin-bottom: 1.5rem;

    &:focus {
        outline: none;
    }

    &::placeholder {
        color: var(--text-secondary);
    }
`;

const Section = styled.section`
    margin-bottom: 2rem;
`;

const SectionTitle = styled.h3`
    font-family: "Inter", sans-serif;
    font-size: 0.75rem;
    font-weight: 700;
    color: var(--plum);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 1rem;
`;

const IssueList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;

const IssueItem = styled.div`
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem;
    background-color: var(--section-background);
    border-radius: 8px;
`;

const IssueStatus = styled.div<{ $status: string }>`
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: ${({ $status }) => {
        switch ($status) {
            case "done":
                return "var(--success-green)";
            case "in progress":
                return "var(--plum)";
            case "todo":
                return "var(--tan)";
            default:
                return "var(--text-secondary)";
        }
    }};
`;

const IssueTitle = styled.span`
    flex: 1;
    font-family: "Inter", sans-serif;
    font-size: 0.875rem;
    color: var(--text-primary);
`;

const StoryPoints = styled.span`
    font-family: "Inter", sans-serif;
    font-size: 0.75rem;
    color: var(--text-secondary);
    background-color: var(--white);
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
`;

function SprintDetailBody({
    sprint,
    onNameChange,
    onGoalChange,
}: SprintDetailBodyProps) {
    const totalPoints = sprint.issues.reduce((sum, issue) => sum + issue.storyPoints, 0);
    const completedPoints = sprint.issues
        .filter((issue) => issue.status === "done")
        .reduce((sum, issue) => sum + issue.storyPoints, 0);

    return (
        <BodyContainer>
            <SprintTitle
                value={sprint.name}
                onChange={(e) => onNameChange(e.target.value)}
                placeholder="Sprint name"
            />
            <SprintGoal
                value={sprint.goal}
                onChange={(e) => onGoalChange(e.target.value)}
                placeholder="Sprint goal..."
                rows={2}
            />

            <Section>
                <SectionTitle>Progress</SectionTitle>
                <SprintProgressBar
                    completedPoints={completedPoints}
                    totalPoints={totalPoints}
                    issuesByStatus={{
                        done: sprint.issues.filter((i) => i.status === "done").length,
                        inProgress: sprint.issues.filter((i) => i.status === "in progress").length,
                        todo: sprint.issues.filter((i) => i.status === "todo").length,
                        backlog: sprint.issues.filter((i) => i.status === "backlog").length,
                    }}
                />
            </Section>

            <Section>
                <SectionTitle>Burndown</SectionTitle>
                <SprintBurndownChart
                    startDate={sprint.startDate}
                    endDate={sprint.endDate}
                    totalPoints={totalPoints}
                />
            </Section>

            <Section>
                <SectionTitle>Issues ({sprint.issues.length})</SectionTitle>
                <IssueList>
                    {sprint.issues.map((issue) => (
                        <IssueItem key={issue.id}>
                            <IssueStatus $status={issue.status} />
                            <IssueTitle>{issue.title}</IssueTitle>
                            <StoryPoints>{issue.storyPoints} pts</StoryPoints>
                        </IssueItem>
                    ))}
                </IssueList>
            </Section>
        </BodyContainer>
    );
}

export default SprintDetailBody;
