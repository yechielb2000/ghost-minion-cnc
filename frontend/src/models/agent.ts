export type AgentStatus = "Alive" | "Dead";

export const STATUS_OPTIONS: AgentStatus[] = ["Alive", "Dead"]
export const OS_OPTIONS = ['Windows 10', 'Linux Ubuntu', 'macOS Ventura', 'FreeBSD'];

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

export interface PartialAgent {
    id?: string;
    hostname?: string;
    ip?: string;
    os?: string;
    status?: AgentStatus;
    lastSeen?: number;
    version?: string;
    tags?: string[];
}