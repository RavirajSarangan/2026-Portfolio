import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validations";

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Validate the request body using Zod
        const result = contactSchema.safeParse(body);

        if (!result.success) {
            return NextResponse.json(
                { error: "Invalid form data", details: result.error.format() },
                { status: 400 }
            );
        }

        // Here you would typically send an email (e.g., using Resend or Postmark)
        // or save the data to a database.
        // For now, we'll just simulate a successful submission.
        console.log("Form submission received:", result.data);

        // Add a small delay to simulate network latency
        await new Promise((resolve) => setTimeout(resolve, 1000));

        return NextResponse.json(
            { message: "Thank you for your message. I'll get back to you soon!" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Contact form error:", error);
        return NextResponse.json(
            { error: "Something went wrong. Please try again later." },
            { status: 500 }
        );
    }
}
