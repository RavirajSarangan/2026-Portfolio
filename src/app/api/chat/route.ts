import { NextResponse } from 'next/server';

const KNOWLEDGE_BASE = {
    name: "Sarangan Intelligence",
    owner: "Raviraj Sarangan",
    role: "Foundational Architect & Strategic Developer",
    expertise: ["Next.js", "AI Integration", "3D Web Experiences", "Distributed Systems"],
    projects: [
        { name: "ISDN Logistics Core", description: "A high-performance supply chain management system." },
        { name: "RDC Inventory Nexus", description: "Real-time global stock synchronization system." },
        { name: "Neural Lab", description: "An experimental space for immersive 3D visualizations." }
    ],
    contact: { email: "hello@raviraj.dev", status: "Open for collaborations" }
};

export async function POST(req: Request) {
    try {
        const { messages } = await req.json();
        const lastMessage = messages[messages.length - 1].content.toLowerCase();

        // Simulate thinking time
        await new Promise(resolve => setTimeout(resolve, 1500));

        let response = "I'm analyzing your request within the context of Sarangan's ecosystem. How can I assist you further?";
        let action = null;
        let projectId = null;

        if (lastMessage.includes("generate report") || lastMessage.includes("download metrics")) {
            response = "Direct Action Initialized: Generating an architectural integrity report for ISDN Logistics Core. Transmitting data packets now...";
            action = "GENERATE_REPORT";
        } else if (lastMessage.includes("safe mode") || lastMessage.includes("emergency stop")) {
            response = "Emergency Protocol Delta: Transitioning all system nodes to Safe Mode. Visual synchronization will now minimize.";
            action = "TOGGLE_SAFE_MODE";
        } else if (lastMessage.includes("isdn") || lastMessage.includes("logistics")) {
            response = "Accessing ISDN Architecture. This project focuses on high-performance supply chain management. I've highlighted the relevant node in your Neural Lab.";
            action = "HIGHLIGHT_PROJECT";
            projectId = 1;
        } else if (lastMessage.includes("nexus") || lastMessage.includes("rdc")) {
            response = "Retrieving RDC Nexus data. This core handles real-time global stock synchronization. Node alignment initialized.";
            action = "HIGHLIGHT_PROJECT";
            projectId = 2;
        } else if (lastMessage.includes("neural lab") || lastMessage.includes("graph")) {
            response = "You are currently within the Neural Lab. It is an experimental space for immersive 3D visualizations and agent collaboration.";
            action = "HIGHLIGHT_PROJECT";
            projectId = 3;
        } else if (lastMessage.includes("sarangan") || lastMessage.includes("who are you")) {
            response = "Hello, I am Sarangan. Your strategic digital intelligence. I navigate the architecture built by Raviraj to assist you in real-time.";
        }

        return NextResponse.json({
            role: "assistant",
            content: response,
            action,
            projectId
        });

    } catch (error) {
        return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
    }
}
