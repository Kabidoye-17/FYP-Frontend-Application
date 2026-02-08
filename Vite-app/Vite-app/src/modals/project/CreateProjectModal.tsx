import * as Dialog from "@radix-ui/react-dialog";
import styled from "styled-components";
import { useState } from "react";
import CreateProjectModalHeader from "./CreateProjectModalHeader";
import CreateProjectModalBody from "./CreateProjectModalBody";
import CreateProjectModalFooter from "./CreateProjectModalFooter";
import { showToast } from "../../utils/toast";
import type { StatusLevel, PriorityLevel } from "../../utils/issueIconMaps";

interface CreateProjectModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

interface ProjectFormData {
    name: string;
    description: string;
    status: StatusLevel;
    priority: PriorityLevel;
    leadId: string | null;
    memberIds: string[];
    labels: string[];
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
    max-width: 700px;
    height: 350px;
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

function CreateProjectModal({ open, onOpenChange }: Readonly<CreateProjectModalProps>) {
    const [formData, setFormData] = useState<ProjectFormData>({
        name: "",
        description: "",
        status: "backlog",
        priority: "medium",
        leadId: null,
        memberIds: [],
        labels: [],
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleFieldChange = (field: keyof ProjectFormData, value: string | string[] | null) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);

        try {
            // TODO: API call to create project
            console.log("Creating project:", formData);

            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 500));

            showToast.success("Project created successfully!");
            handleClose();
        } catch (error) {
            showToast.error("Failed to create project. Please try again.");
            console.error("Error creating project:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleClose = () => {
        setFormData({
            name: "",
            description: "",
            status: "backlog",
            priority: "medium",
            leadId: null,
            memberIds: [],
            labels: [],
        });
        onOpenChange(false);
    };

    const hasName = formData.name.trim().length > 0;
    const hasDescription = formData.description.trim().length > 0;

    return (
        <Dialog.Root open={open} onOpenChange={onOpenChange}>
            <Dialog.Portal>
                <DialogOverlay />
                <DialogContent>
                    <CreateProjectModalHeader onClose={handleClose} />
                    <CreateProjectModalBody formData={formData} onChange={handleFieldChange} />
                    <CreateProjectModalFooter
                        onCancel={handleClose}
                        onSubmit={handleSubmit}
                        isSubmitting={isSubmitting}
                        hasName={hasName}
                        hasDescription={hasDescription}
                    />
                </DialogContent>
            </Dialog.Portal>
        </Dialog.Root>
    );
}

export default CreateProjectModal;
