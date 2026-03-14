/**
 * Custom hooks barrel export
 * Import all hooks from a single location
 */

// Query hooks (TanStack Query)
export * from "./queries";

// Utility hooks
export { useDebounce, default as useDebounceDefault } from "./useDebounce";
export { useLocalStorage, default as useLocalStorageDefault } from "./useLocalStorage";
export {
    useMediaQuery,
    useIsMobile,
    useIsTablet,
    useIsDesktop,
    usePrefersReducedMotion,
    usePrefersDarkMode,
    default as useMediaQueryDefault,
} from "./useMediaQuery";
export { useOnClickOutside, default as useOnClickOutsideDefault } from "./useOnClickOutside";
export { useKeyPress, useCmdKey, default as useKeyPressDefault } from "./useKeyPress";
export { useToggle, default as useToggleDefault } from "./useToggle";
export { usePrevious, default as usePreviousDefault } from "./usePrevious";
export { useAsync, default as useAsyncDefault } from "./useAsync";
export { useCopyToClipboard, default as useCopyToClipboardDefault } from "./useCopyToClipboard";
export { useWindowSize, default as useWindowSizeDefault } from "./useWindowSize";
