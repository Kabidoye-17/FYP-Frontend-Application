import styled from "styled-components";
import Avatar from "../../design_system/Avatar";
import Icon from "../../design_system/Icon";
import type { TeamMember } from "./TeamMemberCard";

interface TeamMemberListItemProps {
    member: TeamMember;
    onClick?: () => void;
}

const Item = styled.button`
    display: flex;
    align-items: center;
    gap: 1rem;
    width: 100%;
    padding: 1rem;
    background-color: var(--white);
    border: 1px solid var(--border-color);
    border-radius: 10px;
    cursor: pointer;
    transition: background-color 0.15s ease;
    text-align: left;

    &:hover {
        background-color: var(--hover-background);
    }
`;

const Info = styled.div`
    flex: 1;
`;

const Name = styled.span`
    font-family: "Inter", sans-serif;
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--text-primary);
    display: block;
`;

const Role = styled.span`
    font-family: "Inter", sans-serif;
    font-size: 0.75rem;
    color: var(--text-secondary);
`;

const Stats = styled.div`
    display: flex;
    gap: 1rem;
`;

const Stat = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const StatValue = styled.span`
    font-family: "Inter", sans-serif;
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--text-primary);
`;

const StatLabel = styled.span`
    font-family: "Inter", sans-serif;
    font-size: 0.625rem;
    color: var(--text-tertiary);
`;

const ArrowWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: var(--section-background);
`;

function TeamMemberListItem({ member, onClick }: Readonly<TeamMemberListItemProps>) {
    return (
        <Item onClick={onClick} type="button">
            <Avatar size="medium" name={member.name} color={member.color} />
            <Info>
                <Name>{member.name}</Name>
                <Role>{member.role}</Role>
            </Info>
            <Stats>
                <Stat>
                    <StatValue>{member.stats.assigned}</StatValue>
                    <StatLabel>Assigned</StatLabel>
                </Stat>
                <Stat>
                    <StatValue>{member.stats.completed}</StatValue>
                    <StatLabel>Done</StatLabel>
                </Stat>
            </Stats>
            <ArrowWrapper>
                <Icon name="CaretRight" size={16} color="var(--text-secondary)" weight="regular" />
            </ArrowWrapper>
        </Item>
    );
}

export default TeamMemberListItem;
