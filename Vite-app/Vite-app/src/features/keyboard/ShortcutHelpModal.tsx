import * as Dialog from "@radix-ui/react-dialog";
import styled from "styled-components";
import Button from "../../design_system/Button";
import Icon from "../../design_system/Icon";

interface ShortcutHelpModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

interface ShortcutDefinition {
    keys: string[];
    description: string;
}

interface ShortcutCategory {
    name: string;
    shortcuts: ShortcutDefinition[];
}

const SHORTCUTS: ShortcutCategory[] = [
    {
        name: "General",
        shortcuts: [
            { keys: ["⌘", "K"], description: "Open command palette" },
            { keys: ["?"], description: "Show keyboard shortcuts" },
            { keys: ["Esc"], description: "Close modal or panel" },
        ],
    },
    {
        name: "Navigation",
        shortcuts: [
            { keys: ["/"], description: "Focus search" },
            { keys: ["G", "I"], description: "Go to Issues" },
            { keys: ["G", "P"], description: "Go to Projects" },
            { keys: ["G", "K"], description: "Go to Kanban" },
            { keys: ["G", "A"], description: "Go to Analytics" },
        ],
    },
    {
        name: "Actions",
        shortcuts: [
            { keys: ["C"], description: "Create new issue" },
            { keys: ["E"], description: "Edit selected item" },
            { keys: ["⌘", "Enter"], description: "Submit form" },
        ],
    },
    {
        name: "Selection",
        shortcuts: [
            { keys: ["↑", "↓"], description: "Navigate list" },
            { keys: ["Enter"], description: "Open selected item" },
            { keys: ["Space"], description: "Toggle selection" },
        ],
    },
];

const DialogOverlay = styled(Dialog.Overlay)`
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(4px);
    position: fixed;
    inset: 0;
    z-index: 300;
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
    max-width: 560px;
    max-height: 85vh;
    background-color: var(--white);
    border-radius: 12px;
    box-shadow: 0 16px 70px rgba(0, 0, 0, 0.2);
    z-index: 301;
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
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;

const Content = styled.div`
    padding: 1rem 1.25rem;
    overflow-y: auto;
    max-height: calc(85vh - 60px);
`;

const Category = styled.div`
    &:not(:last-child) {
        margin-bottom: 1.5rem;
    }
`;

const CategoryName = styled.h3`
    font-family: "Inter", sans-serif;
    font-size: 0.6875rem;
    font-weight: 600;
    color: var(--text-tertiary);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin: 0 0 0.75rem 0;
`;

const ShortcutRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem 0;

    &:not(:last-child) {
        border-bottom: 1px solid var(--section-background);
    }
`;

const ShortcutDescription = styled.span`
    font-family: "Inter", sans-serif;
    font-size: 0.875rem;
    color: var(--text-primary);
`;

const KeysWrapper = styled.div`
    display: flex;
    gap: 0.25rem;
`;

const Key = styled.kbd`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 24px;
    height: 24px;
    padding: 0 0.5rem;
    font-family: "SF Mono", Monaco, Consolas, monospace;
    font-size: 0.75rem;
    font-weight: 500;
    color: var(--text-secondary);
    background-color: var(--section-background);
    border: 1px solid var(--border-color);
    border-radius: 4px;
`;

const PlusSign = styled.span`
    display: flex;
    align-items: center;
    font-family: "Inter", sans-serif;
    font-size: 0.75rem;
    color: var(--text-tertiary);
    padding: 0 0.125rem;
`;

function ShortcutHelpModal({ open, onOpenChange }: Readonly<ShortcutHelpModalProps>) {
    return (
        <Dialog.Root open={open} onOpenChange={onOpenChange}>
            <Dialog.Portal>
                <DialogOverlay />
                <DialogContent>
                    <Header>
                        <Title>
                            <Icon name="Keyboard" size={20} color="var(--text-primary)" weight="regular" />
                            Keyboard Shortcuts
                        </Title>
                        <Dialog.Close asChild>
                            <Button
                                icon={<Icon name="X" size={18} color="var(--text-secondary)" weight="regular" />}
                                IconOnly
                                backgroundColor="transparent"
                            />
                        </Dialog.Close>
                    </Header>
                    <Content>
                        {SHORTCUTS.map((category) => (
                            <Category key={category.name}>
                                <CategoryName>{category.name}</CategoryName>
                                {category.shortcuts.map((shortcut) => (
                                    <ShortcutRow key={shortcut.description}>
                                        <ShortcutDescription>{shortcut.description}</ShortcutDescription>
                                        <KeysWrapper>
                                            {shortcut.keys.map((key, index) => (
                                                <>
                                                    <Key key={key}>{key}</Key>
                                                    {index < shortcut.keys.length - 1 && (
                                                        <PlusSign key={`plus-${index}`}>+</PlusSign>
                                                    )}
                                                </>
                                            ))}
                                        </KeysWrapper>
                                    </ShortcutRow>
                                ))}
                            </Category>
                        ))}
                    </Content>
                </DialogContent>
            </Dialog.Portal>
        </Dialog.Root>
    );
}

export default ShortcutHelpModal;
