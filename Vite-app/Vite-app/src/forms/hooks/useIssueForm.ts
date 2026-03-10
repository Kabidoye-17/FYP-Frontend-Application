import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { issueSchema, issueDefaultValues, type IssueFormData } from "../schemas/issueSchema";

interface UseIssueFormOptions {
    defaultValues?: Partial<IssueFormData>;
    onSubmit: (data: IssueFormData) => void | Promise<void>;
}

export function useIssueForm({ defaultValues, onSubmit }: UseIssueFormOptions) {
    const form = useForm<IssueFormData>({
        resolver: zodResolver(issueSchema),
        defaultValues: {
            ...issueDefaultValues,
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
