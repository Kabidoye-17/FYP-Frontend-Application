import styled from "styled-components";
import Button from "../design_system/Button";
import Icon from "../design_system/Icon";

interface TeamMemberProfilePanelHeaderProps {
    onClose: () => void;
}

const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 1.25rem;
    border-bottom: 1px solid var(--border-color);
`;

const Title = styled.h3`
    font-family: "Inter", sans-serif;
    font-size: 1rem;
    font-weight: 600;
    color: var(--text-primary);
    margin: 0;
`;

function TeamMemberProfilePanelHeader({ onClose }: Readonly<TeamMemberProfilePanelHeaderProps>) {
    return (
        <Header>
            <Title>Team Member</Title>
            <Button
                icon={<Icon name="X" size={18} color="var(--text-secondary)" weight="regular" />}
                IconOnly
                backgroundColor="transparent"
                onClick={onClose}
            />
        </Header>
    );
}

export default TeamMemberProfilePanelHeader;
