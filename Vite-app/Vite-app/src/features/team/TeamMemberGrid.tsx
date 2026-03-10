import styled from "styled-components";
import TeamMemberCard, { type TeamMember } from "./TeamMemberCard";

interface TeamMemberGridProps {
    members: TeamMember[];
    onMemberClick?: (member: TeamMember) => void;
}

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 1rem;
`;

function TeamMemberGrid({ members, onMemberClick }: Readonly<TeamMemberGridProps>) {
    return (
        <Grid>
            {members.map((member) => (
                <TeamMemberCard
                    key={member.id}
                    member={member}
                    onClick={() => onMemberClick?.(member)}
                />
            ))}
        </Grid>
    );
}

export default TeamMemberGrid;
