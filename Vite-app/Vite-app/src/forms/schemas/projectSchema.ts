import { z } from "zod";

const statusValues = ["active", "paused", "completed", "archived"] as const;

export const projectSchema = z.object({
    name: z
        .string()
        .min(1, "Project name is required")
        .max(100, "Name must be less than 100 characters"),
    description: z.string().max(500, "Description must be less than 500 characters").optional(),
    status: z.enum(statusValues, {
        message: "Please select a status",
    }),
    color: z.string().regex(/^var\(--\w+\)$|^#[0-9a-fA-F]{6}$/, "Invalid color format"),
    leadId: z.string().nullable().optional(),
    memberIds: z.array(z.string()).optional(),
    startDate: z.date().nullable().optional(),
    targetDate: z.date().nullable().optional(),
});

export type ProjectFormData = z.infer<typeof projectSchema>;

export const projectDefaultValues: ProjectFormData = {
    name: "",
    description: "",
    status: "active",
    color: "var(--purple)",
    leadId: null,
    memberIds: [],
    startDate: null,
    targetDate: null,
};
