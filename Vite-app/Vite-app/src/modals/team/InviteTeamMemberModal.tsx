import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import styled from "styled-components";
import InviteTeamMemberModalHeader from "./InviteTeamMemberModalHeader";
import InviteTeamMemberModalBody from "./InviteTeamMemberModalBody";
import InviteTeamMemberModalFooter from "./InviteTeamMemberModalFooter";
import { showToast } from "../../utils/toast";

interface InviteTeamMemberModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
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
    max-width: 450px;
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

function InviteTeamMemberModal({ open, onOpenChange }: Readonly<InviteTeamMemberModalProps>) {
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("member");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const handleClose = () => {
        setEmail("");
        setRole("member");
        onOpenChange(false);
    };

    const handleSubmit = async () => {
        if (!isValidEmail) return;

        setIsSubmitting(true);
        try {
            // TODO: API call to send invite
            await new Promise((resolve) => setTimeout(resolve, 1000));
            showToast.success(`Invitation sent to ${email}`);
            handleClose();
        } catch {
            showToast.error("Failed to send invitation. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog.Root open={open} onOpenChange={onOpenChange}>
            <Dialog.Portal>
                <DialogOverlay />
                <DialogContent>
                    <InviteTeamMemberModalHeader onClose={handleClose} />
                    <InviteTeamMemberModalBody
                        email={email}
                        onEmailChange={setEmail}
                        role={role}
                        onRoleChange={setRole}
                    />
                    <InviteTeamMemberModalFooter
                        onCancel={handleClose}
                        onSubmit={handleSubmit}
                        isSubmitting={isSubmitting}
                        isValid={isValidEmail}
                    />
                </DialogContent>
            </Dialog.Portal>
        </Dialog.Root>
    );
}

export default InviteTeamMemberModal;
