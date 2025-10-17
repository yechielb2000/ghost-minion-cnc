import { useEffect, useState } from "react";
import type { Agent } from "../models/Agent";

export function useAgent(id: string | undefined) {
    const [agent, setAgent] = useState<Agent | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;

        setLoading(true);
        setError(null);
        // TODO: replace the api route
        fetch(`/api/agents/${id}`)
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch agent");
                return res.json();
            })
            .then((data: Agent) => setAgent(data))
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, [id]);

    return { agent, loading, error };
}
