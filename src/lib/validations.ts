import { z } from "zod";

export const contactSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters").max(50, "Name is too long"),
    email: z.string().email("Invalid email address"),
    projectType: z.enum(["Web Development", "Mobile App", "AI Integration", "UI/UX Design"]),
    message: z.string().min(10, "Message must be at least 10 characters").max(1000, "Message is too long"),
});

export type ContactFormData = z.infer<typeof contactSchema>;
