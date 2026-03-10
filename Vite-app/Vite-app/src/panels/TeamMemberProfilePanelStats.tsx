import styled from "styled-components";

interface TeamMemberProfilePanelStatsProps {
    stats: {
        assigned: number;
        completed: number;
        inProgress: number;
    };
}

const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.75rem;
    padding: 1rem 1.25rem;
    border-bottom: 1px solid var(--border-color);
`;

const StatCard = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
    background-color: var(--section-background);
    border-radius: 10px;
`;

const StatValue = styled.span`
    font-family: "Inter", sans-serif;
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--text-primary);
`;

const StatLabel = styled.span`
    font-family: "Inter", sans-serif;
    font-size: 0.6875rem;
    color: var(--text-secondary);
    margin-top: 0.125rem;
`;

function TeamMemberProfilePanelStats({ stats }: Readonly<TeamMemberProfilePanelStatsProps>) {
    return (
        <Container>
            <StatCard>
                <StatValue>{stats.assigned}</StatValue>
                <StatLabel>Assigned</StatLabel>
            </StatCard>
            <StatCard>
                <StatValue>{stats.completed}</StatValue>
                <StatLabel>Completed</StatLabel>
            </StatCard>
            <StatCard>
                <StatValue>{stats.inProgress}</StatValue>
                <StatLabel>In Progress</StatLabel>
            </StatCard>
        </Container>
    );
}

export default TeamMemberProfilePanelStats;
