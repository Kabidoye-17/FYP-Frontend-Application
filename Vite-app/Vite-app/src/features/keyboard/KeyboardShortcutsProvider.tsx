import { createContext, useContext, useEffect, useCallback, useState, type ReactNode } from "react";

interface KeyboardShortcut {
    key: string;
    metaKey?: boolean;
    ctrlKey?: boolean;
    shiftKey?: boolean;
    description: string;
    action: () => void;
    global?: boolean;
}

interface KeyboardShortcutsContextValue {
    registerShortcut: (id: string, shortcut: KeyboardShortcut) => void;
    unregisterShortcut: (id: string) => void;
    shortcuts: Map<string, KeyboardShortcut>;
    enabled: boolean;
    setEnabled: (enabled: boolean) => void;
}

const KeyboardShortcutsContext = createContext<KeyboardShortcutsContextValue | null>(null);

export function useKeyboardShortcuts() {
    const context = useContext(KeyboardShortcutsContext);
    if (!context) {
        throw new Error("useKeyboardShortcuts must be used within KeyboardShortcutsProvider");
    }
    return context;
}

export function useRegisterShortcut(id: string, shortcut: KeyboardShortcut) {
    const { registerShortcut, unregisterShortcut } = useKeyboardShortcuts();

    useEffect(() => {
        registerShortcut(id, shortcut);
        return () => unregisterShortcut(id);
    }, [id, shortcut, registerShortcut, unregisterShortcut]);
}

interface KeyboardShortcutsProviderProps {
    children: ReactNode;
}

function KeyboardShortcutsProvider({ children }: Readonly<KeyboardShortcutsProviderProps>) {
    const [shortcuts, setShortcuts] = useState<Map<string, KeyboardShortcut>>(new Map());
    const [enabled, setEnabled] = useState(true);

    const registerShortcut = useCallback((id: string, shortcut: KeyboardShortcut) => {
        setShortcuts((prev) => {
            const next = new Map(prev);
            next.set(id, shortcut);
            return next;
        });
    }, []);

    const unregisterShortcut = useCallback((id: string) => {
        setShortcuts((prev) => {
            const next = new Map(prev);
            next.delete(id);
            return next;
        });
    }, []);

    useEffect(() => {
        if (!enabled) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            // Don't trigger shortcuts when typing in inputs
            const target = e.target as HTMLElement;
            const isInputElement =
                target.tagName === "INPUT" ||
                target.tagName === "TEXTAREA" ||
                target.isContentEditable;

            for (const shortcut of shortcuts.values()) {
                // Skip non-global shortcuts when in input
                if (isInputElement && !shortcut.global) continue;

                const keyMatches = e.key.toLowerCase() === shortcut.key.toLowerCase();
                const metaMatches = shortcut.metaKey ? e.metaKey : !e.metaKey;
                const ctrlMatches = shortcut.ctrlKey ? e.ctrlKey : !e.ctrlKey;
                const shiftMatches = shortcut.shiftKey ? e.shiftKey : !e.shiftKey;

                // Special handling for Cmd+K / Ctrl+K
                if (shortcut.key.toLowerCase() === "k" && (shortcut.metaKey || shortcut.ctrlKey)) {
                    if (keyMatches && (e.metaKey || e.ctrlKey)) {
                        e.preventDefault();
                        shortcut.action();
                        return;
                    }
                    continue;
                }

                if (keyMatches && metaMatches && ctrlMatches && shiftMatches) {
                    e.preventDefault();
                    shortcut.action();
                    return;
                }
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [shortcuts, enabled]);

    const value: KeyboardShortcutsContextValue = {
        registerShortcut,
        unregisterShortcut,
        shortcuts,
        enabled,
        setEnabled,
    };

    return (
        <KeyboardShortcutsContext.Provider value={value}>
            {children}
        </KeyboardShortcutsContext.Provider>
    );
}

export default KeyboardShortcutsProvider;
