import styled from "styled-components";
import * as Dialog from "@radix-ui/react-dialog";
import Button from "../../design_system/Button";
import Icon from "../../design_system/Icon";

interface InviteTeamMemberModalHeaderProps {
    onClose: () => void;
}

const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 1.25rem;
    border-bottom: 1px solid var(--border-color);
`;

const TitleWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;

const IconWrapper = styled.div`
    width: 32px;
    height: 32px;
    border-radius: 8px;
    background-color: var(--purple-light);
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Title = styled(Dialog.Title)`
    font-family: "Inter", sans-serif;
    font-size: 1rem;
    font-weight: 600;
    color: var(--text-primary);
    margin: 0;
`;

function InviteTeamMemberModalHeader({ onClose }: Readonly<InviteTeamMemberModalHeaderProps>) {
    return (
        <Header>
            <TitleWrapper>
                <IconWrapper>
                    <Icon name="UserPlus" size={18} color="var(--purple)" weight="regular" />
                </IconWrapper>
                <Title>Invite Team Member</Title>
            </TitleWrapper>
            <Dialog.Close asChild>
                <Button
                    icon={<Icon name="X" size={18} color="var(--text-secondary)" weight="regular" />}
                    IconOnly
                    backgroundColor="transparent"
                    onClick={onClose}
                />
            </Dialog.Close>
        </Header>
    );
}

export default InviteTeamMemberModalHeader;
