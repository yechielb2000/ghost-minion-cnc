import Chip from "@mui/material/Chip";
import React from "react"

interface CustomChipProps {
    label: string
}

export const CustomChip: React.FC<CustomChipProps> = ({ label }: CustomChipProps) => {
    return (
        <Chip
            label={label}
            size="small"
            color="primary"
            variant="outlined"
            sx={{ borderRadius: '8px' }} />
    );
}