import * as Dialog from "@radix-ui/react-dialog";
import styled from "styled-components";
import { useState } from "react";
import CreateMilestoneModalHeader from "./CreateMilestoneModalHeader";
import CreateMilestoneModalBody from "./CreateMilestoneModalBody";
import CreateMilestoneModalFooter from "./CreateMilestoneModalFooter";
import { showToast } from "../../utils/toast";
import { useCreateMilestone } from "../../hooks/queries";

interface CreateMilestoneModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    projectId?: string;
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

function CreateMilestoneModal({ open, onOpenChange, projectId }: Readonly<CreateMilestoneModalProps>) {
    const [formData, setFormData] = useState<MilestoneFormData>({
        title: "",
        description: "",
        dueDate: null,
    });

    const createMilestone = useCreateMilestone();

    const handleFieldChange = (field: keyof MilestoneFormData, value: string | Date | null) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = () => {
        if (!projectId) {
            showToast.error("Please select a project first.");
            return;
        }

        createMilestone.mutate(
            {
                title: formData.title,
                description: formData.description,
                dueDate: formData.dueDate?.toISOString() || null,
                projectId,
            },
            {
                onSuccess: () => {
                    showToast.success("Milestone created successfully!");
                    handleClose();
                },
                onError: (error) => {
                    showToast.error("Failed to create milestone. Please try again.");
                    console.error("Error creating milestone:", error);
                },
            }
        );
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
                        isSubmitting={createMilestone.isPending}
                        isValid={isValid}
                    />
                </DialogContent>
            </Dialog.Portal>
        </Dialog.Root>
    );
}

export default CreateMilestoneModal;
