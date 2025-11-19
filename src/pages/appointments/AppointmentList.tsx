import MainLayout from '../../layouts/MainLayout'
import { Heading, Box, VStack, Button, Text } from '@chakra-ui/react'

const AppointmentList = () => {
  return (
    <MainLayout>
      <Heading size="md" mb={4}>Rendez-vous</Heading>
      <Box bg="white" p={4} boxShadow="sm">
        <Button colorScheme="blue" mb={4}>Nouveau rendez-vous</Button>
        <VStack align="start">
          <Text>RDV - Patient A - 2025-11-20</Text>
          <Text>RDV - Patient B - 2025-11-21</Text>
        </VStack>
      </Box>
    </MainLayout>
  )
}

export default AppointmentList
