import type { AgentData } from "../models/data";
import { api } from "./http";

export const getAgentData = async (agentId: string, type?: string): Promise<AgentData[]> => {
    const params: Record<string, string> = {};
    if (type) params.type = type;

    const { data } = await api.get(`/agents/${agentId}/data`, { params });
    return data;
};