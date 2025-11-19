import MainLayout from '../../layouts/MainLayout'
import { Heading, Box, VStack, Text } from '@chakra-ui/react'

const UserList = () => {
  return (
    <MainLayout>
      <Heading size="md" mb={4}>Utilisateurs</Heading>
      <Box bg="white" p={4} boxShadow="sm">
        <VStack align="start">
          <Text>Admin - admin@example.com</Text>
          <Text>Dr. House - house@example.com</Text>
        </VStack>
      </Box>
    </MainLayout>
  )
}

export default UserList
