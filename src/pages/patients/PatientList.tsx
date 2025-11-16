import MainLayout from '../../layouts/MainLayout'
import { Heading, Box, VStack, Text } from '@chakra-ui/react'

const PatientList = () => {
  return (
    <MainLayout>
      <Heading size="md" mb={4}>Patients</Heading>
      <Box bg="white" p={4} boxShadow="sm">
        <VStack align="start">
          <Text>John Doe</Text>
          <Text>Jane Smith</Text>
        </VStack>
      </Box>
    </MainLayout>
  )
}

export default PatientList
