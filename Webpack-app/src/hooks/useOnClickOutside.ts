import { useEffect, useRef, type RefObject } from "react";

type EventType = MouseEvent | TouchEvent;

/**
 * Detects clicks outside of a referenced element
 * Perfect for closing dropdowns, modals, and popovers
 *
 * @param handler - Callback to run when clicking outside
 * @returns ref to attach to the element
 *
 * @example
 * function Dropdown() {
 *   const [isOpen, setIsOpen] = useState(false);
 *   const ref = useOnClickOutside(() => setIsOpen(false));
 *
 *   return (
 *     <div ref={ref}>
 *       {isOpen && <DropdownContent />}
 *     </div>
 *   );
 * }
 */
export function useOnClickOutside<T extends HTMLElement = HTMLElement>(
    handler: (event: EventType) => void
): RefObject<T | null> {
    const ref = useRef<T>(null);

    useEffect(() => {
        const listener = (event: EventType) => {
            const el = ref.current;

            // Do nothing if clicking ref's element or descendent elements
            if (!el || el.contains(event.target as Node)) {
                return;
            }

            handler(event);
        };

        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);

        return () => {
            document.removeEventListener("mousedown", listener);
            document.removeEventListener("touchstart", listener);
        };
    }, [handler]);

    return ref;
}

export default useOnClickOutside;
