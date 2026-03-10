import { useState, useEffect } from "react";

interface WindowSize {
    width: number;
    height: number;
}

/**
 * Tracks window dimensions with resize listener
 * Useful for responsive layouts that need exact pixel values
 *
 * @returns { width, height } in pixels
 *
 * @example
 * const { width, height } = useWindowSize();
 *
 * return (
 *   <div style={{ height: height - 60 }}>
 *     {width < 768 ? <MobileLayout /> : <DesktopLayout />}
 *   </div>
 * );
 */
export function useWindowSize(): WindowSize {
    const [windowSize, setWindowSize] = useState<WindowSize>(() => ({
        width: typeof window !== "undefined" ? window.innerWidth : 0,
        height: typeof window !== "undefined" ? window.innerHeight : 0,
    }));

    useEffect(() => {
        let timeoutId: ReturnType<typeof setTimeout>;

        const handleResize = () => {
            // Debounce resize events
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                setWindowSize({
                    width: window.innerWidth,
                    height: window.innerHeight,
                });
            }, 100);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            clearTimeout(timeoutId);
        };
    }, []);

    return windowSize;
}

export default useWindowSize;
