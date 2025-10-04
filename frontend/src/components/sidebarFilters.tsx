import { Box, Typography, Button } from "@mui/material";

export default function SidebarFilters() {
    const filters = ["filter 1", "filter 2", "filter 3", "filter 4"];

    return (
        <Box
            sx={(theme) => ({
                width: 220,
                borderRight: `1px solid ${theme.palette.backgroundPage.main}`,
                bgcolor: theme.palette.backgroundPage.main,
                display: "flex",
                flexDirection: "column",
                p: 2,
            })}
        >
            <Typography
                variant="h6"
                sx={{ color: "primary.main", mb: 2, textAlign: "center" }}
            >
                CNC
            </Typography>

            {filters.map((filter) => (
                <Button
                    key={filter}
                    variant="text"
                    color="error"
                    sx={(theme) => ({
                        justifyContent: "flex-start",
                        mb: 1,
                        textTransform: "none",
                        border: `1px solid ${theme.palette.backgroundPage.main}`,
                        borderRadius: 0,
                        "&:hover": {
                            backgroundColor: theme.palette.backgroundPage.main,
                        },
                    })}
                >
                    {filter}
                </Button>
            ))}
        </Box>
    );
}
