import { useParams } from "react-router-dom";
import { CircularProgress, Typography } from "@mui/material";
import { useAgent } from "../../hooks/useAgent";

export default function AgentTasksPage() {
    const { id } = useParams<{ id: string }>()
    const { agent, loading, error } = useAgent(id);

    if (loading) return <CircularProgress />;
    if (error) return <Typography color="error">{error}</Typography>;
    if (!agent) return <Typography>Agent not found</Typography>;
    return (
        <></>
    );
}
