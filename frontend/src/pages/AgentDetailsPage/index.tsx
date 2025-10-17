import { CircularProgress, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useAgent } from "../../hooks/useAgent";

export default function AgentDetailsPage() {
    const { id } = useParams<{ id: string }>();
    const { agent, loading, error } = useAgent(id);

    if (loading) return <CircularProgress />;
    if (error) return <Typography color="error">{error}</Typography>;
    if (!agent) return <Typography>Agent not found</Typography>;

    return (
        <></>
    );
}
