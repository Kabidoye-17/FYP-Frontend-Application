import styled from "styled-components";
import AttachmentPreview from "../../panels/AttachmentPreview";
import type { Attachment } from "../../panels/AttachmentItem";

interface AttachmentPreviewModalBodyProps {
    attachment: Attachment;
}

const Body = styled.div`
    padding: 1.25rem;
`;

const FileInfo = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1rem;
    padding: 0.75rem 1rem;
    background-color: var(--section-background);
    border-radius: 8px;
`;

const FileName = styled.span`
    font-family: "Inter", sans-serif;
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--text-primary);
`;

const FileSize = styled.span`
    font-family: "Inter", sans-serif;
    font-size: 0.75rem;
    color: var(--text-secondary);
`;

function formatFileSize(bytes: number): string {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
}

function AttachmentPreviewModalBody({
    attachment,
}: Readonly<AttachmentPreviewModalBodyProps>) {
    return (
        <Body>
            <AttachmentPreview attachment={attachment} />
            <FileInfo>
                <FileName>{attachment.name}</FileName>
                <FileSize>{formatFileSize(attachment.size)}</FileSize>
            </FileInfo>
        </Body>
    );
}

export default AttachmentPreviewModalBody;
