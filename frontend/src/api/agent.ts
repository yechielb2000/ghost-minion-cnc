import { api } from "./http";
import type { Agent } from "../models/agent";

// Get one agent
export async function getAgent(id: string) {
    const res = await api.get<Agent>(`/agents/${id}`);
    return res.data;
}

// List agents
export async function listAgents(params?: { page?: number; limit?: number; search?: string }) {
    const res = await api.get<Agent[]>("/agents", { params });
    return res.data;
}

// (optional) Get agent telemetry
export async function getAgentTelemetry(id: string) {
    const res = await api.get(`/agents/${id}/telemetry`);
    return res.data; // type later if you define Telemetry model
}
