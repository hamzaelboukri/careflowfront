import MainLayout from '../../layouts/MainLayout'
import { Heading, Box, VStack, Text } from '@chakra-ui/react'

const DocumentsList = () => {
  return (
    <MainLayout>
      <Heading size="md" mb={4}>Documents médicaux</Heading>
      <Box bg="white" p={4} boxShadow="sm">
        <VStack align="start">
          <Text>Document 1 - John Doe</Text>
        </VStack>
      </Box>
    </MainLayout>
  )
}

export default DocumentsList
