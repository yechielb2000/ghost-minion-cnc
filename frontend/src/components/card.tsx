import { Card, Box } from "@mui/material";
import type { ReactNode } from "react";


interface GenericCardProps {
    children: ReactNode;
    onClick?: () => void;
    hoverable?: boolean;
}

export default function GenericCard({ children, onClick, hoverable = true }: GenericCardProps) {

    return (
        <Card
            variant="outlined"
            onClick={onClick}
            sx={(theme) => ({
                borderRadius: 2,
                borderColor: theme.palette.primary.main,
                backgroundColor: theme.palette.backgroundPage.main,
                boxShadow: "none",
                px: 2,
                py: 1.2,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                cursor: onClick ? "pointer" : "default",
                transition: "background-color 0.15s, box-shadow 0.15s",
                "&:hover": hoverable
                    ? {
                        backgroundColor: theme.palette.backgroundPage.main,
                        boxShadow: `0 0 0 1px ${theme.palette.backgroundPage.main}`,
                    }
                    : undefined,
            })}
        >
            <Box sx={{ width: "100%", display: "flex", alignItems: "center" }}>{children}</Box>
        </Card>
    );
}
