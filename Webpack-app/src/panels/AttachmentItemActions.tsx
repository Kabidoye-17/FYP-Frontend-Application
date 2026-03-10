import styled from "styled-components";
import Button from "../design_system/Button";
import Icon from "../design_system/Icon";

interface AttachmentItemActionsProps {
    onPreview: () => void;
    onDownload: () => void;
    onDelete: () => void;
}

const Container = styled.div`
    display: flex;
    gap: 0.25rem;
    opacity: 0;
    transition: opacity 0.15s ease;

    .attachment-item:hover & {
        opacity: 1;
    }
`;

function AttachmentItemActions({
    onPreview,
    onDownload,
    onDelete,
}: Readonly<AttachmentItemActionsProps>) {
    return (
        <Container>
            <Button
                icon={<Icon name="Eye" size={14} color="var(--text-secondary)" weight="regular" />}
                IconOnly
                backgroundColor="transparent"
                onClick={onPreview}
            />
            <Button
                icon={<Icon name="DownloadSimple" size={14} color="var(--text-secondary)" weight="regular" />}
                IconOnly
                backgroundColor="transparent"
                onClick={onDownload}
            />
            <Button
                icon={<Icon name="Trash" size={14} color="var(--error)" weight="regular" />}
                IconOnly
                backgroundColor="transparent"
                onClick={onDelete}
            />
        </Container>
    );
}

export default AttachmentItemActions;
