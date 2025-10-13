import React, { useCallback } from 'react';
import { Box, Typography, FormControlLabel, Checkbox, TextField, Divider, Stack } from "@mui/material";
import { Monitor, AccessTime } from '@mui/icons-material';
import dayjs from 'dayjs';
import { OS_OPTIONS, STATUS_OPTIONS } from '../../models/Agent';
import AppTextField from '../../components/Inputs/TextField';
import AppDateTimeRange from '../../components/Inputs/DatetimeRange';
import Title from '../../components/Title';


interface AgentsFiltersSidebarProps {
    filters: Record<string, any>;
    onChange: (f: Record<string, any>) => void;
}

export const AgentsFiltersSidebar = React.memo(({ filters, onChange }: AgentsFiltersSidebarProps) => {

    const handleTextChange = useCallback((key: string, value: string) => {
        onChange({ ...filters, [key]: value });
    }, [filters, onChange]);

    const toggleMultiSelect = useCallback((key: string, option: string) => {
        const selected = filters[key] || [];
        const updated = selected.includes(option)
            ? selected.filter((s: string) => s !== option)
            : [...selected, option];

        // Remove the key if the array is empty
        if (updated.length === 0) {
            const { [key]: _, ...rest } = filters;
            onChange(rest);
        } else {
            onChange({ ...filters, [key]: updated });
        }
    }, [filters, onChange]);

    return (
        <Stack
            spacing={3}
            sx={(theme) => ({
                paddingLeft: 3,
                borderRight: `2px solid ${theme.palette.primary.main}`,
                maxWidth: 300,
            })}
        >
            <Title title='CNC' />

            <Stack spacing={3}>
                <AppTextField
                    label='Hostname'
                    value={filters.hostname || ''}
                    onChange={(val) => handleTextChange("hostname", val)}
                />
                <AppTextField
                    label='IP Address'
                    value={filters.ip || ''}
                    onChange={(val) => handleTextChange("ip", val)}
                />
            </Stack>

            <Stack>
                <Typography
                    variant="subtitle1"
                    sx={{ display: "flex", alignItems: "center", fontWeight: 500 }}>
                    <AccessTime fontSize="small" sx={{ mr: 1 }} /> Last Seen
                </Typography>

                <AppDateTimeRange
                    value={{
                        from: filters.lastSeen?.min ? dayjs(Number(filters.lastSeen.min)) : null,
                        to: filters.lastSeen?.max ? dayjs(Number(filters.lastSeen.max)) : null,
                    }}
                    onChange={(range) => {
                        onChange({
                            ...filters,
                            lastSeen: {
                                min: range.from ? range.from.valueOf() : null,
                                max: range.to ? range.to.valueOf() : null,
                            },
                        });
                    }}
                />
            </Stack>


            <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" sx={{ display: 'flex', alignItems: 'center', mb: 1, fontWeight: 500 }}>
                    <Monitor fontSize="small" sx={{ mr: 1 }} /> Agent Status
                </Typography>
                {STATUS_OPTIONS.map((status) => (
                    <FormControlLabel
                        key={status}
                        control={
                            <Checkbox
                                size="small"
                                checked={filters.status?.includes(status) || false}
                                onChange={() => toggleMultiSelect("status", status)}
                            />
                        }
                        label={<Typography variant="body2">{status.charAt(0).toUpperCase() + status.slice(1)}</Typography>}
                    />
                ))}
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" sx={{ display: 'flex', alignItems: 'center', mb: 1, fontWeight: 500 }}>
                    <Monitor fontSize="small" sx={{ mr: 1 }} /> Operating System
                </Typography>
                {OS_OPTIONS.map((os) => (
                    <FormControlLabel
                        key={os}
                        control={
                            <Checkbox
                                size="small"
                                checked={filters.os?.includes(os) || false}
                                onChange={() => toggleMultiSelect("os", os)}
                            />
                        }
                        label={<Typography variant="body2">{os}</Typography>}
                    />
                ))}
            </Box>

        </Stack >
    );
});