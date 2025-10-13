import type { Agent, AgentStatus } from "../../models/Agent";

export const mockAgents: Agent[] = [
    {
        id: "1",
        hostname: "host-alpha",
        ip: "192.168.1.10",
        os: "Windows 10",
        status: "Alive" as AgentStatus,
        lastSeen: 1700000000000,
        version: "1.0.2",
        tags: ["web", "database", "web", "database", "web", "database", "web", "database", "web", "database", "web", "database", "web", "database", "web", "database"],
    },
    {
        id: "2",
        hostname: "host-bravo",
        ip: "192.168.1.11",
        os: "Ubuntu 22.04",
        status: "Dead" as AgentStatus,
        lastSeen: 1699990000000,
        version: "1.1.0",
        tags: ["backend"],
    },
    {
        id: "3",
        hostname: "host-charlie",
        ip: "192.168.1.12",
        os: "macOS Monterey",
        status: "Alive" as AgentStatus,
        lastSeen: 1700012345678,
        tags: ["frontend", "test"],
    },
    {
        id: "4",
        hostname: "host-delta",
        ip: "192.168.1.13",
        os: "Windows 11",
        status: "Alive" as AgentStatus,
        lastSeen: 1699987654321,
        version: "2.0.0",
        tags: [],
    },
    {
        id: "5",
        hostname: "host-echo",
        ip: "192.168.1.14",
        os: "Debian 12",
        status: "Dead" as AgentStatus,
        lastSeen: 1700023456789,
        version: "1.0.0",
        tags: ["production"],
    }
];
