import { useRef, useEffect } from "react";

/**
 * Returns the previous value of a variable
 * Useful for comparing current vs previous state
 *
 * @param value - Current value to track
 * @returns Previous value (undefined on first render)
 *
 * @example
 * const [count, setCount] = useState(0);
 * const prevCount = usePrevious(count);
 *
 * // prevCount is undefined on first render, then tracks previous value
 * console.log(`Changed from ${prevCount} to ${count}`);
 */
export function usePrevious<T>(value: T): T | undefined {
    const ref = useRef<T | undefined>(undefined);

    useEffect(() => {
        ref.current = value;
    }, [value]);

    return ref.current;
}

export default usePrevious;
