import * as Dialog from "@radix-ui/react-dialog";
import styled from "styled-components";
import { useState } from "react";
import Icon from "../../design_system/Icon";
import * as Switch from "../../design_system/Switch";

interface NotificationPreferencesModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

interface NotificationPreference {
    key: string;
    label: string;
    description: string;
    enabled: boolean;
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
    max-width: 480px;
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

const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 1rem 0.75rem 1rem;
    border-bottom: 1px solid var(--section-background);
`;

const Title = styled(Dialog.Title)`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-family: "Inter", sans-serif;
    font-size: 1.125rem;
    font-weight: 700;
    color: var(--text-primary);
    margin: 0;
`;

const CloseButton = styled.button`
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;

    &:hover {
        background-color: var(--section-background);
    }
`;

const Body = styled.div`
    padding: 1rem;
    overflow-y: auto;
    flex: 1;
`;

const PreferenceItem = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 1rem;
    padding: 0.75rem 0;
    border-bottom: 1px solid var(--section-background);

    &:last-child {
        border-bottom: none;
    }
`;

const PreferenceInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
`;

const PreferenceLabel = styled.span`
    font-family: "Inter", sans-serif;
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--text-primary);
`;

const PreferenceDescription = styled.span`
    font-family: "Inter", sans-serif;
    font-size: 0.75rem;
    color: var(--text-secondary);
`;

const initialPreferences: NotificationPreference[] = [
    {
        key: "mentions",
        label: "Mentions",
        description: "When someone mentions you in a comment",
        enabled: true,
    },
    {
        key: "assignments",
        label: "Assignments",
        description: "When you're assigned to an issue",
        enabled: true,
    },
    {
        key: "comments",
        label: "Comments",
        description: "When someone comments on your issues",
        enabled: true,
    },
    {
        key: "status",
        label: "Status changes",
        description: "When issue status changes on watched items",
        enabled: false,
    },
    {
        key: "due_dates",
        label: "Due date reminders",
        description: "Reminders for upcoming due dates",
        enabled: true,
    },
];

function NotificationPreferencesModal({
    open,
    onOpenChange,
}: NotificationPreferencesModalProps) {
    const [preferences, setPreferences] = useState<NotificationPreference[]>(
        initialPreferences
    );

    const handleToggle = (key: string) => {
        setPreferences(
            preferences.map((pref) =>
                pref.key === key ? { ...pref, enabled: !pref.enabled } : pref
            )
        );
    };

    return (
        <Dialog.Root open={open} onOpenChange={onOpenChange}>
            <Dialog.Portal>
                <DialogOverlay />
                <DialogContent>
                    <Header>
                        <Title>
                            <Icon name="Bell" size={20} color="var(--plum)" weight="fill" />
                            Notification Preferences
                        </Title>
                        <CloseButton onClick={() => onOpenChange(false)}>
                            <Icon
                                name="X"
                                size={20}
                                color="var(--text-secondary)"
                                weight="regular"
                            />
                        </CloseButton>
                    </Header>
                    <Body>
                        {preferences.map((pref) => (
                            <PreferenceItem key={pref.key}>
                                <PreferenceInfo>
                                    <PreferenceLabel>{pref.label}</PreferenceLabel>
                                    <PreferenceDescription>
                                        {pref.description}
                                    </PreferenceDescription>
                                </PreferenceInfo>
                                <Switch.Root
                                    checked={pref.enabled}
                                    onCheckedChange={() => handleToggle(pref.key)}
                                >
                                    <Switch.Thumb />
                                </Switch.Root>
                            </PreferenceItem>
                        ))}
                    </Body>
                </DialogContent>
            </Dialog.Portal>
        </Dialog.Root>
    );
}

export default NotificationPreferencesModal;
