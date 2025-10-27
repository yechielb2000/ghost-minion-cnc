import { useState } from "react";
import type { Agent } from "../../types";

import {
    Box,
    Flex,
    SimpleGrid,
    Heading,
    Text,
    Input,
    Badge,
    Table,
    Card,
    Stat,
    HStack
} from "@chakra-ui/react";
import { Activity, Server } from "lucide-react";
import { GenericSelect } from "../../components/select-filter";
import { PageTitle } from "./title";
import { OverviewCards } from "./overview-cards";

interface AgentsPageProps {
    agents: Agent[];
    onAgentSelect: (agentId: string) => void;
}

export function AgentsPage({ agents, onAgentSelect }: AgentsPageProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [osFilter, setOsFilter] = useState("all");

    const filteredAgents = agents.filter(agent => {
        const search = searchTerm.toLowerCase();
        const matchesSearch =
            agent.hostname.toLowerCase().includes(search) ||
            agent.ip.includes(search) ||
            agent.tags?.some(tag => tag.toLowerCase().includes(search));

        const matchesStatus = statusFilter === "all" || agent.status === statusFilter;
        const matchesOs = osFilter === "all" || agent.os.includes(osFilter);

        return matchesSearch && matchesStatus && matchesOs;
    });

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

    return (
        <Box display="flex" flexDirection="column" gap={4}>
            <PageTitle />
            <OverviewCards agents={agents} /> {/* todo: check if the status updated */}

            {/* Filters */}
            <HStack height="50px" alignItems="flex-end" gap={4}>
                <Input
                    placeholder="Search by hostname, IP, or tags..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    maxW="250px"
                />

                <GenericSelect
                    label="Status"
                    value={statusFilter}
                    onChange={setStatusFilter}
                    items={[
                        { label: "All Status", value: "all" },
                        { label: "Online", value: "online" },
                        { label: "Offline", value: "offline" },
                        { label: "Error", value: "error" },
                    ]}
                />

                <GenericSelect
                    label="OS"
                    value={osFilter}
                    onChange={setOsFilter}
                    items={[
                        { label: "All OS", value: "all" },
                        { label: "Ubuntu", value: "Ubuntu" },
                        { label: "Windows", value: "Windows" },
                        { label: "CentOS", value: "CentOS" },
                        { label: "Debian", value: "Debian" },
                    ]}
                />
            </HStack>

            {/* Agents Table */}
            <Card.Root>
                <Card.Header>
                    <Heading size="md">Agents ({filteredAgents.length})</Heading>
                    <Text color="gray.600">Click on an agent to view details</Text>
                </Card.Header>
                <Card.Body>
                    <Table.Root size="sm">
                        <Table.Header>
                            <Table.Row>
                                <Table.ColumnHeader>Hostname</Table.ColumnHeader>
                                <Table.ColumnHeader>IP Address</Table.ColumnHeader>
                                <Table.ColumnHeader>OS</Table.ColumnHeader>
                                <Table.ColumnHeader>Status</Table.ColumnHeader>
                                <Table.ColumnHeader>Last Seen</Table.ColumnHeader>
                                <Table.ColumnHeader>Version</Table.ColumnHeader>
                                <Table.ColumnHeader>Tags</Table.ColumnHeader>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {filteredAgents.map(agent => (
                                <Table.Row
                                    key={agent.id}
                                    _hover={{ bg: "gray.50", cursor: "pointer" }}
                                    onClick={() => onAgentSelect(agent.id)}
                                >
                                    <Table.Cell>{agent.hostname}</Table.Cell>
                                    <Table.Cell fontFamily="mono">{agent.ip}</Table.Cell>
                                    <Table.Cell>{agent.os}</Table.Cell>
                                    <Table.Cell>
                                        <Badge colorScheme={getStatusColor(agent.status)}>
                                            {agent.status}
                                        </Badge>
                                    </Table.Cell>
                                    <Table.Cell>{formatLastSeen(agent.lastSeen)}</Table.Cell>
                                    <Table.Cell>{agent.version}</Table.Cell>
                                    <Table.Cell>
                                        <Flex gap={1} wrap="wrap">
                                            {agent.tags?.map(tag => (
                                                <Badge key={tag} variant="outline">
                                                    {tag}
                                                </Badge>
                                            ))}
                                        </Flex>
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table.Root>
                </Card.Body>
            </Card.Root>
        </Box>
    );
}
