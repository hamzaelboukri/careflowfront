import React from 'react'
import MainLayout from '../../layouts/MainLayout'
import { Heading, Box, Text } from '@chakra-ui/react'

const AppointmentDetail: React.FC = () => {
  return (
    <MainLayout>
      <Heading size="md" mb={4}>Détail du rendez-vous</Heading>
      <Box bg="white" p={4} boxShadow="sm">
        <Text>Patient: John Doe</Text>
        <Text>Date: 2025-11-20</Text>
        <Text>Notes: Consultation générale</Text>
      </Box>
    </MainLayout>
  )
}

export default AppointmentDetail
