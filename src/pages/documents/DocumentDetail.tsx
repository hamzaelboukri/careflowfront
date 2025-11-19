import React from 'react'
import MainLayout from '../../layouts/MainLayout'
import { Heading, Box, Text } from '@chakra-ui/react'

const DocumentDetail: React.FC = () => {
  return (
    <MainLayout>
      <Heading size="md" mb={4}>Détail du document</Heading>
      <Box bg="white" p={4} boxShadow="sm">
        <Text>Nom du fichier: examen.pdf</Text>
        <Text>Taille: 120KB</Text>
      </Box>
    </MainLayout>
  )
}

export default DocumentDetail
