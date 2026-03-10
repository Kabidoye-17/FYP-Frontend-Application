import { useState, useCallback, useEffect } from "react";

interface AsyncState<T> {
    data: T | null;
    error: Error | null;
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
}

interface UseAsyncReturn<T> extends AsyncState<T> {
    execute: () => Promise<void>;
    reset: () => void;
}

/**
 * Manages async function state (loading, error, data)
 * Simpler alternative to TanStack Query for one-off requests
 *
 * @param asyncFunction - Async function to execute
 * @param immediate - Whether to execute immediately on mount (default: true)
 * @returns Object with data, loading, error states and execute function
 *
 * @example
 * const { data, isLoading, error, execute } = useAsync(
 *   () => fetch("/api/user").then(r => r.json()),
 *   true // execute immediately
 * );
 *
 * if (isLoading) return <Spinner />;
 * if (error) return <Error message={error.message} />;
 * return <User data={data} />;
 */
export function useAsync<T>(
    asyncFunction: () => Promise<T>,
    immediate: boolean = true
): UseAsyncReturn<T> {
    const [state, setState] = useState<AsyncState<T>>({
        data: null,
        error: null,
        isLoading: immediate,
        isError: false,
        isSuccess: false,
    });

    const execute = useCallback(async () => {
        setState({
            data: null,
            error: null,
            isLoading: true,
            isError: false,
            isSuccess: false,
        });

        try {
            const data = await asyncFunction();
            setState({
                data,
                error: null,
                isLoading: false,
                isError: false,
                isSuccess: true,
            });
        } catch (error) {
            setState({
                data: null,
                error: error instanceof Error ? error : new Error(String(error)),
                isLoading: false,
                isError: true,
                isSuccess: false,
            });
        }
    }, [asyncFunction]);

    const reset = useCallback(() => {
        setState({
            data: null,
            error: null,
            isLoading: false,
            isError: false,
            isSuccess: false,
        });
    }, []);

    useEffect(() => {
        if (immediate) {
            execute();
        }
    }, [immediate, execute]);

    return { ...state, execute, reset };
}

export default useAsync;
