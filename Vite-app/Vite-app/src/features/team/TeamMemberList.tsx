import styled from "styled-components";
import TeamMemberListItem from "./TeamMemberListItem";
import type { TeamMember } from "./TeamMemberCard";

interface TeamMemberListProps {
    members: TeamMember[];
    onMemberClick?: (member: TeamMember) => void;
}

const List = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;

function TeamMemberList({ members, onMemberClick }: Readonly<TeamMemberListProps>) {
    return (
        <List>
            {members.map((member) => (
                <TeamMemberListItem
                    key={member.id}
                    member={member}
                    onClick={() => onMemberClick?.(member)}
                />
            ))}
        </List>
    );
}

export default TeamMemberList;
