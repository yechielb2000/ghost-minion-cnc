import { useState } from "react";
import type { Task, Agent } from "../types";
import {
    Box,
    Flex,
    Grid,
    Heading,
    Text,
    Button,
    Input,
    Textarea,
    Table,
    Badge,
    useDisclosure,
    Dialog,
    Portal,
    CloseButton
} from "@chakra-ui/react";

import { Plus, Edit, Trash2, DeleteIcon, EditIcon } from "lucide-react";
import { GenericSelect } from "../components/select-filter";
interface TasksPageProps {
    tasks: Task[];
    agents: Agent[];
    onCreateTask: (task: Omit<Task, "id" | "createdAt" | "updatedAt">) => void;
    onUpdateTask: (taskId: string, updates: Partial<Task>) => void;
    onDeleteTask: (taskId: string) => void;
}

export function TasksPage({ tasks, agents, onCreateTask, onUpdateTask, onDeleteTask }: TasksPageProps) {
    const [formData, setFormData] = useState({ agentId: "", type: "", payload: "" });
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const [deleteTaskId, setDeleteTaskId] = useState<string | null>(null);
    const [agentFilter, setAgentFilter] = useState("all");
    const [statusFilter, setStatusFilter] = useState("all");

    const createModal = useDisclosure();
    const editModal = useDisclosure();

    const filteredTasks = tasks.filter(task =>
        (agentFilter === "all" || task.agentId === agentFilter) &&
        (statusFilter === "all" || task.status === statusFilter)
    );

    const getStatusColor = (status: string) => {
        switch (status) {
            case "completed": return "green";
            case "sent": return "blue";
            case "pending": return "yellow";
            case "failed": return "red";
            case "expired": return "gray";
            default: return "gray";
        }
    };

    const formatTimestamp = (ts: number) => new Date(ts).toLocaleString();
    const getAgentName = (id: string) => agents.find(a => a.id === id)?.hostname || id;

    const statusCounts = {
        pending: tasks.filter(t => t.status === "pending").length,
        sent: tasks.filter(t => t.status === "sent").length,
        completed: tasks.filter(t => t.status === "completed").length,
        failed: tasks.filter(t => t.status === "failed").length,
    };

    const handleCreateTask = () => {
        if (!formData.agentId || !formData.type) return;
        let payload;
        try { payload = formData.payload ? JSON.parse(formData.payload) : undefined }
        catch { alert("Invalid JSON"); return }
        onCreateTask({ agentId: formData.agentId, type: formData.type, payload, status: "pending" });
        setFormData({ agentId: "", type: "", payload: "" });
        createModal.onClose();
    };

    const handleEditTask = () => {
        if (!editingTask) return;
        let payload;
        try { payload = formData.payload ? JSON.parse(formData.payload) : undefined }
        catch { alert("Invalid JSON"); return }
        onUpdateTask(editingTask.id, { type: formData.type, payload });
        setEditingTask(null);
        setFormData({ agentId: "", type: "", payload: "" });
        editModal.onClose();
    };

    const openEdit = (task: Task) => {
        setEditingTask(task);
        setFormData({ agentId: task.agentId, type: task.type, payload: task.payload ? JSON.stringify(task.payload, null, 2) : "" });
        editModal.onOpen();
    };

    return (
        <Box p={6}>

            {/* Header */}
            <Flex justify="space-between" align="center" mb={6}>
                <Box>
                    <Heading size="lg">Tasks</Heading>
                    <Text color="gray.500">Create and manage tasks for agents</Text>
                </Box>
                <Button colorScheme="blue" onClick={createModal.onOpen}>
                    <Plus style={{ marginRight: 8 }} />
                    Create Task
                </Button>
            </Flex>

            {/* Status Cards */}
            <Grid templateColumns="repeat(4, 1fr)" gap={4} mb={6}>
                {Object.entries(statusCounts).map(([status, count]) => (
                    <Box key={status} p={4} borderWidth={1} borderRadius="md">
                        <Text fontWeight="bold">{status.charAt(0).toUpperCase() + status.slice(1)}</Text>
                        <Text fontSize="2xl">{count}</Text>
                    </Box>
                ))}
            </Grid>

            {/* Filters */}
            <Flex gap={4} mb={4}>
                <GenericSelect
                    items={[
                        { label: "All Agents", value: "all" },
                        ...agents.map(a => ({ label: a.hostname, value: a.id })),
                    ]}
                    value={agentFilter}
                    onChange={setAgentFilter}
                    placeholder="Filter by agent"
                    width="250px"
                />

                <GenericSelect
                    items={[
                        { label: "All Status", value: "all" },
                        { label: "Pending", value: "pending" },
                        { label: "Sent", value: "sent" },
                        { label: "Completed", value: "completed" },
                        { label: "Failed", value: "failed" },
                        { label: "Expired", value: "expired" },
                    ]}
                    value={statusFilter}
                    onChange={setStatusFilter}
                    placeholder="Filter by status"
                    width="180px"
                />
            </Flex>

            {/* Tasks Table */}
            <Table.Root>
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeader>Agent</Table.ColumnHeader>
                        <Table.ColumnHeader>Type</Table.ColumnHeader>
                        <Table.ColumnHeader>Status</Table.ColumnHeader>
                        <Table.ColumnHeader>Created</Table.ColumnHeader>
                        <Table.ColumnHeader>Updated</Table.ColumnHeader>
                        <Table.ColumnHeader>Actions</Table.ColumnHeader>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {filteredTasks.map(task => (
                        <Table.Row key={task.id}>
                            <Table.Cell>{getAgentName(task.agentId)}</Table.Cell>
                            <Table.Cell fontFamily="monospace">{task.type}</Table.Cell>
                            <Table.Cell><Badge colorScheme={getStatusColor(task.status)}>{task.status}</Badge></Table.Cell>
                            <Table.Cell>{formatTimestamp(task.createdAt)}</Table.Cell>
                            <Table.Cell>{formatTimestamp(task.updatedAt)}</Table.Cell>
                            <Table.Cell>
                                <Flex gap={2}>
                                    <Button size="sm" onClick={() => openEdit(task)}><Edit /></Button>
                                    <Button size="sm" onClick={() => setDeleteTaskId(task.id)}><Trash2 /></Button>
                                </Flex>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>

            {/* create new task button*/}
            <Dialog.Root>
                <Dialog.Trigger asChild>
                    <Button colorScheme="blue">
                        <Plus style={{ marginRight: 8 }} />
                        Create Task
                    </Button>
                </Dialog.Trigger>
                <Portal>
                    <Dialog.Backdrop />
                    <Dialog.Positioner>
                        <Dialog.Content>
                            <Dialog.Header>
                                <Dialog.Title>Create New Task</Dialog.Title>
                            </Dialog.Header>
                            <Dialog.Body>
                                <GenericSelect
                                    items={agents
                                        .filter(a => a.status === "online")
                                        .map(a => ({ label: `${a.hostname} (${a.ip})`, value: a.id }))}
                                    value={formData.agentId}
                                    onChange={(val) => setFormData({ ...formData, agentId: val })}
                                    placeholder="Select Agent"
                                    width="100%"
                                />
                                <GenericSelect
                                    items={[
                                        { label: "Execute Command", value: "execute_command" },
                                        { label: "File Download", value: "file_download" },
                                        { label: "File Upload", value: "file_upload" },
                                        { label: "Process List", value: "process_list" },
                                        { label: "Screenshot", value: "screenshot" },
                                        { label: "Network Scan", value: "network_scan" },
                                        { label: "Keylogger", value: "keylogger" },
                                    ]}
                                    value={formData.type}
                                    onChange={(val) => setFormData({ ...formData, type: val })}
                                    placeholder="Select Task Type"
                                    width="100%"
                                />
                                <Textarea
                                    placeholder='{"command": "ls -la"}'
                                    value={formData.payload}
                                    onChange={e => setFormData({ ...formData, payload: e.target.value })}
                                />
                            </Dialog.Body>
                            <Dialog.Footer>
                                <Dialog.CloseTrigger asChild>
                                    <Button variant="outline">Cancel</Button>
                                </Dialog.CloseTrigger>
                                <Button colorScheme="blue" onClick={handleCreateTask}>Create</Button>
                            </Dialog.Footer>
                            <Dialog.CloseTrigger asChild>
                                <CloseButton size="sm" />
                            </Dialog.CloseTrigger>
                        </Dialog.Content>
                    </Dialog.Positioner>
                </Portal>
            </Dialog.Root>

            {/* edit task button */}
            <Dialog.Root>
                <Dialog.Trigger asChild>
                    <EditIcon />
                </Dialog.Trigger>
                <Portal>
                    <Dialog.Backdrop />
                    <Dialog.Positioner>
                        <Dialog.Content>
                            <Dialog.Header>
                                <Dialog.Title>Edit Task</Dialog.Title>
                            </Dialog.Header>
                            <Dialog.Body>
                                <Input value={getAgentName(formData.agentId)} mb={3} readOnly />
                                <GenericSelect
                                    items={[
                                        { label: "Execute Command", value: "execute_command" },
                                        { label: "File Download", value: "file_download" },
                                        { label: "File Upload", value: "file_upload" },
                                        { label: "Process List", value: "process_list" },
                                        { label: "Screenshot", value: "screenshot" },
                                        { label: "Network Scan", value: "network_scan" },
                                        { label: "Keylogger", value: "keylogger" },
                                    ]}
                                    value={formData.type}
                                    onChange={(val) => setFormData({ ...formData, type: val })}
                                    placeholder="Select Task Type"
                                    width="100%"
                                />
                                <Textarea
                                    value={formData.payload}
                                    onChange={e => setFormData({ ...formData, payload: e.target.value })}
                                />
                            </Dialog.Body>
                            <Dialog.Footer>
                                <Dialog.CloseTrigger asChild>
                                    <Button variant="outline">Cancel</Button>
                                </Dialog.CloseTrigger>
                                <Button colorScheme="blue" onClick={handleEditTask}>Save</Button>
                            </Dialog.Footer>
                            <Dialog.CloseTrigger asChild>
                                <CloseButton size="sm" />
                            </Dialog.CloseTrigger>
                        </Dialog.Content>
                    </Dialog.Positioner>
                </Portal>
            </Dialog.Root>

            {/* delete button */}
            <Dialog.Root>
                <Dialog.Trigger asChild>
                    <DeleteIcon />
                </Dialog.Trigger>
                <Portal>
                    <Dialog.Backdrop />
                    <Dialog.Positioner>
                        <Dialog.Content>
                            <Dialog.Header>
                                <Dialog.Title>Delete Task?</Dialog.Title>
                            </Dialog.Header>
                            <Dialog.Body>
                                This action cannot be undone.
                            </Dialog.Body>
                            <Dialog.Footer>
                                <Dialog.CloseTrigger asChild>
                                    <Button variant="outline">Cancel</Button>
                                </Dialog.CloseTrigger>
                                <Button
                                    onClick={() => { if (deleteTaskId) onDeleteTask(deleteTaskId); setDeleteTaskId(null); }}>
                                    Delete
                                </Button>
                            </Dialog.Footer>
                            <Dialog.CloseTrigger asChild>
                                <CloseButton size="sm" />
                            </Dialog.CloseTrigger>
                        </Dialog.Content>
                    </Dialog.Positioner>
                </Portal>
            </Dialog.Root>
        </Box>
    );
}
