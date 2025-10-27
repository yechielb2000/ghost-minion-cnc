import { useState } from "react";
import type { Agent, Task } from "./types";
import { mockAgents, mockTasks } from "./lib/mock-data";
import { AgentsPage } from "./pages/agents-page/index";
import { TasksPage } from "./pages/tasks-page";
import { AgentInfoPage } from "./pages/agent-info-page";
import {
  Box,
  Flex,
  Button,
  Heading,
  Container,
  HStack,
} from "@chakra-ui/react";

import { FiTerminal } from "react-icons/fi";

type View = "agents" | "tasks" | "agent-info";

export default function App() {
  const [currentView, setCurrentView] = useState<View>("agents");
  const [selectedAgentId, setSelectedAgentId] = useState<string | null>(null);
  const [agents, setAgents] = useState<Agent[]>(mockAgents);
  const [tasks, setTasks] = useState<Task[]>(mockTasks);

  const handleAgentSelect = (agentId: string) => {
    setSelectedAgentId(agentId);
    setCurrentView("agent-info");
  };

  const handleCreateTask = (
    taskData: Omit<Task, "id" | "createdAt" | "updatedAt">
  ) => {
    const newTask: Task = {
      ...taskData,
      id: `task-${Date.now()}`,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    setTasks([...tasks, newTask]);
  };

  const handleUpdateTask = (taskId: string, updates: Partial<Task>) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? { ...task, ...updates, updatedAt: Date.now() }
          : task
      )
    );
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const selectedAgent = agents.find((a) => a.id === selectedAgentId);

  return (
    <Box
      minH="100vh"
      bg="gray.50"
      display="flex"
      flexDirection="column"
    >
      {/* Header */}
      <Box borderBottomWidth="1px" bg="white">
        <Container maxW="container.xl">
          <HStack height="60px" gap={8} >
            <HStack gap={2}>
              <FiTerminal size={22} color="red" />
              <Heading size="md" fontFamily="mono" color="gray.700">
                C2 Command Center
              </Heading>
            </HStack>

            <HStack gap={2}>
              <Button
                variant={currentView === "agents" ? "solid" : "ghost"}
                colorScheme="blue"
                onClick={() => setCurrentView("agents")}
              >
                Agents
              </Button>
              <Button
                variant={currentView === "tasks" ? "solid" : "ghost"}
                colorScheme="blue"
                onClick={() => setCurrentView("tasks")}
              >
                Tasks
              </Button>
            </HStack>
          </HStack>
        </Container>
      </Box>

      {/* Content */}
      <Container maxW="container.xl" flex="1" py={6} px={4}>
        {currentView === "agents" && (
          <AgentsPage agents={agents} onAgentSelect={handleAgentSelect} />
        )}

        {currentView === "tasks" && (
          <TasksPage
            tasks={tasks}
            agents={agents}
            onCreateTask={handleCreateTask}
            onUpdateTask={handleUpdateTask}
            onDeleteTask={handleDeleteTask}
          />
        )}

        {currentView === "agent-info" && selectedAgent && (
          <AgentInfoPage
            agent={selectedAgent}
            tasks={tasks}
            onBack={() => setCurrentView("agents")}
          />
        )}
      </Container>
    </Box>
  );
}
