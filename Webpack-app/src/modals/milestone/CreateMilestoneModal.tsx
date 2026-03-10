import * as Dialog from "@radix-ui/react-dialog";
import styled from "styled-components";
import { useState } from "react";
import CreateMilestoneModalHeader from "./CreateMilestoneModalHeader";
import CreateMilestoneModalBody from "./CreateMilestoneModalBody";
import CreateMilestoneModalFooter from "./CreateMilestoneModalFooter";
import { showToast } from "../../utils/toast";

interface CreateMilestoneModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export interface MilestoneFormData {
    title: string;
    description: string;
    dueDate: Date | null;
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

function CreateMilestoneModal({ open, onOpenChange }: Readonly<CreateMilestoneModalProps>) {
    const [formData, setFormData] = useState<MilestoneFormData>({
        title: "",
        description: "",
        dueDate: null,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleFieldChange = (field: keyof MilestoneFormData, value: string | Date | null) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);

        try {
            console.log("Creating milestone:", formData);
            await new Promise((resolve) => setTimeout(resolve, 500));

            showToast.success("Milestone created successfully!");
            handleClose();
        } catch (error) {
            showToast.error("Failed to create milestone. Please try again.");
            console.error("Error creating milestone:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleClose = () => {
        setFormData({
            title: "",
            description: "",
            dueDate: null,
        });
        onOpenChange(false);
    };

    const isValid = formData.title.trim().length > 0;

    return (
        <Dialog.Root open={open} onOpenChange={onOpenChange}>
            <Dialog.Portal>
                <DialogOverlay />
                <DialogContent>
                    <CreateMilestoneModalHeader onClose={handleClose} />
                    <CreateMilestoneModalBody formData={formData} onChange={handleFieldChange} />
                    <CreateMilestoneModalFooter
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

export default CreateMilestoneModal;
