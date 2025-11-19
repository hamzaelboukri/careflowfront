import React from 'react'
import MainLayout from '../../layouts/MainLayout'
import { Heading, Box, Text } from '@chakra-ui/react'

const PrescriptionDetail: React.FC = () => {
  return (
    <MainLayout>
      <Heading size="md" mb={4}>Détail de la prescription</Heading>
      <Box bg="white" p={4} boxShadow="sm">
        <Text>Patient: John Doe</Text>
        <Text>Médicaments: Paracétamol 500mg</Text>
      </Box>
    </MainLayout>
  )
}

export default PrescriptionDetail
