export type TaskStatus = "pending" | "sent" | "completed" | "failed" | 'expired';

export interface Task {
    id: string;
    agentId: string;
    type: string;
    payload?: any;
    status: TaskStatus;
    createdAt: number;
    updatedAt: number;
}