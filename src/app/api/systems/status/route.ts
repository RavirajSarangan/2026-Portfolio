import { NextResponse } from 'next/server';

export async function GET() {
    // In a real scenario, this would fetch from UptimeRobot, GitHub, Vercel, etc.
    // For now, we simulate dynamic data to verify the UI's reaction.

    const systems = [
        {
            id: "isdn-core",
            name: "ISDN Logistics Core",
            status: "online",
            uptime: "99.98%",
            latency: `${Math.floor(Math.random() * 15) + 15}ms`,
            description: "Supply chain management & tracking system."
        },
        {
            id: "rdc-nexus",
            name: "RDC Inventory Nexus",
            status: "online",
            uptime: "100%",
            latency: `${Math.floor(Math.random() * 10) + 8}ms`,
            description: "Real-time stock synchronization across regions."
        },
        {
            id: "sales-portal",
            name: "Sales Representative Portal",
            status: Math.random() > 0.8 ? "maintenance" : "online",
            uptime: "98.5%",
            latency: Math.random() > 0.8 ? "--" : `${Math.floor(Math.random() * 20) + 30}ms`,
            description: "Order entry and customer relationship management."
        },
        {
            id: "auth-sso",
            name: "Auth Layer (SSO)",
            status: "online",
            uptime: "99.99%",
            latency: `${Math.floor(Math.random() * 10) + 40}ms`,
            description: "Unified identity provider for the ecosystem."
        }
    ];

    const logs = [
        { time: new Date().toLocaleTimeString(), msg: "ISDN Core: Syncing 142 localized ledger entries...", type: "info" },
        { time: new Date(Date.now() - 60000).toLocaleTimeString(), msg: "RDC Nexus: Region 'West-1' integrity check PASSED.", type: "success" },
        { time: new Date(Date.now() - 120000).toLocaleTimeString(), msg: "SSO Provider: New identity token issued for user ID [vnt_094].", type: "info" },
        { time: new Date(Date.now() - 300000).toLocaleTimeString(), msg: "WARNING: Latency spike detected in 'Creative' asset delivery network.", type: "warning" },
    ];

    return NextResponse.json({ systems, logs });
}
