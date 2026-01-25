import styled from "styled-components";
import * as Dialog from "@radix-ui/react-dialog";
import Icon from "../../design_system/Icon";

const HeaderContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 1rem 0.5rem 1rem;
    border-bottom: 1px solid var(--section-background);
`;

const Title = styled(Dialog.Title)`
    font-family: 'Inter', sans-serif;
    font-size: 1.25rem;
    font-weight: 800;
    color: var(--text-primary);
    margin: 0;
`;

const CloseButton = styled.button`
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;

    &:hover {
        background-color: var(--section-background);
    }
`;

interface CreateIssueModalHeaderProps {
    onClose: () => void;
}

function CreateIssueModalHeader({ onClose }: Readonly<CreateIssueModalHeaderProps>) {
    return (
        <HeaderContainer>
            <Title>New Issue</Title>
            <CloseButton onClick={onClose}>
                <Icon name="X" size={20} color="var(--text-secondary)" weight="regular" />
            </CloseButton>
        </HeaderContainer>
    );
}

export default CreateIssueModalHeader;
