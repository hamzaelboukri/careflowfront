import MainLayout from '../layouts/MainLayout'
import { Heading, Text, SimpleGrid, Box } from '@chakra-ui/react'

const Dashboard = () => {
  return (
    <MainLayout>
      <Heading size="lg" mb={4}>Tableau de bord</Heading>
      <SimpleGrid columns={[1, 2, 3]} gap={4}>
        <Box p={4} bg="white" boxShadow="sm">Statistiques 1</Box>
        <Box p={4} bg="white" boxShadow="sm">Statistiques 2</Box>
        <Box p={4} bg="white" boxShadow="sm">Statistiques 3</Box>
      </SimpleGrid>
      <Text mt={6}>Bienvenue sur CareFlow.</Text>
    </MainLayout>
  )
}

export default Dashboard
