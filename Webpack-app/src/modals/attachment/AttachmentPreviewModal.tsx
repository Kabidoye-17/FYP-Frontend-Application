import * as Dialog from "@radix-ui/react-dialog";
import styled from "styled-components";
import AttachmentPreviewModalBody from "./AttachmentPreviewModalBody";
import Button from "../../design_system/Button";
import Icon from "../../design_system/Icon";
import type { Attachment } from "../../panels/AttachmentItem";

interface AttachmentPreviewModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    attachment: Attachment | null;
    onDownload?: () => void;
}

const DialogOverlay = styled(Dialog.Overlay)`
    background-color: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(4px);
    position: fixed;
    inset: 0;
    z-index: 200;
    animation: overlayShow 150ms ease;

    @keyframes overlayShow {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
`;

const DialogContent = styled(Dialog.Content)`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90vw;
    max-width: 800px;
    max-height: 85vh;
    background-color: var(--white);
    border-radius: 12px;
    box-shadow: 0 16px 70px rgba(0, 0, 0, 0.3);
    z-index: 201;
    overflow: hidden;
    animation: contentShow 150ms ease;

    @keyframes contentShow {
        from {
            opacity: 0;
            transform: translate(-50%, -48%) scale(0.96);
        }
        to {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
    }
`;

const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 1.25rem;
    border-bottom: 1px solid var(--border-color);
`;

const Title = styled(Dialog.Title)`
    font-family: "Inter", sans-serif;
    font-size: 1rem;
    font-weight: 600;
    color: var(--text-primary);
    margin: 0;
`;

const HeaderActions = styled.div`
    display: flex;
    gap: 0.5rem;
`;

function AttachmentPreviewModal({
    open,
    onOpenChange,
    attachment,
    onDownload,
}: Readonly<AttachmentPreviewModalProps>) {
    if (!attachment) return null;

    return (
        <Dialog.Root open={open} onOpenChange={onOpenChange}>
            <Dialog.Portal>
                <DialogOverlay />
                <DialogContent>
                    <Header>
                        <Title>Preview</Title>
                        <HeaderActions>
                            {onDownload && (
                                <Button
                                    icon={<Icon name="DownloadSimple" size={14} color="var(--text-primary)" weight="regular" />}
                                    backgroundColor="var(--white)"
                                    color="var(--text-primary)"
                                    onClick={onDownload}
                                >
                                    Download
                                </Button>
                            )}
                            <Dialog.Close asChild>
                                <Button
                                    icon={<Icon name="X" size={18} color="var(--text-secondary)" weight="regular" />}
                                    IconOnly
                                    backgroundColor="transparent"
                                />
                            </Dialog.Close>
                        </HeaderActions>
                    </Header>
                    <AttachmentPreviewModalBody attachment={attachment} />
                </DialogContent>
            </Dialog.Portal>
        </Dialog.Root>
    );
}

export default AttachmentPreviewModal;
