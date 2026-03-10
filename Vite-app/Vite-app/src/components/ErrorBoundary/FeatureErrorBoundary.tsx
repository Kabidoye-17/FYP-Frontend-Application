import { ErrorBoundary } from "react-error-boundary";
import type { ReactNode, ErrorInfo } from "react";
import ErrorFallback from "./ErrorFallback";

interface FeatureErrorBoundaryProps {
    children: ReactNode;
    featureName?: string;
    onError?: (error: unknown, info: ErrorInfo) => void;
}

function FeatureErrorBoundary({
    children,
    featureName = "feature",
    onError,
}: Readonly<FeatureErrorBoundaryProps>) {
    const handleError = (error: unknown, info: ErrorInfo) => {
        console.error(`Error in ${featureName}:`, error);
        onError?.(error, info);
    };

    return (
        <ErrorBoundary
            FallbackComponent={({ error, resetErrorBoundary }) => (
                <ErrorFallback
                    error={error instanceof Error ? error : new Error(String(error))}
                    resetErrorBoundary={resetErrorBoundary}
                    title={`${featureName} failed to load`}
                    description={`There was a problem loading this ${featureName.toLowerCase()}. Please try again.`}
                />
            )}
            onError={handleError}
        >
            {children}
        </ErrorBoundary>
    );
}

export default FeatureErrorBoundary;
