import React from "react";
import { Stack, Typography, useTheme } from "@mui/material";
import { Dayjs } from "dayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

interface AppDateTimeRangeProps {
    value: { from: Dayjs | null; to: Dayjs | null };
    onChange: (value: { from: Dayjs | null; to: Dayjs | null }) => void;
}

const AppDateTimeRange: React.FC<AppDateTimeRangeProps> = ({ value, onChange }) => {
    const theme = useTheme();
    return (
        <Stack spacing={2} alignItems='center'>

            <DateTimePicker
                value={value.from}
                onChange={(val) => onChange({ ...value, from: val })}
                format="YYYY-MM-DD HH:mm"
                slotProps={{
                    textField: {
                        size: "small",
                        fullWidth: true,
                        sx: {
                            "& fieldset": { border: "none !important" },
                            borderBottom: `2px solid ${theme.palette.primary.main}`,
                        },
                    },
                }}
            />

            <Typography>→</Typography>

            <DateTimePicker
                value={value.to}
                onChange={(val) => onChange({ ...value, to: val })}
                format="YYYY-MM-DD HH:mm"
                slotProps={{
                    textField: {
                        size: "small",
                        fullWidth: true,
                        sx: {
                            "& fieldset": { border: "none !important" },
                            borderBottom: `2px solid ${theme.palette.primary.main}`,
                        },
                    },
                }}
            />
        </Stack >
    );
};

export default AppDateTimeRange;
