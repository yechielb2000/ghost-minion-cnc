export type AgentStatus = "online" | "offline";

export interface Agent {
    id: string;
    hostname: string;
    ip: string;
    os: string;
    status: AgentStatus;
    lastSeen: number;
    version?: string;
    tags?: string[];
}