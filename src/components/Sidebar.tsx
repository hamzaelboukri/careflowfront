import { Box, VStack, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <Box w="220px" bg="gray.800" color="white" p={4} minH="100vh">
      <Text fontSize="lg" fontWeight="bold" mb={6}>
        CareFlow
      </Text>
      <VStack align="start" gap={3}>
        <Link to="/dashboard" style={{ color: 'white' }}>Dashboard</Link>
        <Link to="/appointments" style={{ color: 'white' }}>Rendez-vous</Link>
        <Link to="/patients" style={{ color: 'white' }}>Patients</Link>
        <Link to="/prescriptions" style={{ color: 'white' }}>Prescriptions</Link>
        <Link to="/lab-orders" style={{ color: 'white' }}>Lab Orders</Link>
        <Link to="/documents" style={{ color: 'white' }}>Documents</Link>
        <Link to="/users" style={{ color: 'white' }}>Utilisateurs</Link>
      </VStack>
    </Box>
  )
}

export default Sidebar
