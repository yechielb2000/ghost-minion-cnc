import { Grid, Box } from "@mui/material";
import Sidebar from "./Sidebar";
import DataViewer from "./DataViewer";
import AgentInfo from "./AgentInfo";
import TaskHistory from "./TaskHistory";

const AgentDetailsPage = () => {
    return (
        <Grid container spacing={2} sx={{ height: "100vh" }}>
            {/* Left Sidebar */}
            <Grid item xs={2} >
                <Sidebar />
            </Grid>

            {/* Main Content */}
            <Grid item xs={7} >
                <DataViewer />
            </Grid>

            {/* Right Sidebar */}
            <Grid item xs={3} >
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <AgentInfo />
                    < TaskHistory />
                    <Box sx={{ border: "1px dashed grey", p: 2, textAlign: "center" }}>
                        TODO: Extra widget(suggestions: Quick Actions / Recent Alerts / Notes)
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
};

export default AgentDetailsPage;
