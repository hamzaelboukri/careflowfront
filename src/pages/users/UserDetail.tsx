import React from 'react'
import MainLayout from '../../layouts/MainLayout'
import { Heading, Box, Text } from '@chakra-ui/react'

const UserDetail: React.FC = () => {
  return (
    <MainLayout>
      <Heading size="md" mb={4}>Détail de l'utilisateur</Heading>
      <Box bg="white" p={4} boxShadow="sm">
        <Text>Nom: Admin</Text>
        <Text>Rôle: Administrateur</Text>
      </Box>
    </MainLayout>
  )
}

export default UserDetail
