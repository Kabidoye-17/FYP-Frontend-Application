import styled from "styled-components";

interface Stat {
    label: string;
    value: number;
}

interface TeamMemberCardStatsProps {
    stats: Stat[];
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    gap: 1.5rem;
    padding-top: 0.75rem;
    border-top: 1px solid var(--border-color);
`;

const StatItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.125rem;
`;

const StatValue = styled.span`
    font-family: "Inter", sans-serif;
    font-size: 1rem;
    font-weight: 600;
    color: var(--text-primary);
`;

const StatLabel = styled.span`
    font-family: "Inter", sans-serif;
    font-size: 0.6875rem;
    color: var(--text-secondary);
`;

function TeamMemberCardStats({ stats }: Readonly<TeamMemberCardStatsProps>) {
    return (
        <Container>
            {stats.map((stat) => (
                <StatItem key={stat.label}>
                    <StatValue>{stat.value}</StatValue>
                    <StatLabel>{stat.label}</StatLabel>
                </StatItem>
            ))}
        </Container>
    );
}

export default TeamMemberCardStats;
