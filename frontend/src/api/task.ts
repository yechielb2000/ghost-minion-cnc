import { api } from "./http";
import type { Task } from "../models/Task";

// Create Task
export async function createTask(task: Omit<Task, "id" | "createdAt" | "updatedAt" | "status">) {
    const res = await api.post<Task>("/tasks", task);
    return res.data;
}

// Update Task
export async function updateTask(id: string, updates: Partial<Task>) {
    const res = await api.put<Task>(`/tasks/${id}`, updates);
    return res.data;
}

// Delete Task
export async function deleteTask(id: string) {
    await api.delete(`/tasks/${id}`);
    return true;
}

// Get Task
export async function getTask(id: string) {
    const res = await api.get<Task>(`/tasks/${id}`);
    return res.data;
}

// List Tasks for Agent
export async function listTasks(agentId: string) {
    const res = await api.get<Task[]>(`/agents/${agentId}/tasks`);
    return res.data;
}
