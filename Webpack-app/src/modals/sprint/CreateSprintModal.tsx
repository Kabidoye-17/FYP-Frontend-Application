import * as Dialog from "@radix-ui/react-dialog";
import styled from "styled-components";
import { useState } from "react";
import CreateSprintModalHeader from "./CreateSprintModalHeader";
import CreateSprintModalBody from "./CreateSprintModalBody";
import CreateSprintModalFooter from "./CreateSprintModalFooter";
import { showToast } from "../../utils/toast";

interface CreateSprintModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export interface SprintFormData {
    name: string;
    startDate: Date | null;
    endDate: Date | null;
    teamId: string | null;
    goal: string;
}

const DialogOverlay = styled(Dialog.Overlay)`
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(8px);
    position: fixed;
    inset: 0;
    z-index: 200;
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

const DialogContent = styled(Dialog.Content)`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90vw;
    max-width: 500px;
    max-height: 85vh;
    background-color: var(--white);
    border-radius: 16px;
    box-shadow: 0px 10px 38px -10px rgba(22, 23, 24, 0.35),
        0px 10px 20px -15px rgba(22, 23, 24, 0.2);
    z-index: 201;
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

function CreateSprintModal({ open, onOpenChange }: Readonly<CreateSprintModalProps>) {
    const [formData, setFormData] = useState<SprintFormData>({
        name: "",
        startDate: null,
        endDate: null,
        teamId: null,
        goal: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleFieldChange = (field: keyof SprintFormData, value: string | Date | null) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);

        try {
            console.log("Creating sprint:", formData);
            await new Promise((resolve) => setTimeout(resolve, 500));

            showToast.success("Sprint created successfully!");
            handleClose();
        } catch (error) {
            showToast.error("Failed to create sprint. Please try again.");
            console.error("Error creating sprint:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleClose = () => {
        setFormData({
            name: "",
            startDate: null,
            endDate: null,
            teamId: null,
            goal: "",
        });
        onOpenChange(false);
    };

    const isValid = formData.name.trim().length > 0 && formData.startDate && formData.endDate;

    return (
        <Dialog.Root open={open} onOpenChange={onOpenChange}>
            <Dialog.Portal>
                <DialogOverlay />
                <DialogContent>
                    <CreateSprintModalHeader onClose={handleClose} />
                    <CreateSprintModalBody formData={formData} onChange={handleFieldChange} />
                    <CreateSprintModalFooter
                        onCancel={handleClose}
                        onSubmit={handleSubmit}
                        isSubmitting={isSubmitting}
                        isValid={!!isValid}
                    />
                </DialogContent>
            </Dialog.Portal>
        </Dialog.Root>
    );
}

export default CreateSprintModal;
