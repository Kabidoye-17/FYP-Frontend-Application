import styled from "styled-components";
import AttachmentsPanelHeader from "./AttachmentsPanelHeader";
import AttachmentItem, { type Attachment } from "./AttachmentItem";
import AttachmentUploadZone from "./AttachmentUploadZone";
import EmptyState from "../design_system/EmptyState";

interface AttachmentsPanelProps {
    attachments: Attachment[];
    isOpen: boolean;
    onClose: () => void;
    onUpload: (files: FileList) => void;
    onPreview: (attachment: Attachment) => void;
    onDownload: (attachment: Attachment) => void;
    onDelete: (attachmentId: string) => void;
}

const PanelOverlay = styled.div<{ $isOpen: boolean }>`
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.3);
    opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
    visibility: ${({ $isOpen }) => ($isOpen ? "visible" : "hidden")};
    transition: opacity 0.2s ease, visibility 0.2s ease;
    z-index: 100;
`;

const PanelContainer = styled.div<{ $isOpen: boolean }>`
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    width: 400px;
    background-color: var(--white);
    box-shadow: -4px 0 24px rgba(0, 0, 0, 0.1);
    transform: translateX(${({ $isOpen }) => ($isOpen ? "0" : "100%")});
    transition: transform 0.3s ease;
    z-index: 101;
    display: flex;
    flex-direction: column;
`;

const Content = styled.div`
    flex: 1;
    overflow-y: auto;
    padding: 1rem;
`;

const UploadSection = styled.div`
    padding: 1rem;
    border-top: 1px solid var(--border-color);
`;

const AttachmentsList = styled.div`
    margin-top: 1rem;
`;

function AttachmentsPanel({
    attachments,
    isOpen,
    onClose,
    onUpload,
    onPreview,
    onDownload,
    onDelete,
}: Readonly<AttachmentsPanelProps>) {
    return (
        <>
            <PanelOverlay $isOpen={isOpen} onClick={onClose} />
            <PanelContainer $isOpen={isOpen}>
                <AttachmentsPanelHeader
                    count={attachments.length}
                    onClose={onClose}
                    onUpload={() => {
                        // Trigger upload zone click
                    }}
                />
                <Content>
                    {attachments.length === 0 ? (
                        <EmptyState
                            icon="Paperclip"
                            title="No attachments"
                            description="Upload files to attach them to this issue"
                        />
                    ) : (
                        <AttachmentsList>
                            {attachments.map((attachment) => (
                                <AttachmentItem
                                    key={attachment.id}
                                    attachment={attachment}
                                    onPreview={() => onPreview(attachment)}
                                    onDownload={() => onDownload(attachment)}
                                    onDelete={() => onDelete(attachment.id)}
                                />
                            ))}
                        </AttachmentsList>
                    )}
                </Content>
                <UploadSection>
                    <AttachmentUploadZone onFilesSelect={onUpload} />
                </UploadSection>
            </PanelContainer>
        </>
    );
}

export default AttachmentsPanel;
