import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import styled from "styled-components";
import BulkEditModalHeader from "./BulkEditModalHeader";
import BulkEditModalBody from "./BulkEditModalBody";
import BulkEditModalFooter from "./BulkEditModalFooter";
import { showToast } from "../../utils/toast";

interface BulkEditItem {
    id: string;
    title: string;
}

interface BulkEditModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    items: BulkEditItem[];
    onApply?: (fieldIds: string[], itemIds: string[]) => void;
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
    max-width: 520px;
    max-height: 85vh;
    background-color: var(--white);
    border-radius: 12px;
    box-shadow: 0 16px 70px rgba(0, 0, 0, 0.2);
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

function BulkEditModal({
    open,
    onOpenChange,
    items,
    onApply,
}: Readonly<BulkEditModalProps>) {
    const [selectedFields, setSelectedFields] = useState<string[]>([]);
    const [isApplying, setIsApplying] = useState(false);

    const handleToggleField = (fieldId: string) => {
        setSelectedFields((prev) =>
            prev.includes(fieldId)
                ? prev.filter((id) => id !== fieldId)
                : [...prev, fieldId]
        );
    };

    const handleClose = () => {
        setSelectedFields([]);
        onOpenChange(false);
    };

    const handleApply = async () => {
        if (selectedFields.length === 0) return;

        setIsApplying(true);
        try {
            // TODO: API call to apply bulk edit
            await new Promise((resolve) => setTimeout(resolve, 1000));
            onApply?.(selectedFields, items.map((item) => item.id));
            showToast.success(`Updated ${items.length} item${items.length !== 1 ? "s" : ""}`);
            handleClose();
        } catch {
            showToast.error("Failed to apply changes. Please try again.");
        } finally {
            setIsApplying(false);
        }
    };

    return (
        <Dialog.Root open={open} onOpenChange={onOpenChange}>
            <Dialog.Portal>
                <DialogOverlay />
                <DialogContent>
                    <BulkEditModalHeader
                        selectedCount={items.length}
                        onClose={handleClose}
                    />
                    <BulkEditModalBody
                        items={items}
                        fields={[
                            { id: "status", label: "Status", icon: "Circle" },
                            { id: "priority", label: "Priority", icon: "Flag" },
                            { id: "assignees", label: "Assignees", icon: "User" },
                            { id: "labels", label: "Labels", icon: "Tag" },
                            { id: "project", label: "Project", icon: "Folder" },
                            { id: "targetDate", label: "Target Date", icon: "Calendar" },
                        ]}
                        selectedFields={selectedFields}
                        onToggleField={handleToggleField}
                    />
                    <BulkEditModalFooter
                        onCancel={handleClose}
                        onApply={handleApply}
                        isApplying={isApplying}
                        canApply={selectedFields.length > 0}
                    />
                </DialogContent>
            </Dialog.Portal>
        </Dialog.Root>
    );
}

export default BulkEditModal;
