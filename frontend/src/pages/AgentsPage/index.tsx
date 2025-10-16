import { useState, useEffect, useCallback } from "react";
import AgentsTable from "./AgentsTable";
import { mockAgents } from './MockAgents';
import type { Agent } from "../../models/Agent";

export default function AgentsPage() {
    const [agents, setAgents] = useState<Agent[]>(mockAgents);
    const [loading, setLoading] = useState(false);
    const [filters, setFilters] = useState<Record<string, string | string[]>>({});
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetchAgents();
        console.log(filters)
    }, []);

    const fetchAgents = useCallback(async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams();

            if (search) params.set("search", search);
            Object.entries(filters).forEach(([key, value]) => {
                if (Array.isArray(value)) value.forEach((v) => params.append(key, v));
                else if (value) params.set(key, value);
            });

            const res = await fetch(`/api/agents?${params.toString()}`);
            const data = await res.json();
            setAgents(data);
        } catch (err) {
            console.error("Failed to fetch agents", err);
        } finally {
            setLoading(false);
        }
    }, [filters, search]);

    return (
        <AgentsTable agents={agents} />
    );
}