import { Box, Heading, Text } from "@chakra-ui/react"

export const PageTitle = () => {
    return (
        <Box>
            <Heading color="gray.700" size="2xl">Agents</Heading>
            <Text color="gray.600">Manage and monitor all connected agents</Text>
        </Box>
    )
}