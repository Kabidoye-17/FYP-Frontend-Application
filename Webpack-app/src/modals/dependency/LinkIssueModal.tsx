import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import styled from "styled-components";
import LinkIssueModalHeader from "./LinkIssueModalHeader";
import LinkIssueModalBody from "./LinkIssueModalBody";
import LinkIssueModalFooter from "./LinkIssueModalFooter";
import { showToast } from "../../utils/toast";

type DependencyType = "blocks" | "blocked-by" | "relates-to" | "duplicates";

interface LinkIssueModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmit?: (linkType: DependencyType, issueId: string) => void;
}

const DialogOverlay = styled(Dialog.Overlay)`
    background-color: rgba(0, 0, 0, 0.5);
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
    max-width: 480px;
    background-color: var(--white);
    border-radius: 12px;
    box-shadow: 0 16px 70px rgba(0, 0, 0, 0.2);
    z-index: 201;
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

function LinkIssueModal({ open, onOpenChange, onSubmit }: Readonly<LinkIssueModalProps>) {
    const [linkType, setLinkType] = useState<DependencyType>("relates-to");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedIssueId, setSelectedIssueId] = useState<string | null>(null);

    const handleClose = () => {
        setLinkType("relates-to");
        setSearchQuery("");
        setSelectedIssueId(null);
        onOpenChange(false);
    };

    const handleSubmit = () => {
        if (!selectedIssueId) return;

        onSubmit?.(linkType, selectedIssueId);
        showToast.success("Issue linked successfully!");
        handleClose();
    };

    return (
        <Dialog.Root open={open} onOpenChange={onOpenChange}>
            <Dialog.Portal>
                <DialogOverlay />
                <DialogContent>
                    <LinkIssueModalHeader onClose={handleClose} />
                    <LinkIssueModalBody
                        linkType={linkType}
                        onLinkTypeChange={setLinkType}
                        searchQuery={searchQuery}
                        onSearchChange={setSearchQuery}
                        selectedIssueId={selectedIssueId}
                        onIssueSelect={setSelectedIssueId}
                    />
                    <LinkIssueModalFooter
                        onCancel={handleClose}
                        onSubmit={handleSubmit}
                        isValid={selectedIssueId !== null}
                    />
                </DialogContent>
            </Dialog.Portal>
        </Dialog.Root>
    );
}

export default LinkIssueModal;
