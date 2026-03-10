import styled from "styled-components";
import Button from "../design_system/Button";
import Icon from "../design_system/Icon";

interface AttachmentsPanelHeaderProps {
    count: number;
    onClose: () => void;
    onUpload: () => void;
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

const Title = styled.h3`
    font-family: "Inter", sans-serif;
    font-size: 1rem;
    font-weight: 600;
    color: var(--text-primary);
    margin: 0;
`;

const Count = styled.span`
    font-family: "Inter", sans-serif;
    font-size: 0.75rem;
    font-weight: 500;
    color: var(--text-secondary);
    background-color: var(--section-background);
    padding: 0.125rem 0.5rem;
    border-radius: 10px;
`;

const Actions = styled.div`
    display: flex;
    gap: 0.25rem;
`;

function AttachmentsPanelHeader({
    count,
    onClose,
    onUpload,
}: Readonly<AttachmentsPanelHeaderProps>) {
    return (
        <Header>
            <TitleWrapper>
                <Title>Attachments</Title>
                <Count>{count}</Count>
            </TitleWrapper>
            <Actions>
                <Button
                    icon={<Icon name="Upload" size={16} color="var(--text-primary)" weight="regular" />}
                    IconOnly
                    backgroundColor="transparent"
                    onClick={onUpload}
                />
                <Button
                    icon={<Icon name="X" size={18} color="var(--text-secondary)" weight="regular" />}
                    IconOnly
                    backgroundColor="transparent"
                    onClick={onClose}
                />
            </Actions>
        </Header>
    );
}

export default AttachmentsPanelHeader;
