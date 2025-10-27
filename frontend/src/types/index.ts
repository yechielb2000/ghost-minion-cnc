export type AgentStatus = "online" | "offline" | "error";

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

export type TaskStatus = "pending" | "sent" | "completed" | "failed" | "expired";

export interface Task {
    id: string;
    agentId: string;
    type: string;
    payload?: any;
    status: TaskStatus;
    createdAt: number;
    updatedAt: number;
}

// Agent Info Data Types
export interface Command {
    id: number;
    created_at: number;
    collected_at: number;
    command: string;
    output: string;
}

export interface Keylog {
    id: number;
    created_at: number;
    collected_at: number;
    keylog: string;
}

export interface Screenshot {
    image_link: string;
}

export interface Telemetry {
    id: number;
    created_at: number;
    collected_at: number;
    agent_id: string;
    updated_at: number;
}
