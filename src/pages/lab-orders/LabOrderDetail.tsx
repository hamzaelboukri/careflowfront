import React from 'react'
import MainLayout from '../../layouts/MainLayout'
import { Heading, Box, Text } from '@chakra-ui/react'

const LabOrderDetail: React.FC = () => {
  return (
    <MainLayout>
      <Heading size="md" mb={4}>Détail de l'ordre de labo</Heading>
      <Box bg="white" p={4} boxShadow="sm">
        <Text>Patient: John Doe</Text>
        <Text>Tests: NFS, Ionogramme</Text>
      </Box>
    </MainLayout>
  )
}

export default LabOrderDetail
