import styled from "styled-components";
import Avatar from "../design_system/Avatar";
import Icon from "../design_system/Icon";
import type { TeamMember } from "../features/team/TeamMemberCard";

interface TeamMemberProfilePanelContentProps {
    member: TeamMember;
}

const Container = styled.div`
    padding: 1.5rem 1.25rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    border-bottom: 1px solid var(--border-color);
`;

const Name = styled.h2`
    font-family: "Inter", sans-serif;
    font-size: 1.125rem;
    font-weight: 600;
    color: var(--text-primary);
    margin: 0;
`;

const Role = styled.span`
    font-family: "Inter", sans-serif;
    font-size: 0.875rem;
    color: var(--text-secondary);
`;

const InfoList = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    margin-top: 0.5rem;
`;

const InfoItem = styled.div`
    display: flex;
    align-items: center;
    gap: 0.75rem;
`;

const InfoText = styled.span`
    font-family: "Inter", sans-serif;
    font-size: 0.8125rem;
    color: var(--text-primary);
`;

function TeamMemberProfilePanelContent({ member }: Readonly<TeamMemberProfilePanelContentProps>) {
    return (
        <Container>
            <Avatar size="large" name={member.name} color={member.color} />
            <div style={{ textAlign: "center" }}>
                <Name>{member.name}</Name>
                <Role>{member.role}</Role>
            </div>
            <InfoList>
                <InfoItem>
                    <Icon name="Envelope" size={16} color="var(--text-secondary)" weight="regular" />
                    <InfoText>{member.email}</InfoText>
                </InfoItem>
            </InfoList>
        </Container>
    );
}

export default TeamMemberProfilePanelContent;
