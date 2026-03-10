import styled from "styled-components";
import Button from "../../design_system/Button";
import Icon from "../../design_system/Icon";

interface FormActionsProps {
    onCancel?: () => void;
    onSubmit?: () => void;
    submitLabel?: string;
    cancelLabel?: string;
    isSubmitting?: boolean;
    isValid?: boolean;
    align?: "left" | "right" | "center" | "space-between";
}

const Container = styled.div<{ $align: string }>`
    display: flex;
    gap: 0.75rem;
    margin-top: 1.5rem;
    padding-top: 1rem;
    border-top: 1px solid var(--border-color);
    justify-content: ${({ $align }) =>
        $align === "left"
            ? "flex-start"
            : $align === "right"
            ? "flex-end"
            : $align === "center"
            ? "center"
            : "space-between"};
`;

function FormActions({
    onCancel,
    onSubmit,
    submitLabel = "Save",
    cancelLabel = "Cancel",
    isSubmitting = false,
    isValid = true,
    align = "right",
}: Readonly<FormActionsProps>) {
    return (
        <Container $align={align}>
            {onCancel && (
                <Button
                    backgroundColor="var(--white)"
                    color="var(--text-primary)"
                    onClick={onCancel}
                    disabled={isSubmitting}
                >
                    {cancelLabel}
                </Button>
            )}
            {onSubmit && (
                <Button
                    icon={
                        isSubmitting ? (
                            <Icon name="CircleNotch" size={14} color="var(--white)" weight="bold" />
                        ) : (
                            <Icon name="Check" size={14} color="var(--white)" weight="bold" />
                        )
                    }
                    backgroundColor="var(--purple)"
                    color="var(--white)"
                    onClick={onSubmit}
                    disabled={!isValid || isSubmitting}
                >
                    {isSubmitting ? "Saving..." : submitLabel}
                </Button>
            )}
        </Container>
    );
}

export default FormActions;
