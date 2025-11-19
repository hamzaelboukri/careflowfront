import { Flex, Box, Button, Text } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../stores/authStore'

const Navbar = () => {
  const navigate = useNavigate()
  const { user, logout } = useAuthStore()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <Flex as="header" align="center" justify="space-between" px={6} py={3} bg="white" borderBottomWidth="1px">
      <Text fontWeight="semibold">CareFlow - {user?.name || 'Utilisateur'}</Text>
      <Box>
        <Button size="sm" variant="ghost" onClick={() => navigate('/profile')}>Profile</Button>
        <Button size="sm" ml={2} colorScheme="red" onClick={handleLogout}>Déconnexion</Button>
      </Box>
    </Flex>
  )
}

export default Navbar
