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
            variant="outlined"
            color="primary"
            sx={(theme) => ({
                borderRadius: '8px',
                ":hover": {
                    color: 'white',
                    backgroundColor: theme.palette.primary.main
                }

            })}
        />
    );
}