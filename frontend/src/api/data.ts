import type { Agent } from "../models/Agent";
import { api } from "./http";

export const getAgentData = async (agentId: string, type?: string): Promise<Agent[]> => {
    const params: Record<string, string> = {};
    if (type) params.type = type;

    const { data } = await api.get(`/agents/${agentId}/data`, { params });
    return data;
};