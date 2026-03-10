import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import styled from "styled-components";
import QuickEventModalBody from "./QuickEventModalBody";
import Button from "../../design_system/Button";
import Icon from "../../design_system/Icon";
import { showToast } from "../../utils/toast";

interface QuickEventModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    initialDate?: Date;
    onSubmit?: (event: {
        title: string;
        date: Date;
        type: "issue" | "milestone" | "sprint" | "meeting";
    }) => void;
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
    max-width: 420px;
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

const Footer = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 0.75rem;
    padding: 1rem 1.25rem;
    border-top: 1px solid var(--border-color);
`;

function QuickEventModal({
    open,
    onOpenChange,
    initialDate = new Date(),
    onSubmit,
}: Readonly<QuickEventModalProps>) {
    const [title, setTitle] = useState("");
    const [date, setDate] = useState(initialDate);
    const [type, setType] = useState<"issue" | "milestone" | "sprint" | "meeting">("issue");

    const handleClose = () => {
        setTitle("");
        setType("issue");
        onOpenChange(false);
    };

    const handleSubmit = () => {
        if (!title.trim()) {
            showToast.error("Please enter a title");
            return;
        }

        onSubmit?.({ title: title.trim(), date, type });
        showToast.success("Event created successfully!");
        handleClose();
    };

    return (
        <Dialog.Root open={open} onOpenChange={onOpenChange}>
            <Dialog.Portal>
                <DialogOverlay />
                <DialogContent>
                    <Header>
                        <Title>Quick Add Event</Title>
                        <Dialog.Close asChild>
                            <Button
                                icon={<Icon name="X" size={18} color="var(--text-secondary)" weight="regular" />}
                                IconOnly
                                backgroundColor="transparent"
                                onClick={handleClose}
                            />
                        </Dialog.Close>
                    </Header>
                    <QuickEventModalBody
                        title={title}
                        onTitleChange={setTitle}
                        date={date}
                        onDateChange={setDate}
                        type={type}
                        onTypeChange={setType}
                    />
                    <Footer>
                        <Button
                            backgroundColor="var(--white)"
                            color="var(--text-primary)"
                            onClick={handleClose}
                        >
                            Cancel
                        </Button>
                        <Button
                            icon={<Icon name="Plus" size={14} color="var(--white)" weight="bold" />}
                            backgroundColor="var(--purple)"
                            color="var(--white)"
                            onClick={handleSubmit}
                        >
                            Create
                        </Button>
                    </Footer>
                </DialogContent>
            </Dialog.Portal>
        </Dialog.Root>
    );
}

export default QuickEventModal;
