import styled from "styled-components";
import Button from "../../design_system/Button";
import Icon from "../../design_system/Icon";

interface TeamPageHeaderProps {
    memberCount: number;
    onInvite: () => void;
}

const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.5rem;
    border-bottom: 1px solid var(--border-color);
`;

const TitleSection = styled.div`
    display: flex;
    align-items: center;
    gap: 0.75rem;
`;

const IconWrapper = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 10px;
    background-color: var(--success-light);
    display: flex;
    align-items: center;
    justify-content: center;
`;

const TitleContent = styled.div``;

const Title = styled.h1`
    font-family: "Inter", sans-serif;
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--text-primary);
    margin: 0;
`;

const Subtitle = styled.p`
    font-family: "Inter", sans-serif;
    font-size: 0.8125rem;
    color: var(--text-secondary);
    margin: 0.125rem 0 0 0;
`;

function TeamPageHeader({ memberCount, onInvite }: Readonly<TeamPageHeaderProps>) {
    return (
        <Header>
            <TitleSection>
                <IconWrapper>
                    <Icon name="Users" size={22} color="var(--success)" weight="fill" />
                </IconWrapper>
                <TitleContent>
                    <Title>Team</Title>
                    <Subtitle>{memberCount} member{memberCount !== 1 ? "s" : ""}</Subtitle>
                </TitleContent>
            </TitleSection>
            <Button
                icon={<Icon name="UserPlus" size={16} color="var(--white)" weight="regular" />}
                backgroundColor="var(--purple)"
                color="var(--white)"
                onClick={onInvite}
            >
                Invite
            </Button>
        </Header>
    );
}

export default TeamPageHeader;
