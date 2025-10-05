import { Box, Typography } from "@mui/material";
import AgentCard from "../../components/AgentCard";
import type { Agent } from "../../models/Agent";

interface AgentsListProps {
    agents: Agent[];
}

export default function AgentsList({ agents }: AgentsListProps) {
    if (!agents.length) {
        return (
            <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
                No agents found.
            </Typography>
        );
    }

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {agents.map((agent) => (
                <AgentCard key={agent.id} agent={agent} />
            ))}
        </Box>
    );
}
