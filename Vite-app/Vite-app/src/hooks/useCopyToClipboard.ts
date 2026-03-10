import { useState, useCallback } from "react";

interface UseCopyToClipboardReturn {
    copy: (text: string) => Promise<boolean>;
    isCopied: boolean;
    error: Error | null;
}

/**
 * Copy text to clipboard with success/error state
 * Resets "copied" state after a timeout
 *
 * @param resetDelay - Time in ms before resetting isCopied (default: 2000)
 * @returns { copy, isCopied, error }
 *
 * @example
 * const { copy, isCopied } = useCopyToClipboard();
 *
 * <button onClick={() => copy(shareUrl)}>
 *   {isCopied ? "Copied!" : "Copy Link"}
 * </button>
 */
export function useCopyToClipboard(resetDelay: number = 2000): UseCopyToClipboardReturn {
    const [isCopied, setIsCopied] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const copy = useCallback(
        async (text: string): Promise<boolean> => {
            if (!navigator?.clipboard) {
                setError(new Error("Clipboard API not available"));
                return false;
            }

            try {
                await navigator.clipboard.writeText(text);
                setIsCopied(true);
                setError(null);

                // Reset after delay
                setTimeout(() => {
                    setIsCopied(false);
                }, resetDelay);

                return true;
            } catch (err) {
                setError(err instanceof Error ? err : new Error("Failed to copy"));
                setIsCopied(false);
                return false;
            }
        },
        [resetDelay]
    );

    return { copy, isCopied, error };
}

export default useCopyToClipboard;
