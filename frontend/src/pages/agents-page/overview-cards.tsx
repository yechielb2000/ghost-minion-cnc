import type { Agent } from "@/types";
import { SimpleGrid, Card, Text } from "@chakra-ui/react"
import { Activity, Server, AlertCircle } from "lucide-react"

export const OverviewCards = ({ agents }: { agents: Agent[] }) => {

    const statusCounts = {
        online: agents.filter(a => a.status === "online").length,
        offline: agents.filter(a => a.status === "offline").length,
        error: agents.filter(a => a.status === "error").length,
    };


    return (
        <SimpleGrid columns={[1, 3]} gap={4}>
            <Card.Root>
                <Card.Header flexDirection="row" justifyContent="space-between">
                    <Card.Title>
                        Online Agents
                    </Card.Title>
                    <Activity size={20} />
                </Card.Header>
                <Card.Body>
                    <Text fontSize={15}>{statusCounts.online}</Text>
                    <Card.Description>
                        <Text fontSize={15}>Active connections</Text>
                    </Card.Description>
                </Card.Body>
            </Card.Root>

            <Card.Root>
                <Card.Header flexDirection="row" justifyContent="space-between">
                    <Card.Title>
                        Offline Agents
                    </Card.Title>
                    <Server size={20} />
                </Card.Header>
                <Card.Body>
                    <Text fontSize={15}>{statusCounts.offline}</Text>
                    <Card.Description>
                        <Text fontSize={15}>No recent activity</Text>
                    </Card.Description>
                </Card.Body>
            </Card.Root>

            <Card.Root>
                <Card.Header flexDirection="row" justifyContent="space-between">
                    <Card.Title>
                        Error Status
                    </Card.Title>
                    <AlertCircle size={20} />
                </Card.Header>
                <Card.Body>
                    <Text fontSize={15}>{statusCounts.error}</Text>
                    <Card.Description>
                        <Text fontSize={15}>Requires attention</Text>
                    </Card.Description>
                </Card.Body>
            </Card.Root>
        </SimpleGrid>
    )
}