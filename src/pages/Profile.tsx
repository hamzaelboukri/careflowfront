import React from 'react'
import MainLayout from '../layouts/MainLayout'
import { Heading, Box, Text } from '@chakra-ui/react'

const Profile: React.FC = () => {
  return (
    <MainLayout>
      <Heading size="lg" mb={4}>Mon profil</Heading>
      <Box bg="white" p={4} boxShadow="sm">
        <Text>Nom: John Doe</Text>
        <Text>Email: john@example.com</Text>
      </Box>
    </MainLayout>
  )
}

export default Profile
