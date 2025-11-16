import React from 'react'
import MainLayout from '../../layouts/MainLayout'
import { Heading, Box, Text } from '@chakra-ui/react'

const PatientDetail: React.FC = () => {
  return (
    <MainLayout>
      <Heading size="md" mb={4}>Détail du patient</Heading>
      <Box bg="white" p={4} boxShadow="sm">
        <Text>Nom: John Doe</Text>
        <Text>Âge: 34</Text>
        <Text>Allergies: Aucune</Text>
      </Box>
    </MainLayout>
  )
}

export default PatientDetail
