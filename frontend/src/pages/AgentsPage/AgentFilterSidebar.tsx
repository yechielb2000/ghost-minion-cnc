import React, { useCallback } from 'react';
import { Box, Typography, FormControlLabel, Checkbox, TextField, Divider, useTheme } from "@mui/material";
import { Search, Monitor, AccessTime } from '@mui/icons-material';
import { OS_OPTIONS, STATUS_OPTIONS } from '../../models/Agent';

interface AgentsFiltersSidebarProps {
    filters: Record<string, any>;
    onChange: (f: Record<string, any>) => void;
}

export const AgentsFiltersSidebar = React.memo(({ filters, onChange }: AgentsFiltersSidebarProps) => {

    // Handler for text inputs (hostname, ip)
    const handleTextChange = useCallback((key: string, value: string) => {
        onChange({ ...filters, [key]: value });
    }, [filters, onChange]);

    // Handler for range inputs (lastSeen min/max)
    const handleRangeChange = useCallback((key: string, subKey: 'min' | 'max', value: string) => {
        // Convert input string to number (timestamp) or null
        const numValue = value ? parseInt(value, 10) : null;

        // Update the specific min/max value within the nested object
        const newRange = {
            ...(filters[key] || {}), // Start with existing range object
            [subKey]: numValue
        };

        // Remove the key entirely if both min and max are null
        if (newRange.min === null && newRange.max === null) {
            const { [key]: _, ...rest } = filters;
            onChange(rest);
        } else {
            onChange({ ...filters, [key]: newRange });
        }
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

    const theme = useTheme();

    return (
        <Box
            sx={{
                p: 3,
                borderRight: "1px solid",
                borderColor: theme.palette.divider,
                height: "100%",
                minWidth: 280,
                maxWidth: 300,
                bgcolor: theme.palette.background.default,
                overflowY: 'auto',
                transition: 'width 0.3s',
            }}
        >
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, color: theme.palette.primary.main }}>
                Agent Filters
            </Typography>

            <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" sx={{ display: 'flex', alignItems: 'center', mb: 1, fontWeight: 500 }}>
                    <Search fontSize="small" sx={{ mr: 1 }} /> Hostname / IP
                </Typography>
                <TextField
                    label="Search Hostname"
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={filters.hostname || ''}
                    onChange={(e) => handleTextChange("hostname", e.target.value)}
                    sx={{ mb: 1 }}
                />
                <TextField
                    label="Search IP Address"
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={filters.ip || ''}
                    onChange={(e) => handleTextChange("ip", e.target.value)}
                />
            </Box>

            <Divider sx={{ my: 2 }} />

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

            <Divider sx={{ my: 2 }} />

            <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" sx={{ display: 'flex', alignItems: 'center', mb: 1, fontWeight: 500 }}>
                    <AccessTime fontSize="small" sx={{ mr: 1 }} /> Last Seen (Timestamp)
                </Typography>
                <TextField
                    label="Min Timestamp (e.g., 1700000000000)"
                    variant="outlined"
                    size="small"
                    type="number"
                    fullWidth
                    value={filters.lastSeen?.min !== undefined && filters.lastSeen.min !== null ? filters.lastSeen.min : ''}
                    onChange={(e) => handleRangeChange("lastSeen", "min", e.target.value)}
                    helperText="Enter milliseconds since epoch"
                    sx={{ mb: 1 }}
                />
                <TextField
                    label="Max Timestamp (e.g., 1799999999999)"
                    variant="outlined"
                    size="small"
                    type="number"
                    fullWidth
                    value={filters.lastSeen?.max !== undefined && filters.lastSeen.max !== null ? filters.lastSeen.max : ''}
                    onChange={(e) => handleRangeChange("lastSeen", "max", e.target.value)}
                    helperText="Leave blank for no max/min"
                />
            </Box>

        </Box>
    );
});