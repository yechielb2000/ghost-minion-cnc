"use client";

import type { Agent, Task } from "../types";
import {
    Box,
    Button,
    Badge,
    SimpleGrid,
    Stat,
    Card,
    Heading,
    Text,
    Tabs,
    Table,
    ScrollArea,
    Flex,
} from "@chakra-ui/react";
import { ArrowLeft, Terminal, Camera, Keyboard, Network, HardDrive, Activity } from "lucide-react";
import { agentDataMap } from "../lib/mock-data";

interface AgentInfoPageProps {
    agent: Agent;
    tasks: Task[];
    onBack: () => void;
}

export function AgentInfoPage({ agent, tasks, onBack }: AgentInfoPageProps) {
    const agentTasks = tasks.filter((task) => task.agentId === agent.id);
    const agentData = agentDataMap[agent.id] || { commands: [], keylogs: [], screenshots: [] };

    const formatLastSeen = (timestamp: number) => {
        const seconds = Math.floor((Date.now() - timestamp) / 1000);
        if (seconds < 60) return `${seconds}s ago`;
        const minutes = Math.floor(seconds / 60);
        if (minutes < 60) return `${minutes}m ago`;
        const hours = Math.floor(minutes / 60);
        if (hours < 24) return `${hours}h ago`;
        const days = Math.floor(hours / 24);
        return `${days}d ago`;
    };

    const formatTimestamp = (timestamp: number) => new Date(timestamp).toLocaleString();

    const getStatusColor = (status: string) => {
        switch (status) {
            case "online":
                return "green";
            case "offline":
                return "gray";
            case "error":
                return "red";
            default:
                return "gray";
        }
    };

    return (
        <Box display="flex" flexDirection="column" gap={6}>
            {/* Header */}
            <Flex gap={4} align="center">
                <Button variant="ghost" onClick={onBack}>
                    <ArrowLeft style={{ marginRight: 8 }} />
                    Back
                </Button>
                <Box flex={1}>
                    <Flex align="center" gap={3}>
                        <Heading size="lg">{agent.hostname}</Heading>
                        <Badge colorScheme={getStatusColor(agent.status)}>{agent.status}</Badge>
                    </Flex>
                    <Text color="gray.500">
                        {agent.ip} • {agent.os} • Last seen {formatLastSeen(agent.lastSeen)}
                    </Text>
                </Box>
            </Flex>

            {/* Stats */}
            <SimpleGrid columns={[1, 2, 4]} gap={4}>
                <Card.Root>
                    <Card.Header>
                        <Stat.Root>
                            <Stat.Label>Version</Stat.Label>
                            <Stat.ValueUnit>{agent.version}</Stat.ValueUnit>
                        </Stat.Root>
                    </Card.Header>
                </Card.Root>

                <Card.Root>
                    <Card.Header>
                        <Stat.Root>
                            <Stat.Label>Total Tasks</Stat.Label>
                            <Stat.ValueUnit>{agentTasks.length}</Stat.ValueUnit>
                        </Stat.Root>
                    </Card.Header>
                </Card.Root>

                <Card.Root>
                    <Card.Header>
                        <Stat.Root>
                            <Stat.Label>Completed</Stat.Label>
                            <Stat.ValueUnit>{agentTasks.filter((t) => t.status === "completed").length}</Stat.ValueUnit>
                        </Stat.Root>
                    </Card.Header>
                </Card.Root>

                <Card.Root>
                    <Card.Header>
                        <Stat.Root>
                            <Stat.Label>Failed</Stat.Label>
                            <Stat.ValueUnit>{agentTasks.filter((t) => t.status === "failed").length}</Stat.ValueUnit>
                        </Stat.Root>
                    </Card.Header>
                </Card.Root>
            </SimpleGrid>

            {/* Tags */}
            {agent.tags?.length ? (
                <Card.Root>
                    <Card.Header>
                        <Heading size="md">Tags</Heading>
                    </Card.Header>
                    <Card.Body>
                        <Flex gap={2} wrap="wrap">
                            {agent.tags.map((tag) => (
                                <Badge key={tag} variant="outline">
                                    {tag}
                                </Badge>
                            ))}
                        </Flex>
                    </Card.Body>
                </Card.Root>
            ) : null}

            <Tabs.Root defaultValue="commands" lazyMount unmountOnExit>
                <Tabs.List>
                    <Tabs.Trigger value="commands">
                        <Terminal size={16} style={{ marginRight: 8 }} />
                        Commands
                    </Tabs.Trigger>
                    <Tabs.Trigger value="screenshots">
                        <Camera size={16} style={{ marginRight: 8 }} />
                        Screenshots
                    </Tabs.Trigger>
                    <Tabs.Trigger value="keylogger">
                        <Keyboard size={16} style={{ marginRight: 8 }} />
                        Keylogger
                    </Tabs.Trigger>
                    <Tabs.Trigger value="network">
                        <Network size={16} style={{ marginRight: 8 }} />
                        Network
                    </Tabs.Trigger>
                    <Tabs.Trigger value="filesystem">
                        <HardDrive size={16} style={{ marginRight: 8 }} />
                        Filesystem
                    </Tabs.Trigger>
                    <Tabs.Trigger value="processes">
                        <Activity size={16} style={{ marginRight: 8 }} />
                        Processes
                    </Tabs.Trigger>
                </Tabs.List>

                {/* Commands */}
                <Tabs.Content value="commands">
                    <Card.Root>
                        <Card.Header>
                            <Heading size="md">Command History</Heading>
                            <Text color="gray.500">
                                Commands executed on this agent ({agentData.commands.length} total)
                            </Text>
                        </Card.Header>
                        <Card.Body>
                            {agentData.commands.length > 0 ? (
                                <Flex direction="column" gap={4}>
                                    {agentData.commands.map((cmd) => (
                                        <Box key={cmd.id} borderWidth={1} borderRadius="md" p={4}>
                                            <Flex justify="space-between" align="center" mb={2}>
                                                <Flex align="center" gap={2}>
                                                    <Terminal />
                                                    <Text as="code" bg="gray.100" px={2} py={1} rounded="md">
                                                        {cmd.command}
                                                    </Text>
                                                </Flex>
                                                <Text fontSize="xs" color="gray.500">
                                                    {formatTimestamp(cmd.collected_at)}
                                                </Text>
                                            </Flex>
                                            <Text fontSize="sm" color="gray.500" mb={1}>
                                                Output:
                                            </Text>
                                            <ScrollArea.Root maxH="200px">
                                                <ScrollArea.Viewport>
                                                    <ScrollArea.Content spaceY="4" textStyle="sm">
                                                        {cmd.output}
                                                    </ScrollArea.Content>
                                                </ScrollArea.Viewport>
                                                <ScrollArea.Scrollbar>
                                                    <ScrollArea.Thumb />
                                                </ScrollArea.Scrollbar>
                                                <ScrollArea.Corner />
                                            </ScrollArea.Root>
                                        </Box>
                                    ))}
                                </Flex>
                            ) : (
                                <Flex
                                    justify="center"
                                    align="center"
                                    h="48"
                                    borderWidth={1}
                                    borderStyle="dashed"
                                    rounded="md"
                                >
                                    <Text color="gray.500">No commands executed yet</Text>
                                </Flex>
                            )}
                        </Card.Body>
                    </Card.Root>
                </Tabs.Content>

                {/* Screenshots */}
                <Tabs.Content value="screenshots">
                    <Card.Root>
                        <Card.Header>
                            <Heading size="md">Screenshots</Heading>
                            <Text color="gray.500">
                                Captured screenshots from the agent ({agentData.screenshots.length} total)
                            </Text>
                        </Card.Header>
                        <Card.Body>
                            {agentData.screenshots.length > 0 ? (
                                <SimpleGrid columns={[1, 2]} gap={4}>
                                    {agentData.screenshots.map((s, idx) => (
                                        <Box key={idx} borderWidth={1} borderRadius="md" overflow="hidden">
                                            <img src={s.image_link} alt={`Screenshot ${idx + 1}`} className="w-full h-auto" />
                                        </Box>
                                    ))}
                                </SimpleGrid>
                            ) : (
                                <Flex justify="center" align="center" h="48" borderWidth={1} borderStyle="dashed" rounded="md">
                                    <Text color="gray.500">No screenshots available</Text>
                                </Flex>
                            )}
                        </Card.Body>
                    </Card.Root>
                </Tabs.Content>

                {/* Keylogger */}
                <Tabs.Content value="keylogger">
                    <Card.Root>
                        <Card.Header>
                            <Heading size="md">Keylogger Data</Heading>
                            <Text color="gray.500">
                                Captured keystrokes from the agent ({agentData.keylogs.length} sessions)
                            </Text>
                        </Card.Header>
                        <Card.Body>
                            {agentData.keylogs.length > 0 ? (
                                <Table.Root size="sm">
                                    <Table.Header>
                                        <Table.Row>
                                            <Table.ColumnHeader>ID</Table.ColumnHeader>
                                            <Table.ColumnHeader>Collected At</Table.ColumnHeader>
                                            <Table.ColumnHeader>Keylog Data</Table.ColumnHeader>
                                        </Table.Row>
                                    </Table.Header>
                                    <Table.Body>
                                        {agentData.keylogs.map((kl) => (
                                            <Table.Row key={kl.id}>
                                                <Table.Cell>{kl.id}</Table.Cell>
                                                <Table.Cell>{formatTimestamp(kl.collected_at)}</Table.Cell>
                                                <Table.Cell>
                                                    <Text as="code" fontSize="sm" bg="gray.100" px={2} py={1} rounded="md">
                                                        {kl.keylog}
                                                    </Text>
                                                </Table.Cell>
                                            </Table.Row>
                                        ))}
                                    </Table.Body>
                                </Table.Root>
                            ) : (
                                <Flex justify="center" align="center" h="48" borderWidth={1} borderStyle="dashed" rounded="md">
                                    <Text color="gray.500">No keylogger data available</Text>
                                </Flex>
                            )}
                        </Card.Body>
                    </Card.Root>
                </Tabs.Content>

                {/* Network */}
                <Tabs.Content value="network">
                    <Card.Root>
                        <Card.Header>
                            <Heading size="md">Network Information</Heading>
                            <Text color="gray.500">Network interfaces and connections</Text>
                        </Card.Header>
                        <Card.Body>
                            <Flex justify="center" align="center" h="48" borderWidth={1} borderStyle="dashed" rounded="md">
                                <Text color="gray.500">Network data will be displayed here</Text>
                            </Flex>
                        </Card.Body>
                    </Card.Root>
                </Tabs.Content>

                {/* Filesystem */}
                <Tabs.Content value="filesystem">
                    <Card.Root>
                        <Card.Header>
                            <Heading size="md">Filesystem Browser</Heading>
                            <Text color="gray.500">Browse agent filesystem</Text>
                        </Card.Header>
                        <Card.Body>
                            <Flex justify="center" align="center" h="48" borderWidth={1} borderStyle="dashed" rounded="md">
                                <Text color="gray.500">Filesystem browser will be displayed here</Text>
                            </Flex>
                        </Card.Body>
                    </Card.Root>
                </Tabs.Content>

                {/* Processes */}
                <Tabs.Content value="processes">
                    <Card.Root>
                        <Card.Header>
                            <Heading size="md">Running Processes</Heading>
                            <Text color="gray.500">View all running processes on the agent</Text>
                        </Card.Header>
                        <Card.Body>
                            <Flex justify="center" align="center" h="48" borderWidth={1} borderStyle="dashed" rounded="md">
                                <Text color="gray.500">Process list will be displayed here</Text>
                            </Flex>
                        </Card.Body>
                    </Card.Root>
                </Tabs.Content>
            </Tabs.Root>
        </Box >
    );
}
