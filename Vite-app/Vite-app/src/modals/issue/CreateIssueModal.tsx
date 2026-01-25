import * as Dialog from "@radix-ui/react-dialog";
import styled from "styled-components";
import { useState } from "react";
import CreateIssueModalHeader from "./CreateIssueModalHeader";
import CreateIssueModalBody from "./CreateIssueModalBody";
import CreateIssueModalFooter from "./CreateIssueModalFooter";
import { showToast } from "../../utils/toast";
import type { StatusLevel, PriorityLevel } from "../../utils/issueIconMaps";

interface CreateIssueModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

interface IssueFormData {
    heading: string;
    body: string;
    status: StatusLevel;
    priority: PriorityLevel;
    assignees: string[];
    projectId: string | null;
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

function CreateIssueModal({ open, onOpenChange }: Readonly<CreateIssueModalProps>) {
    const [formData, setFormData] = useState<IssueFormData>({
        heading: "",
        body: "",
        status: "backlog",
        priority: "medium",
        assignees: [],
        projectId: null,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleFieldChange = (field: keyof IssueFormData, value: string | string[] | null) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);

        try {
            // TODO: API call to create issue
            console.log("Creating issue:", formData);

            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 500));

            showToast.success("Issue created successfully!");
            handleClose();
        } catch (error) {
            showToast.error("Failed to create issue. Please try again.");
            console.error("Error creating issue:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleClose = () => {
        setFormData({
            heading: "",
            body: "",
            status: "backlog",
            priority: "medium",
            assignees: [],
            projectId: null,
        });
        onOpenChange(false);
    };

    const hasHeading = formData.heading.trim().length > 0;
    const hasBody = formData.body.trim().length > 0;

    return (
        <Dialog.Root open={open} onOpenChange={onOpenChange}>
            <Dialog.Portal>
                <DialogOverlay />
                <DialogContent>
                    <CreateIssueModalHeader onClose={handleClose} />
                    <CreateIssueModalBody formData={formData} onChange={handleFieldChange} />
                    <CreateIssueModalFooter
                        onCancel={handleClose}
                        onSubmit={handleSubmit}
                        isSubmitting={isSubmitting}
                        hasHeading={hasHeading}
                        hasBody={hasBody}
                    />
                </DialogContent>
            </Dialog.Portal>
        </Dialog.Root>
    );
}

export default CreateIssueModal;
