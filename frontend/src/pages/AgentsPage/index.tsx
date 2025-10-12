import { useState, useEffect, useCallback } from "react";
import { Box, CircularProgress } from "@mui/material"; // Removed ListItem, not used
import Grid from "@mui/material/Grid"; // Keep this specific import to avoid type errors

import { AgentsFiltersSidebar } from "./AgentFilterSidebar";
import SearchBar from "../../components/SearchBar";
import AgentsList from "./AgentsList";
import type { Agent } from "../../models/Agent";

export default function AgentsPage() {
    const [agents, setAgents] = useState<Agent[]>([]);
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
        <Grid container>
            <Grid size='auto' marginRight={5}>
                <AgentsFiltersSidebar filters={filters} onChange={setFilters} />
            </Grid>
            <Grid size='auto'>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <SearchBar value={search} onChange={setSearch} onSearch={fetchAgents} />
                    {loading ? (
                        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                            <CircularProgress />
                        </Box>
                    ) : (
                        <AgentsList agents={agents} />
                    )}
                </Box>
            </Grid>
        </Grid >
    );
}