import MainLayout from '../../layouts/MainLayout'
import { Heading, Box, VStack, Text } from '@chakra-ui/react'

const PrescriptionList = () => {
  return (
    <MainLayout>
      <Heading size="md" mb={4}>Prescriptions</Heading>
      <Box bg="white" p={4} boxShadow="sm">
        <VStack align="start">
          <Text>Prescription #001 - John Doe</Text>
        </VStack>
      </Box>
    </MainLayout>
  )
}

export default PrescriptionList
