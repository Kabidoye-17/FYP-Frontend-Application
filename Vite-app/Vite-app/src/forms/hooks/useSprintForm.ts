import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { sprintSchema, sprintDefaultValues, type SprintFormData } from "../schemas/sprintSchema";

interface UseSprintFormOptions {
    defaultValues?: Partial<SprintFormData>;
    onSubmit: (data: SprintFormData) => void | Promise<void>;
}

export function useSprintForm({ defaultValues, onSubmit }: UseSprintFormOptions) {
    const form = useForm<SprintFormData>({
        resolver: zodResolver(sprintSchema),
        defaultValues: {
            ...sprintDefaultValues,
            ...defaultValues,
        },
        mode: "onBlur",
    });

    const handleSubmit = form.handleSubmit(async (data) => {
        try {
            await onSubmit(data);
        } catch (error) {
            console.error("Form submission error:", error);
        }
    });

    return {
        ...form,
        handleSubmit,
        isValid: form.formState.isValid,
        isSubmitting: form.formState.isSubmitting,
        isDirty: form.formState.isDirty,
    };
}
