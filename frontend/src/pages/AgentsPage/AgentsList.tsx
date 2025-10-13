import { Stack, Typography } from "@mui/material";
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
        <Stack spacing={2}>
            {
                agents.map((agent) => <AgentCard key={agent.id} agent={agent} />)
            }
        </Stack >
    );
}
