import { useState, useCallback } from "react";

/**
 * Simple boolean toggle state
 * Cleaner than useState for on/off states
 *
 * @param initialValue - Initial toggle state (default: false)
 * @returns [value, toggle, setTrue, setFalse]
 *
 * @example
 * const [isOpen, toggle, open, close] = useToggle();
 *
 * <button onClick={toggle}>Toggle Menu</button>
 * <button onClick={open}>Open Menu</button>
 * <button onClick={close}>Close Menu</button>
 */
export function useToggle(
    initialValue: boolean = false
): [boolean, () => void, () => void, () => void] {
    const [value, setValue] = useState(initialValue);

    const toggle = useCallback(() => setValue((v) => !v), []);
    const setTrue = useCallback(() => setValue(true), []);
    const setFalse = useCallback(() => setValue(false), []);

    return [value, toggle, setTrue, setFalse];
}

export default useToggle;
