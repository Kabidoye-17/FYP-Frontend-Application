import styled from "styled-components";
import TeamMemberCardHeader from "./TeamMemberCardHeader";
import TeamMemberCardStats from "./TeamMemberCardStats";

export interface TeamMember {
    id: string;
    name: string;
    email: string;
    role: string;
    color: string;
    avatarUrl?: string;
    stats: {
        assigned: number;
        completed: number;
        inProgress: number;
    };
}

interface TeamMemberCardProps {
    member: TeamMember;
    onClick?: () => void;
}

const Card = styled.button`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1.5rem;
    background-color: var(--white);
    border: 1px solid var(--border-color);
    border-radius: 12px;
    cursor: pointer;
    transition: box-shadow 0.2s ease, transform 0.2s ease;
    text-align: left;
    width: 100%;

    &:hover {
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        transform: translateY(-2px);
    }
`;

function TeamMemberCard({ member, onClick }: Readonly<TeamMemberCardProps>) {
    const stats = [
        { label: "Assigned", value: member.stats.assigned },
        { label: "Completed", value: member.stats.completed },
        { label: "In Progress", value: member.stats.inProgress },
    ];

    return (
        <Card onClick={onClick} type="button">
            <TeamMemberCardHeader
                name={member.name}
                role={member.role}
                color={member.color}
                avatarUrl={member.avatarUrl}
            />
            <TeamMemberCardStats stats={stats} />
        </Card>
    );
}

export default TeamMemberCard;
