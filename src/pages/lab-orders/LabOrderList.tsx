import MainLayout from '../../layouts/MainLayout'
import { Heading, Box, VStack, Text } from '@chakra-ui/react'

const LabOrderList = () => {
  return (
    <MainLayout>
      <Heading size="md" mb={4}>Ordres de laboratoire</Heading>
      <Box bg="white" p={4} boxShadow="sm">
        <VStack align="start">
          <Text>Ordre #1001 - John Doe</Text>
        </VStack>
      </Box>
    </MainLayout>
  )
}

export default LabOrderList
