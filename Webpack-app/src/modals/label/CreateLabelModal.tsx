import * as Dialog from "@radix-ui/react-dialog";
import styled from "styled-components";
import { useState } from "react";
import CreateLabelModalHeader from "./CreateLabelModalHeader";
import CreateLabelModalBody from "./CreateLabelModalBody";
import CreateLabelModalFooter from "./CreateLabelModalFooter";
import { LABEL_COLORS } from "../../utils/labelData";
import type { Label } from "../../utils/labelData";

interface CreateLabelModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onLabelCreate: (label: Label) => void;
    fromDropdown?: boolean;
}

interface CreateLabelFormData {
    name: string;
    color: string;
}

const DialogOverlay = styled(Dialog.Overlay)<{ $fromDropdown?: boolean }>`
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(8px);
    position: fixed;
    inset: 0;
    z-index: ${({ $fromDropdown }) => ($fromDropdown ? 300 : 200)};
    animation: overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1);

    @keyframes overlayShow {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
`;

const DialogContent = styled(Dialog.Content)<{ $fromDropdown?: boolean }>`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90vw;
    max-width: 450px;
    background-color: var(--white);
    border-radius: 12px;
    box-shadow: 0px 10px 38px -10px rgba(22, 23, 24, 0.35),
                0px 10px 20px -15px rgba(22, 23, 24, 0.2);
    z-index: ${({ $fromDropdown }) => ($fromDropdown ? 301 : 201)};
    display: flex;
    flex-direction: column;
    animation: contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1);

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

function CreateLabelModal({ open, onOpenChange, onLabelCreate, fromDropdown = false }: Readonly<CreateLabelModalProps>) {
    const [formData, setFormData] = useState<CreateLabelFormData>({
        name: "",
        color: LABEL_COLORS[0],
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleFieldChange = (field: keyof CreateLabelFormData, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);

        try {
            const newLabel: Label = {
                id: `label-${Date.now()}`,
                name: formData.name.trim(),
                color: formData.color,
            };

            onLabelCreate(newLabel);
            handleClose();
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleClose = () => {
        setFormData({
            name: "",
            color: LABEL_COLORS[0],
        });
        onOpenChange(false);
    };

    const isValid = formData.name.trim().length > 0;

    return (
        <Dialog.Root open={open} onOpenChange={onOpenChange}>
            <Dialog.Portal>
                <DialogOverlay $fromDropdown={fromDropdown} />
                <DialogContent $fromDropdown={fromDropdown}>
                    <CreateLabelModalHeader onClose={handleClose} />
                    <CreateLabelModalBody formData={formData} onChange={handleFieldChange} />
                    <CreateLabelModalFooter
                        onCancel={handleClose}
                        onSubmit={handleSubmit}
                        isSubmitting={isSubmitting}
                        isValid={isValid}
                    />
                </DialogContent>
            </Dialog.Portal>
        </Dialog.Root>
    );
}

export default CreateLabelModal;
