import { z } from "zod";

const statusValues = ["planning", "active", "completed"] as const;

export const sprintSchema = z
    .object({
        name: z
            .string()
            .min(1, "Sprint name is required")
            .max(100, "Name must be less than 100 characters"),
        goal: z.string().max(300, "Goal must be less than 300 characters").optional(),
        status: z.enum(statusValues, {
            message: "Please select a status",
        }),
        startDate: z.date({ message: "Start date is required" }),
        endDate: z.date({ message: "End date is required" }),
        capacity: z.number().min(0, "Capacity must be positive").optional(),
    })
    .refine((data) => data.endDate > data.startDate, {
        message: "End date must be after start date",
        path: ["endDate"],
    });

export type SprintFormData = z.infer<typeof sprintSchema>;

export const sprintDefaultValues: Partial<SprintFormData> = {
    name: "",
    goal: "",
    status: "planning",
    capacity: undefined,
};
