import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormData } from "../schemas/userSchema";

interface UseLoginFormOptions {
    onSubmit: (data: LoginFormData) => void | Promise<void>;
}

export function useLoginForm({ onSubmit }: UseLoginFormOptions) {
    const form = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
        mode: "onBlur",
    });

    const handleSubmit = form.handleSubmit(async (data) => {
        try {
            await onSubmit(data);
        } catch (error) {
            console.error("Login error:", error);
        }
    });

    return {
        ...form,
        handleSubmit,
        isValid: form.formState.isValid,
        isSubmitting: form.formState.isSubmitting,
    };
}
