import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { projectSchema, projectDefaultValues, type ProjectFormData } from "../schemas/projectSchema";

interface UseProjectFormOptions {
    defaultValues?: Partial<ProjectFormData>;
    onSubmit: (data: ProjectFormData) => void | Promise<void>;
}

export function useProjectForm({ defaultValues, onSubmit }: UseProjectFormOptions) {
    const form = useForm<ProjectFormData>({
        resolver: zodResolver(projectSchema),
        defaultValues: {
            ...projectDefaultValues,
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
