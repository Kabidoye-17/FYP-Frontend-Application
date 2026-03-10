import { z } from "zod";

export const commentSchema = z.object({
    content: z
        .string()
        .min(1, "Comment cannot be empty")
        .max(5000, "Comment must be less than 5000 characters"),
    mentions: z.array(z.string()).optional(),
});

export type CommentFormData = z.infer<typeof commentSchema>;

export const commentDefaultValues: CommentFormData = {
    content: "",
    mentions: [],
};
