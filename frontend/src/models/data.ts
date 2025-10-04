export type DataType =
    | "screenshot"
    | "keylog"
    | "command"
    | "network"
    | "filesystem"
    | "process";

export interface AgentData {
    id: string;
    agentId: string;
    type: DataType;
    collectedAt: string;

    // generic field to hold any payload
    payload: any;
}

// Specialized payloads (optional)
export interface ScreenshotPayload {
    url: string; // API path or base64 string
    width: number;
    height: number;
}

export interface KeylogPayload {
    timestamp: string;
    keys: string;
}

export interface CommandResultPayload {
    command: string;
    output: string;
}
