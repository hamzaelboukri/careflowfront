import MainLayout from '../../layouts/MainLayout'
import { Heading, Box, VStack, Input, Button, Text } from '@chakra-ui/react'

const AppointmentNew = () => {
  return (
    <MainLayout>
      <Heading size="md" mb={4}>Nouveau rendez-vous</Heading>
      <Box bg="white" p={4} boxShadow="sm">
        <VStack gap={3} align="stretch">
          <Box>
            <Text mb={2} fontWeight="medium">Patient</Text>
            <Input placeholder="Nom du patient" />
          </Box>
          <Box>
            <Text mb={2} fontWeight="medium">Date & Heure</Text>
            <Input type="datetime-local" />
          </Box>
          <Button colorScheme="green">Créer</Button>
        </VStack>
      </Box>
    </MainLayout>
  )
}

export default AppointmentNew
