import { z } from "zod";

const statusValues = ["backlog", "todo", "in-progress", "in-review", "done"] as const;
const priorityValues = ["urgent", "high", "medium", "low", "none"] as const;

export const issueSchema = z.object({
    title: z
        .string()
        .min(1, "Title is required")
        .max(200, "Title must be less than 200 characters"),
    description: z.string().optional(),
    status: z.enum(statusValues, {
        message: "Please select a status",
    }),
    priority: z.enum(priorityValues, {
        message: "Please select a priority",
    }),
    assignees: z.array(z.string()).optional(),
    projectId: z.string().nullable().optional(),
    labels: z.array(z.string()).optional(),
    targetDate: z.date().nullable().optional(),
    estimate: z.number().min(0, "Estimate must be positive").optional(),
});

export type IssueFormData = z.infer<typeof issueSchema>;

export const issueDefaultValues: IssueFormData = {
    title: "",
    description: "",
    status: "backlog",
    priority: "medium",
    assignees: [],
    projectId: null,
    labels: [],
    targetDate: null,
    estimate: undefined,
};
