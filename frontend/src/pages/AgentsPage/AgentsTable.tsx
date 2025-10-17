import React, { useMemo, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    TextField,
    Select,
    MenuItem,
    Paper,
    FormControl,
    Box,
    Stack,
    Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import type { Agent } from "../../models/Agent";
import { STATUS_OPTIONS } from "../../models/Agent";
import { formatLastSeen } from "../../utils/datatime";
import { CustomChip } from "../../components/CustomChip";
import { Link as RouterLink } from 'react-router-dom';
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import TaskOutlinedIcon from '@mui/icons-material/TaskOutlined';


interface AgentsTableProps {
    agents: Agent[];
}

const AgentsTable: React.FC<AgentsTableProps> = ({ agents }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const [filters, setFilters] = useState({
        id: "",
        hostname: "",
        ip: "",
        os: "",
        status: "",
        version: "",
        tags: "",
        lastSeenStart: null as Dayjs | null,
        lastSeenEnd: null as Dayjs | null,
    });

    const handleFilterChange = (field: string, value: any) => {
        setFilters((prev) => ({ ...prev, [field]: value }));
        setPage(0);
    };

    const filteredAgents = useMemo(() => {
        return agents.filter((a) => {
            const start = filters.lastSeenStart?.startOf("day");
            const end = filters.lastSeenEnd?.endOf("day");
            const lastSeen = dayjs(a.lastSeen * 1000);

            // Date filter
            if (start && lastSeen.isBefore(start)) return false;
            if (end && lastSeen.isAfter(end)) return false;

            // Text filters
            return Object.entries(filters).every(([key, value]) => {
                if (["lastSeenStart", "lastSeenEnd"].includes(key)) return true;
                if (!value) return true;
                const fieldValue = (a as any)[key];
                if (Array.isArray(fieldValue)) {
                    return fieldValue.join(", ").toLowerCase().includes(value.toString().toLowerCase());
                }
                return fieldValue?.toString().toLowerCase().includes(value.toString().toLowerCase());
            });
        });
    }, [agents, filters]);

    const paginatedAgents = useMemo(() => {
        const start = page * rowsPerPage;
        return filteredAgents.slice(start, start + rowsPerPage);
    }, [filteredAgents, page, rowsPerPage]);

    return (
        <Paper sx={{ py: 5, px: 20 }}>
            <TableContainer>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ width: 100 }}>
                                <Box display="flex" flexDirection="column">
                                    <TextField
                                        value={filters.id}
                                        onChange={(e) => handleFilterChange("id", e.target.value)}
                                        variant="standard"
                                        placeholder="ID"
                                        fullWidth
                                    />
                                </Box>
                            </TableCell>
                            <TableCell sx={{ width: 100 }}>
                                <Box display="flex" flexDirection="column">
                                    <TextField
                                        value={filters.hostname}
                                        onChange={(e) => handleFilterChange("hostname", e.target.value)}
                                        variant="standard"
                                        placeholder="Hostname"
                                        fullWidth
                                    />
                                </Box>
                            </TableCell>
                            <TableCell sx={{ width: 100 }}>
                                <Box display="flex" flexDirection="column">
                                    <TextField
                                        value={filters.ip}
                                        onChange={(e) => handleFilterChange("ip", e.target.value)}
                                        variant="standard"
                                        placeholder="IP Address"
                                        fullWidth
                                    />
                                </Box>
                            </TableCell>
                            <TableCell>
                                <Box display="flex" flexDirection="column">
                                    <TextField
                                        value={filters.os}
                                        onChange={(e) => handleFilterChange("os", e.target.value)}
                                        variant="standard"
                                        placeholder="Operating System"
                                        fullWidth
                                    />
                                </Box>
                            </TableCell>
                            <TableCell sx={{ width: 100 }}>
                                <Box display="flex" flexDirection="column">
                                    <FormControl variant="standard" fullWidth>
                                        <Select
                                            value={filters.status}
                                            onChange={(e) => handleFilterChange("status", e.target.value)}
                                            displayEmpty
                                        >
                                            <MenuItem value="">Status</MenuItem>
                                            {Object.values(STATUS_OPTIONS).map((status) => (
                                                <MenuItem key={status} value={status}>
                                                    {status}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Box>
                            </TableCell>
                            <TableCell sx={{ width: 100 }}>
                                <Stack spacing={0.5} sx={{ width: 170 }}>
                                    <DatePicker
                                        label="From"
                                        value={filters.lastSeenStart}
                                        onChange={(newValue) =>
                                            handleFilterChange("lastSeenStart", newValue)
                                        }
                                        slotProps={{ textField: { size: "small" } }}
                                    />
                                    <DatePicker
                                        label="To"
                                        value={filters.lastSeenEnd}
                                        onChange={(newValue) =>
                                            handleFilterChange("lastSeenEnd", newValue)
                                        }
                                        slotProps={{ textField: { size: "small" } }}
                                    />
                                </Stack>
                            </TableCell>
                            <TableCell sx={{ width: 100 }}>
                                <TextField
                                    value={filters.version}
                                    onChange={(e) => handleFilterChange("version", e.target.value)}
                                    variant="standard"
                                    placeholder="Version"
                                    fullWidth
                                />
                            </TableCell>
                            <TableCell sx={{ width: 100 }}>
                                <TextField
                                    value={filters.tags}
                                    onChange={(e) => handleFilterChange("tags", e.target.value)}
                                    variant="standard"
                                    placeholder="Tags"
                                    fullWidth
                                />
                            </TableCell>
                            <TableCell>
                            </TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {paginatedAgents.map((agent) => (
                            <TableRow key={agent.id}>
                                <TableCell align="center">{agent.id}</TableCell>
                                <TableCell align="center">{agent.hostname}</TableCell>
                                <TableCell align="center">{agent.ip}</TableCell>
                                <TableCell align="center">{agent.os}</TableCell>
                                <TableCell align="center">{agent.status}</TableCell>
                                <TableCell align="center" title={new Date(agent.lastSeen * 1000).toLocaleString()}>
                                    {formatLastSeen(agent.lastSeen)}
                                </TableCell>
                                <TableCell align="center">{agent.version || "-"}</TableCell>
                                <TableCell align="center">
                                    <Stack
                                        direction='row'
                                        flexWrap='wrap'
                                        alignItems='flex-start'>
                                        {agent.tags?.map((tag) => {
                                            return (
                                                <Box mr={0.5} my={0.2}>
                                                    <CustomChip key={tag} label={tag} />
                                                </Box>
                                            )
                                        })}
                                    </Stack>
                                </TableCell>
                                <TableCell>
                                    <Stack spacing={0.5}>
                                        <RouterLink
                                            key={agent.id}
                                            to={`/agents/${agent.id}`}>
                                            <ReadMoreIcon titleAccess='Agent Info' sx={(theme) => ({
                                                color: theme.palette.greySpecial.main,
                                                ":hover": {
                                                    color: theme.palette.primary.main
                                                }
                                            })} />
                                        </RouterLink>
                                        <RouterLink
                                            key={agent.id}
                                            to={`/agents/${agent.id}/tasks`}>
                                            <TaskOutlinedIcon titleAccess="Agent Tasks" sx={(theme) => ({
                                                color: theme.palette.greySpecial.main,
                                                ":hover": {
                                                    color: theme.palette.primary.main
                                                }
                                            })} />
                                        </RouterLink>
                                    </Stack>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <TablePagination
                    component="div"
                    count={filteredAgents.length}
                    page={page}
                    onPageChange={(_, newPage) => setPage(newPage)}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={(e) => {
                        setRowsPerPage(parseInt(e.target.value, 10));
                        setPage(0);
                    }}
                    rowsPerPageOptions={[5, 10, 25, 50]}
                />
            </TableContainer>
        </Paper>
    );
};

export default AgentsTable;
