import { CardContent, Typography, Chip, Box } from "@mui/material";
import GenericCard from './card';
import type { Agent } from '../models/agent';


interface AgentCardProps {
    agent: Agent;
    onClick?: () => void;
}

export default function AgentCard({ agent, onClick }: AgentCardProps) {
    return (
        <GenericCard onClick={onClick}>
            {/* Left side */}
            <CardContent sx={{ flex: 1 }}>
                <Typography variant="h6" fontWeight="bold">
                    {agent.hostname}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    IP: {agent.ip}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    OS: {agent.os}
                </Typography>
                {agent.version && (
                    <Typography variant="body2" color="text.disabled">
                        Version: {agent.version}
                    </Typography>
                )}
                {agent.tags && agent.tags.length > 0 && (
                    <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                        {agent.tags.map((tag) => (
                            <Chip key={tag} label={tag} size="small" />
                        ))}
                    </Box>
                )}
            </CardContent>

            {/* Right side */}
            <Box sx={{ textAlign: "right", pr: 2 }}>
                <Chip
                    label={agent.status}
                    sx={{
                        bgcolor:
                            agent.status === "online"
                                ? "success.light"
                                : agent.status === "offline"
                                    ? "error.light"
                                    : agent.status === "idle"
                                        ? "warning.light"
                                        : "grey.400",
                        color: "white",
                        fontWeight: "bold",
                    }}
                />
                <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: "block" }}>
                    Last seen: {new Date(agent.lastSeen).toLocaleString()}
                </Typography>
            </Box>
        </GenericCard>
    );
}