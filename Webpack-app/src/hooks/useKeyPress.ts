import { useEffect, useCallback } from "react";

interface KeyPressOptions {
    ctrl?: boolean;
    meta?: boolean;
    shift?: boolean;
    alt?: boolean;
    preventDefault?: boolean;
}

/**
 * Listens for specific keyboard key presses
 * Supports modifier keys (Ctrl, Meta/Cmd, Shift, Alt)
 *
 * @param targetKey - The key to listen for (e.g., "k", "Escape", "Enter")
 * @param handler - Callback when key is pressed
 * @param options - Modifier key requirements
 *
 * @example
 * // Listen for Cmd+K (Mac) or Ctrl+K (Windows)
 * useKeyPress("k", () => openSearch(), { meta: true });
 *
 * // Listen for Escape to close modal
 * useKeyPress("Escape", () => closeModal());
 *
 * // Listen for Shift+Enter
 * useKeyPress("Enter", () => submitForm(), { shift: true });
 */
export function useKeyPress(
    targetKey: string,
    handler: (event: KeyboardEvent) => void,
    options: KeyPressOptions = {}
): void {
    const { ctrl, meta, shift, alt, preventDefault = true } = options;

    const handleKeyDown = useCallback(
        (event: KeyboardEvent) => {
            // Check if the target key matches
            const keyMatches =
                event.key.toLowerCase() === targetKey.toLowerCase() ||
                event.code.toLowerCase() === targetKey.toLowerCase();

            if (!keyMatches) return;

            // Check modifier keys
            if (ctrl !== undefined && event.ctrlKey !== ctrl) return;
            if (meta !== undefined && event.metaKey !== meta) return;
            if (shift !== undefined && event.shiftKey !== shift) return;
            if (alt !== undefined && event.altKey !== alt) return;

            // Don't trigger if typing in an input/textarea
            const target = event.target as HTMLElement;
            const isEditable =
                target.tagName === "INPUT" ||
                target.tagName === "TEXTAREA" ||
                target.isContentEditable;

            // Allow Escape to work even in inputs
            if (isEditable && targetKey.toLowerCase() !== "escape") return;

            if (preventDefault) {
                event.preventDefault();
            }

            handler(event);
        },
        [targetKey, handler, ctrl, meta, shift, alt, preventDefault]
    );

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [handleKeyDown]);
}

/**
 * Cross-platform Cmd/Ctrl+Key listener
 * Automatically uses Meta on Mac and Ctrl on Windows/Linux
 */
export function useCmdKey(
    targetKey: string,
    handler: (event: KeyboardEvent) => void
): void {
    const isMac = typeof navigator !== "undefined" && /Mac|iPod|iPhone|iPad/.test(navigator.platform);

    useKeyPress(targetKey, handler, isMac ? { meta: true } : { ctrl: true });
}

export default useKeyPress;
