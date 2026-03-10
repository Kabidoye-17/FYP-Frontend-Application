import styled from "styled-components";
import Avatar from "../../design_system/Avatar";

interface TeamMemberCardHeaderProps {
    name: string;
    role: string;
    color: string;
    avatarUrl?: string;
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
`;

const Name = styled.h3`
    font-family: "Inter", sans-serif;
    font-size: 0.9375rem;
    font-weight: 600;
    color: var(--text-primary);
    margin: 0;
`;

const Role = styled.span`
    font-family: "Inter", sans-serif;
    font-size: 0.8125rem;
    color: var(--text-secondary);
`;

function TeamMemberCardHeader({
    name,
    role,
    color,
}: Readonly<TeamMemberCardHeaderProps>) {
    return (
        <Container>
            <Avatar size="large" name={name} color={color} />
            <div style={{ textAlign: "center" }}>
                <Name>{name}</Name>
                <Role>{role}</Role>
            </div>
        </Container>
    );
}

export default TeamMemberCardHeader;
